using System;
using System.Xml;

namespace UniversalAnalyticsPlugin
{
    internal static class Helpers
    {
        public static string GetAppAttribute(string attributeName)
        {
            try
            {
                XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
                xmlReaderSettings.XmlResolver = new XmlXapResolver();
                using (XmlReader xmlReader = XmlReader.Create("WMAppManifest.xml", xmlReaderSettings))
                {
                    xmlReader.ReadToDescendant("App");
                    if (!xmlReader.IsStartElement())
                    {
                        throw new FormatException("WMAppManifest.xml is missing");
                    }
                    return xmlReader.GetAttribute(attributeName);
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
