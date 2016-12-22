// PlatformInfoProvider.WP.cs

using GoogleAnalytics.Core;
using System;
using System.IO.IsolatedStorage;
using System.Threading.Tasks;
using System.Windows;

namespace UniversalAnalyticsPlugin
{
    public sealed class PlatformInfoProvider : IPlatformInfoProvider
    {
        const string Key_AnonymousClientId = "GoogleAnaltyics.AnonymousClientId";
        string anonymousClientId;
        Dimensions _screenResolution = new Dimensions(0,0);

#pragma warning disable 0067
        public event EventHandler ViewPortResolutionChanged;

        public event EventHandler ScreenResolutionChanged;
#pragma warning restore 0067

        public PlatformInfoProvider()
        {
            Deployment.Current.Dispatcher.BeginInvoke(() => {
                double scale = (double)Application.Current.Host.Content.ScaleFactor / 100;
                int h = (int)Math.Ceiling(Application.Current.Host.Content.ActualHeight * scale);
                int w = (int)Math.Ceiling(Application.Current.Host.Content.ActualWidth * scale);               
                _screenResolution = new Dimensions(h, w);
            });
        }

        public string AnonymousClientId
        {
            get
            {
                if (anonymousClientId == null)
                {
                    var appSettings = IsolatedStorageSettings.ApplicationSettings;
                    if (!appSettings.Contains(Key_AnonymousClientId))
                    {
                        anonymousClientId = Guid.NewGuid().ToString();
                        appSettings.Add(Key_AnonymousClientId, anonymousClientId);
                        appSettings.Save();
                    }
                    else
                    {
                        anonymousClientId = (string)appSettings[Key_AnonymousClientId];
                    }
                }
                return anonymousClientId;
            }
            set { anonymousClientId = value; }
        }

        public Dimensions ScreenResolution
        {
            get
            {
                return _screenResolution;
            }
        }

        public Dimensions ViewPortResolution
        {
            get { return ScreenResolution; }
        }

        public string UserLanguage
        {
            get { return System.Globalization.CultureInfo.CurrentUICulture.Name; }
        }

        public int? ScreenColorDepthBits
        {
            get { return null; }
        }

        public void OnTracking()
        { }

        public string GetUserAgent()
        {
            var sysInfo = UniversalAnalyticsPlugin.PhoneNameResolver.Resolve(Microsoft.Phone.Info.DeviceStatus.DeviceManufacturer, Microsoft.Phone.Info.DeviceStatus.DeviceName);
            Version osVer = Environment.OSVersion.Version;
            string uaMask;

            if (osVer.Minor == 10)
            {
                // Windows Phone 8.1
                uaMask = "Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv11.0; IEMobile/11.0; {1}; {2}) like Gecko";
            }
            else
            {
                // Windows Phone 8.0
                uaMask = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone OS {0}; Trident/6.0; IEMobile/10.0; ARM; Touch; {1}; {2})";
            }

            //var userAgentMask = "Mozilla/[version] ([system and browser information]) [platform] ([platform details]) [extensions]";
            return string.Format(uaMask, Environment.OSVersion.Version, sysInfo.CanonicalManufacturer, sysInfo.CanonicalModel);       
        }
    }
}
