package nl.xservices.plugins;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.*;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.text.Html;
import android.util.Base64;
import android.view.Gravity;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SocialSharing extends CordovaPlugin {

  private static final String ACTION_AVAILABLE_EVENT = "available";
  private static final String ACTION_SHARE_EVENT = "share";
  private static final String ACTION_SHARE_WITH_OPTIONS_EVENT = "shareWithOptions";
  private static final String ACTION_CAN_SHARE_VIA = "canShareVia";
  private static final String ACTION_CAN_SHARE_VIA_EMAIL = "canShareViaEmail";
  private static final String ACTION_SHARE_VIA = "shareVia";
  private static final String ACTION_SHARE_VIA_TWITTER_EVENT = "shareViaTwitter";
  private static final String ACTION_SHARE_VIA_FACEBOOK_EVENT = "shareViaFacebook";
  private static final String ACTION_SHARE_VIA_FACEBOOK_WITH_PASTEMESSAGEHINT = "shareViaFacebookWithPasteMessageHint";
  private static final String ACTION_SHARE_VIA_WHATSAPP_EVENT = "shareViaWhatsApp";
  private static final String ACTION_SHARE_VIA_INSTAGRAM_EVENT = "shareViaInstagram";
  private static final String ACTION_SHARE_VIA_SMS_EVENT = "shareViaSMS";
  private static final String ACTION_SHARE_VIA_EMAIL_EVENT = "shareViaEmail";

  private static final int ACTIVITY_CODE_SEND__BOOLRESULT = 1;
  private static final int ACTIVITY_CODE_SEND__OBJECT = 2;
  private static final int ACTIVITY_CODE_SENDVIAEMAIL = 3;
  private static final int ACTIVITY_CODE_SENDVIAWHATSAPP = 4;

  private CallbackContext _callbackContext;

  private String pasteMessage;

  private abstract class SocialSharingRunnable implements Runnable {
    public CallbackContext callbackContext;

    SocialSharingRunnable(CallbackContext cb) {
      this.callbackContext = cb;
    }
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    this._callbackContext = callbackContext; // only used for onActivityResult
    this.pasteMessage = null;
    if (ACTION_AVAILABLE_EVENT.equals(action)) {
      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
      return true;
    } else if (ACTION_SHARE_EVENT.equals(action)) {
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), null, null, false, true);
    } else if (ACTION_SHARE_WITH_OPTIONS_EVENT.equals(action)) {
      return shareWithOptions(callbackContext, args.getJSONObject(0));
    } else if (ACTION_SHARE_VIA_TWITTER_EVENT.equals(action)) {
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), "twitter", null, false, true);
    } else if (ACTION_SHARE_VIA_FACEBOOK_EVENT.equals(action)) {
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), "com.facebook.katana", null, false, true);
    } else if (ACTION_SHARE_VIA_FACEBOOK_WITH_PASTEMESSAGEHINT.equals(action)) {
      this.pasteMessage = args.getString(4);
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), "com.facebook.katana", null, false, true);
    } else if (ACTION_SHARE_VIA_WHATSAPP_EVENT.equals(action)) {
      if (notEmpty(args.getString(4))) {
        return shareViaWhatsAppDirectly(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), args.getString(4));
      } else {
        return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), "whatsapp", null, false, true);
      }
    } else if (ACTION_SHARE_VIA_INSTAGRAM_EVENT.equals(action)) {
      if (notEmpty(args.getString(0))) {
        copyHintToClipboard(args.getString(0), "Instagram paste message");
      }
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), "instagram", null, false, true);
    } else if (ACTION_CAN_SHARE_VIA.equals(action)) {
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), args.getString(4), null, true, true);
    } else if (ACTION_CAN_SHARE_VIA_EMAIL.equals(action)) {
      if (isEmailAvailable()) {
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
        return true;
      } else {
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "not available"));
        return false;
      }
    } else if (ACTION_SHARE_VIA.equals(action)) {
      return doSendIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.getString(3), args.getString(4), null, false, true);
    } else if (ACTION_SHARE_VIA_SMS_EVENT.equals(action)) {
      return invokeSMSIntent(callbackContext, args.getJSONObject(0), args.getString(1));
    } else if (ACTION_SHARE_VIA_EMAIL_EVENT.equals(action)) {
      return invokeEmailIntent(callbackContext, args.getString(0), args.getString(1), args.getJSONArray(2), args.isNull(3) ? null : args.getJSONArray(3), args.isNull(4) ? null : args.getJSONArray(4), args.isNull(5) ? null : args.getJSONArray(5));
    } else {
      callbackContext.error("socialSharing." + action + " is not a supported function. Did you mean '" + ACTION_SHARE_EVENT + "'?");
      return false;
    }
  }

  private boolean isEmailAvailable() {
    final Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("mailto", "someone@domain.com", null));
    return cordova.getActivity().getPackageManager().queryIntentActivities(intent, 0).size() > 0;
  }

  private boolean invokeEmailIntent(final CallbackContext callbackContext, final String message, final String subject, final JSONArray to, final JSONArray cc, final JSONArray bcc, final JSONArray files) throws JSONException {

    final SocialSharing plugin = this;
    cordova.getThreadPool().execute(new SocialSharingRunnable(callbackContext) {
      public void run() {
        final Intent draft = new Intent(Intent.ACTION_SEND_MULTIPLE);
        if (notEmpty(message)) {
          Pattern htmlPattern = Pattern.compile(".*\\<[^>]+>.*", Pattern.DOTALL);
          if (htmlPattern.matcher(message).matches()) {
            draft.putExtra(android.content.Intent.EXTRA_TEXT, Html.fromHtml(message));
            draft.setType("text/html");
          } else {
            draft.putExtra(android.content.Intent.EXTRA_TEXT, message);
            draft.setType("text/plain");
          }
        }
        if (notEmpty(subject)) {
          draft.putExtra(android.content.Intent.EXTRA_SUBJECT, subject);
        }
        try {
          if (to != null && to.length() > 0) {
            draft.putExtra(android.content.Intent.EXTRA_EMAIL, toStringArray(to));
          }
          if (cc != null && cc.length() > 0) {
            draft.putExtra(android.content.Intent.EXTRA_CC, toStringArray(cc));
          }
          if (bcc != null && bcc.length() > 0) {
            draft.putExtra(android.content.Intent.EXTRA_BCC, toStringArray(bcc));
          }
          if (files.length() > 0) {
            final String dir = getDownloadDir();
            if (dir != null) {
              ArrayList<Uri> fileUris = new ArrayList<Uri>();
              for (int i = 0; i < files.length(); i++) {
                final Uri fileUri = getFileUriAndSetType(draft, dir, files.getString(i), subject, i);
                if (fileUri != null) {
                  fileUris.add(fileUri);
                }
              }
              if (!fileUris.isEmpty()) {
                draft.putExtra(Intent.EXTRA_STREAM, fileUris);
              }
            }
          }
        } catch (Exception e) {
          callbackContext.error(e.getMessage());
        }

        // this was added to start the intent in a new window as suggested in #300 to prevent crashes upon return
        draft.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        draft.setType("application/octet-stream");

        // as an experiment for #300 we're explicitly running it on the ui thread here
        cordova.getActivity().runOnUiThread(new Runnable() {
          public void run() {
            cordova.startActivityForResult(plugin, Intent.createChooser(draft, "Choose Email App"), ACTIVITY_CODE_SENDVIAEMAIL);
          }
        });
      }
    });

    return true;
  }

  private String getDownloadDir() throws IOException {
    // better check, otherwise it may crash the app
    if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())) {
      // we need to use external storage since we need to share to another app
      final String dir = webView.getContext().getExternalFilesDir(null) + "/socialsharing-downloads";
      createOrCleanDir(dir);
      return dir;
    } else {
      return null;
    }
  }

  private boolean shareWithOptions(CallbackContext callbackContext, JSONObject jsonObject) {
    return doSendIntent(
        callbackContext,
        jsonObject.optString("message", null),
        jsonObject.optString("subject", null),
        jsonObject.optJSONArray("files") == null ? new JSONArray() : jsonObject.optJSONArray("files"),
        jsonObject.optString("url", null),
        null,
        jsonObject.optString("chooserTitle", null),
        false,
        false
    );
  }

  private boolean doSendIntent(
      final CallbackContext callbackContext,
      final String msg,
      final String subject,
      final JSONArray files,
      final String url,
      final String appPackageName,
      final String chooserTitle,
      final boolean peek,
      final boolean boolResult) {

    final CordovaInterface mycordova = cordova;
    final CordovaPlugin plugin = this;

    cordova.getThreadPool().execute(new SocialSharingRunnable(callbackContext) {
      public void run() {
        String message = msg;
        final boolean hasMultipleAttachments = files.length() > 1;
        final Intent sendIntent = new Intent(hasMultipleAttachments ? Intent.ACTION_SEND_MULTIPLE : Intent.ACTION_SEND);
        sendIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);

        try {
          if (files.length() > 0 && !"".equals(files.getString(0))) {
            final String dir = getDownloadDir();
            if (dir != null) {
              ArrayList<Uri> fileUris = new ArrayList<Uri>();
              Uri fileUri = null;
              for (int i = 0; i < files.length(); i++) {
                fileUri = getFileUriAndSetType(sendIntent, dir, files.getString(i), subject, i);
                if (fileUri != null) {
                  fileUris.add(fileUri);
                }
              }
              if (!fileUris.isEmpty()) {
                if (hasMultipleAttachments) {
                  sendIntent.putExtra(Intent.EXTRA_STREAM, fileUris);
                } else {
                  sendIntent.putExtra(Intent.EXTRA_STREAM, fileUri);
                }
              }
            } else {
              sendIntent.setType("text/plain");
            }
          } else {
            sendIntent.setType("text/plain");
          }
        } catch (Exception e) {
          callbackContext.error(e.getMessage());
        }

        if (notEmpty(subject)) {
          sendIntent.putExtra(Intent.EXTRA_SUBJECT, subject);
        }

        // add the URL to the message, as there seems to be no separate field
        if (notEmpty(url)) {
          if (notEmpty(message)) {
            message += " " + url;
          } else {
            message = url;
          }
        }
        if (notEmpty(message)) {
          sendIntent.putExtra(android.content.Intent.EXTRA_TEXT, message);
          // sometimes required when the user picks share via sms
          if (Build.VERSION.SDK_INT < 21) { // LOLLIPOP
            sendIntent.putExtra("sms_body", message);
          }
        }

        // this was added to start the intent in a new window as suggested in #300 to prevent crashes upon return
        sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (appPackageName != null) {
          String packageName = appPackageName;
          String passedActivityName = null;
          if (packageName.contains("/")) {
            String[] items = appPackageName.split("/");
            packageName = items[0];
            passedActivityName = items[1];
          }
          final ActivityInfo activity = getActivity(callbackContext, sendIntent, packageName);
          if (activity != null) {
            if (peek) {
              callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
            } else {
              sendIntent.addCategory(Intent.CATEGORY_LAUNCHER);
              sendIntent.setComponent(new ComponentName(activity.applicationInfo.packageName,
                  passedActivityName != null ? passedActivityName : activity.name));

              // as an experiment for #300 we're explicitly running it on the ui thread here
              cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                  mycordova.startActivityForResult(plugin, sendIntent, 0);
                }
              });

              if (pasteMessage != null) {
                // add a little delay because target app (facebook only atm) needs to be started first
                new Timer().schedule(new TimerTask() {
                  public void run() {
                    cordova.getActivity().runOnUiThread(new Runnable() {
                      public void run() {
                        copyHintToClipboard(msg, pasteMessage);
                        showPasteMessage(pasteMessage);
                      }
                    });
                  }
                }, 2000);
              }
            }
          }
        } else {
          if (peek) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
          } else {
            // experimenting a bit
            // as an experiment for #300 we're explicitly running it on the ui thread here
            cordova.getActivity().runOnUiThread(new Runnable() {
              public void run() {
                mycordova.startActivityForResult(plugin, Intent.createChooser(sendIntent, chooserTitle), boolResult ? ACTIVITY_CODE_SEND__BOOLRESULT : ACTIVITY_CODE_SEND__OBJECT);
              }
            });
          }
        }
      }
    });
    return true;
  }

  @SuppressLint("NewApi")
  private void copyHintToClipboard(String msg, String label) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.HONEYCOMB) {
      return;
    }
    final ClipboardManager clipboard = (android.content.ClipboardManager) cordova.getActivity().getSystemService(Context.CLIPBOARD_SERVICE);
    final ClipData clip = android.content.ClipData.newPlainText(label, msg);
    clipboard.setPrimaryClip(clip);
  }

  @SuppressLint("NewApi")
  private void showPasteMessage(String label) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.HONEYCOMB) {
      return;
    }
    final Toast toast = Toast.makeText(webView.getContext(), label, Toast.LENGTH_LONG);
    toast.setGravity(Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL, 0, 0);
    toast.show();
  }

  private Uri getFileUriAndSetType(Intent sendIntent, String dir, String image, String subject, int nthFile) throws IOException {
    // we're assuming an image, but this can be any filetype you like
    String localImage = image;
     if( image.endsWith("mp4") || image.endsWith("mov") || image.endsWith("3gp")  ){
      sendIntent.setType("video/*");
    }else {
      sendIntent.setType("image/*");
    }
    
    if (image.startsWith("http") || image.startsWith("www/")) {
      String filename = getFileName(image);
      localImage = "file://" + dir + "/" + filename;
      if (image.startsWith("http")) {
        // filename optimisation taken from https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/pull/56
        URLConnection connection = new URL(image).openConnection();
        String disposition = connection.getHeaderField("Content-Disposition");
        if (disposition != null) {
          final Pattern dispositionPattern = Pattern.compile("filename=([^;]+)");
          Matcher matcher = dispositionPattern.matcher(disposition);
          if (matcher.find()) {
            filename = matcher.group(1).replaceAll("[^a-zA-Z0-9._-]", "");
            if (filename.length() == 0) {
              // in this case we can't determine a filetype so some targets (gmail) may not render it correctly
              filename = "file";
            }
            localImage = "file://" + dir + "/" + filename;
          }
        }
        saveFile(getBytes(connection.getInputStream()), dir, filename);
      } else {
        saveFile(getBytes(webView.getContext().getAssets().open(image)), dir, filename);
      }
    } else if (image.startsWith("data:")) {
      // safeguard for https://code.google.com/p/android/issues/detail?id=7901#c43
      if (!image.contains(";base64,")) {
        sendIntent.setType("text/plain");
        return null;
      }
      // image looks like this: data:image/png;base64,R0lGODlhDAA...
      final String encodedImg = image.substring(image.indexOf(";base64,") + 8);
      // correct the intent type if anything else was passed, like a pdf: data:application/pdf;base64,..
      if (!image.contains("data:image/")) {
        sendIntent.setType(image.substring(image.indexOf("data:") + 5, image.indexOf(";base64")));
      }
      // the filename needs a valid extension, so it renders correctly in target apps
      final String imgExtension = image.substring(image.indexOf("/") + 1, image.indexOf(";base64"));
      String fileName;
      // if a subject was passed, use it as the filename
      // filenames must be unique when passing in multiple files [#158]
      if (notEmpty(subject)) {
        fileName = sanitizeFilename(subject) + (nthFile == 0 ? "" : "_" + nthFile) + "." + imgExtension;
      } else {
        fileName = "file" + (nthFile == 0 ? "" : "_" + nthFile) + "." + imgExtension;
      }
      saveFile(Base64.decode(encodedImg, Base64.DEFAULT), dir, fileName);
      localImage = "file://" + dir + "/" + fileName;
    } else if (image.startsWith("df:")) {
      // safeguard for https://code.google.com/p/android/issues/detail?id=7901#c43
      if (!image.contains(";base64,")) {
        sendIntent.setType("text/plain");
        return null;
      }
      // format looks like this :  df:filename.txt;data:image/png;base64,R0lGODlhDAA...
      final String fileName = image.substring(image.indexOf("df:") + 3, image.indexOf(";data:"));
      final String fileType = image.substring(image.indexOf(";data:") + 6, image.indexOf(";base64,"));
      final String encodedImg = image.substring(image.indexOf(";base64,") + 8);
      sendIntent.setType(fileType);
      saveFile(Base64.decode(encodedImg, Base64.DEFAULT), dir, sanitizeFilename(fileName));
      localImage = "file://" + dir + "/" + fileName;
    } else if (!image.startsWith("file://")) {
      throw new IllegalArgumentException("URL_NOT_SUPPORTED");
    } else {
      //get file MIME type
      String type = getMIMEType(image);
      //set intent data and Type
      sendIntent.setDataAndType(Uri.fromFile(new File(image)), type);
    }
    return Uri.parse(localImage);
  }

  private String getMIMEType(String fileName) {
      String type="*/*";
      String fName = fileName;
      int dotIndex = fName.lastIndexOf(".");
      if(dotIndex < 0){
          return type;
      }
      String end=fName.substring(dotIndex,fName.length()).toLowerCase();
      if(end=="")return type;
      for(int i=0;i<MIME_MapTable.length;i++){
          if(end.equals(MIME_MapTable[i][0]))
              type = MIME_MapTable[i][1];
      }
      return type;
  }

  private final String[][] MIME_MapTable={
      {".3gp",    "video/3gpp"},
      {".apk",    "application/vnd.android.package-archive"},
      {".asf",    "video/x-ms-asf"},
      {".avi",    "video/x-msvideo"},
      {".bin",    "application/octet-stream"},
      {".bmp",    "image/bmp"},
      {".c",  "text/plain"},
      {".class",  "application/octet-stream"},
      {".conf",   "text/plain"},
      {".cpp",    "text/plain"},
      {".doc",    "application/msword"},
      {".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
      {".xls",    "application/vnd.ms-excel"},
      {".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
      {".exe",    "application/octet-stream"},
      {".gif",    "image/gif"},
      {".gtar",   "application/x-gtar"},
      {".gz", "application/x-gzip"},
      {".h",  "text/plain"},
      {".htm",    "text/html"},
      {".html",   "text/html"},
      {".jar",    "application/java-archive"},
      {".java",   "text/plain"},
      {".jpeg",   "image/jpeg"},
      {".jpg",    "image/*"},
      {".js", "application/x-javascript"},
      {".log",    "text/plain"},
      {".m3u",    "audio/x-mpegurl"},
      {".m4a",    "audio/mp4a-latm"},
      {".m4b",    "audio/mp4a-latm"},
      {".m4p",    "audio/mp4a-latm"},
      {".m4u",    "video/vnd.mpegurl"},
      {".m4v",    "video/x-m4v"},
      {".mov",    "video/quicktime"},
      {".mp2",    "audio/x-mpeg"},
      {".mp3",    "audio/x-mpeg"},
      {".mp4",    "video/mp4"},
      {".mpc",    "application/vnd.mpohun.certificate"},
      {".mpe",    "video/mpeg"},
      {".mpeg",   "video/mpeg"},
      {".mpg",    "video/mpeg"},
      {".mpg4",   "video/mp4"},
      {".mpga",   "audio/mpeg"},
      {".msg",    "application/vnd.ms-outlook"},
      {".ogg",    "audio/ogg"},
      {".pdf",    "application/pdf"},
      {".png",    "image/png"},
      {".pps",    "application/vnd.ms-powerpoint"},
      {".ppt",    "application/vnd.ms-powerpoint"},
      {".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
      {".prop",   "text/plain"},
      {".rc", "text/plain"},
      {".rmvb",   "audio/x-pn-realaudio"},
      {".rtf",    "application/rtf"},
      {".sh", "text/plain"},
      {".tar",    "application/x-tar"},
      {".tgz",    "application/x-compressed"},
      {".txt",    "text/plain"},
      {".wav",    "audio/x-wav"},
      {".wma",    "audio/x-ms-wma"},
      {".wmv",    "audio/x-ms-wmv"},
      {".wps",    "application/vnd.ms-works"},
      {".xml",    "text/plain"},
      {".z",  "application/x-compress"},
      {".zip",    "application/x-zip-compressed"},
      {"",        "*/*"}
  };

  private boolean shareViaWhatsAppDirectly(final CallbackContext callbackContext, String message, final String subject, final JSONArray files, final String url, final String number) {
    // add the URL to the message, as there seems to be no separate field
    if (notEmpty(url)) {
      if (notEmpty(message)) {
        message += " " + url;
      } else {
        message = url;
      }
    }
    final String shareMessage = message;
    final SocialSharing plugin = this;
    cordova.getThreadPool().execute(new SocialSharingRunnable(callbackContext) {
      public void run() {
        final Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("smsto:" + number));

        intent.putExtra("sms_body", shareMessage);
        intent.putExtra("sms_subject", subject);
        intent.setPackage("com.whatsapp");

        try {
          if (files.length() > 0 && !"".equals(files.getString(0))) {
            final boolean hasMultipleAttachments = files.length() > 1;
            final String dir = getDownloadDir();
            if (dir != null) {
              ArrayList<Uri> fileUris = new ArrayList<Uri>();
              Uri fileUri = null;
              for (int i = 0; i < files.length(); i++) {
                fileUri = getFileUriAndSetType(intent, dir, files.getString(i), subject, i);
                if (fileUri != null) {
                  fileUris.add(fileUri);
                }
              }
              if (!fileUris.isEmpty()) {
                if (hasMultipleAttachments) {
                  intent.putExtra(Intent.EXTRA_STREAM, fileUris);
                } else {
                  intent.putExtra(Intent.EXTRA_STREAM, fileUri);
                }
              }
            }
          }
        } catch (Exception e) {
          callbackContext.error(e.getMessage());
        }
        try {
          // this was added to start the intent in a new window as suggested in #300 to prevent crashes upon return
          // update: didn't help (doesn't seem to hurt either though)
          intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

          // as an experiment for #300 we're explicitly running it on the ui thread here
          cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
              cordova.startActivityForResult(plugin, intent, ACTIVITY_CODE_SENDVIAWHATSAPP);
            }
          });
        } catch (Exception e) {
          callbackContext.error(e.getMessage());
        }
      }
    });
    return true;
  }

  private boolean invokeSMSIntent(final CallbackContext callbackContext, JSONObject options, String p_phonenumbers) {
    final String message = options.optString("message");
    // TODO test this on a real SMS enabled device before releasing it
//    final String subject = options.optString("subject");
//    final String image = options.optString("image");
    final String subject = null; //options.optString("subject");
    final String image = null; // options.optString("image");
    final String phonenumbers = getPhoneNumbersWithManufacturerSpecificSeparators(p_phonenumbers);
    final SocialSharing plugin = this;
    cordova.getThreadPool().execute(new SocialSharingRunnable(callbackContext) {
      public void run() {
        Intent intent;

        if (Build.VERSION.SDK_INT >= 19) { // Build.VERSION_CODES.KITKAT) {
          // passing in no phonenumbers for kitkat may result in an error,
          // but it may also work for some devices, so documentation will need to cover this case
          intent = new Intent(Intent.ACTION_SENDTO);
          intent.setData(Uri.parse("smsto:" + (notEmpty(phonenumbers) ? phonenumbers : "")));
        } else {
          intent = new Intent(Intent.ACTION_VIEW);
          intent.setType("vnd.android-dir/mms-sms");
          if (phonenumbers != null) {
            intent.putExtra("address", phonenumbers);
          }
        }
        intent.putExtra("sms_body", message);
        intent.putExtra("sms_subject", subject);

        try {
          if (image != null && !"".equals(image)) {
            final Uri fileUri = getFileUriAndSetType(intent, getDownloadDir(), image, subject, 0);
            if (fileUri != null) {
              intent.putExtra(Intent.EXTRA_STREAM, fileUri);
            }
          }
          // this was added to start the intent in a new window as suggested in #300 to prevent crashes upon return
          intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

          cordova.startActivityForResult(plugin, intent, 0);
        } catch (Exception e) {
          callbackContext.error(e.getMessage());
        }
      }
    });
    return true;
  }

  private static String getPhoneNumbersWithManufacturerSpecificSeparators(String phonenumbers) {
    if (notEmpty(phonenumbers)) {
      char separator;
      if (android.os.Build.MANUFACTURER.equalsIgnoreCase("samsung")) {
        separator = ',';
      } else {
        separator = ';';
      }
      return phonenumbers.replace(';', separator).replace(',', separator);
    }
    return null;
  }

  private ActivityInfo getActivity(final CallbackContext callbackContext, final Intent shareIntent, final String appPackageName) {
    final PackageManager pm = webView.getContext().getPackageManager();
    List<ResolveInfo> activityList = pm.queryIntentActivities(shareIntent, 0);
    for (final ResolveInfo app : activityList) {
      if ((app.activityInfo.packageName).contains(appPackageName)) {
        return app.activityInfo;
      }
    }
    // no matching app found
    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, getShareActivities(activityList)));
    return null;
  }

  private JSONArray getShareActivities(List<ResolveInfo> activityList) {
    List<String> packages = new ArrayList<String>();
    for (final ResolveInfo app : activityList) {
      packages.add(app.activityInfo.packageName);
    }
    return new JSONArray(packages);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    super.onActivityResult(requestCode, resultCode, intent);
    if (_callbackContext != null) {
      switch (requestCode) {
        case ACTIVITY_CODE_SEND__BOOLRESULT:
          _callbackContext.sendPluginResult(new PluginResult(
              PluginResult.Status.OK,
              resultCode == Activity.RESULT_OK));
          break;
        case ACTIVITY_CODE_SEND__OBJECT:
          JSONObject json = new JSONObject();
          try {
            json.put("completed", resultCode == Activity.RESULT_OK);
            json.put("app", ""); // we need a completely different approach if we want to support this on Android. Idea: https://clickclickclack.wordpress.com/2012/01/03/intercepting-androids-action_send-intents/
            _callbackContext.sendPluginResult(new PluginResult(
                PluginResult.Status.OK,
                json));
          } catch (JSONException e) {
            _callbackContext.error(e.getMessage());
          }
          break;
        default:
          _callbackContext.success();
      }
    }
  }

  private void createOrCleanDir(final String downloadDir) throws IOException {
    final File dir = new File(downloadDir);
    if (!dir.exists()) {
      if (!dir.mkdirs()) {
        throw new IOException("CREATE_DIRS_FAILED");
      }
    } else {
      cleanupOldFiles(dir);
    }
  }

  private static String getFileName(String url) {
    if (url.endsWith("/")) {
      url = url.substring(0, url.length()-1);
    }
    final String pattern = ".*/([^?#]+)?";
    Pattern r = Pattern.compile(pattern);
    Matcher m = r.matcher(url);
    if (m.find()) {
      return m.group(1);
    } else {
      return "file";
    }
  }

  private byte[] getBytes(InputStream is) throws IOException {
    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    int nRead;
    byte[] data = new byte[16384];
    while ((nRead = is.read(data, 0, data.length)) != -1) {
      buffer.write(data, 0, nRead);
    }
    buffer.flush();
    return buffer.toByteArray();
  }

  private void saveFile(byte[] bytes, String dirName, String fileName) throws IOException {
    final File dir = new File(dirName);
    final FileOutputStream fos = new FileOutputStream(new File(dir, fileName));
    fos.write(bytes);
    fos.flush();
    fos.close();
  }

  /**
   * As file.deleteOnExit does not work on Android, we need to delete files manually.
   * Deleting them in onActivityResult is not a good idea, because for example a base64 encoded file
   * will not be available for upload to Facebook (it's deleted before it's uploaded).
   * So the best approach is deleting old files when saving (sharing) a new one.
   */
  private void cleanupOldFiles(File dir) {
    for (File f : dir.listFiles()) {
      //noinspection ResultOfMethodCallIgnored
      f.delete();
    }
  }

  private static boolean notEmpty(String what) {
    return what != null &&
        !"".equals(what) &&
        !"null".equalsIgnoreCase(what);
  }

  private static String[] toStringArray(JSONArray jsonArray) throws JSONException {
    String[] result = new String[jsonArray.length()];
    for (int i = 0; i < jsonArray.length(); i++) {
      result[i] = jsonArray.getString(i);
    }
    return result;
  }

  public static String sanitizeFilename(String name) {
    return name.replaceAll("[:\\\\/*?|<> ]", "_");
  }
}
