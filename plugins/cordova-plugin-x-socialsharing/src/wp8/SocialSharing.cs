using Microsoft.Phone.Tasks;

using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;

using Newtonsoft.Json;

namespace Cordova.Extension.Commands
{
    public class SocialSharing : BaseCommand
    {

        public void available(string jsonArgs)
        {
            DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
        }

        public void share(string jsonArgs)
        {

            var options = JsonHelper.Deserialize<string[]>(jsonArgs);

            var message = options[0];
            var title = options[1];
            var files = JsonHelper.Deserialize<string[]>(options[2]);
            var link = options[3];

            if (link != null && !"null".Equals(link))
            {
                ShareLinkTask shareLinkTask = new ShareLinkTask();
                shareLinkTask.Title = title;
                shareLinkTask.LinkUri = new System.Uri(link, System.UriKind.Absolute);
                shareLinkTask.Message = message;
                shareLinkTask.Show();
            }
            else if (files != null && files.Length > 0)
            {
                ShareLinkTask shareLinkTask = new ShareLinkTask();
                shareLinkTask.Title = title;
                shareLinkTask.LinkUri = new System.Uri(files[0], System.UriKind.Absolute);
                shareLinkTask.Message = message;
                shareLinkTask.Show();
            }
            else
            {
                var shareStatusTask = new ShareStatusTask { Status = message };
                shareStatusTask.Show();
            }
            // unfortunately, there is no way to tell if something was shared, so just invoke the successCallback
            DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
        }

        public void canShareViaEmail(string jsonArgs)
        {
            DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
        }

        // HTML and attachments are currently not supported on WP8
        public void shareViaEmail(string jsonArgs)
        {
            var options = JsonHelper.Deserialize<string[]>(jsonArgs);
            EmailComposeTask draft = new EmailComposeTask();
            draft.Body = options[0];
            draft.Subject = options[1];
            if (!"null".Equals(options[2]))
            {
                draft.To = string.Join(",", options[2]);
            }
            if (!"null".Equals(options[3]))
            {
                draft.Cc = string.Join(",", options[3]);
            }
            if (!"null".Equals(options[4]))
            {
                draft.Bcc = string.Join(",", options[4]);
            }
            draft.Show();
            DispatchCommandResult(new PluginResult(PluginResult.Status.OK, true));
        }
		
		 public void shareViaSMS(string jsonArgs)
        {
            var options = JsonHelper.Deserialize<string[]>(jsonArgs);

            SmsComposeTask smsComposeTask = new SmsComposeTask();

			smsComposeTask.To = options[1];
            SMSMessageClass m = JsonConvert.DeserializeObject<SMSMessageClass>(options[0]);
            smsComposeTask.Body = m.message;

			smsComposeTask.Show();

			DispatchCommandResult(new PluginResult(PluginResult.Status.OK, true));
        }
    }

    public class SMSMessageClass
    {
        public string message { get; set; }
    }

}
