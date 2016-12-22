/*
 * Copyright (c) 2013 by Alan Mendelevich
 * 
 * Licensed under MIT license.
 * 
 * See license.txt for details.
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace UniversalAnalyticsPlugin
{
    public static class PhoneNameResolver
    {
        public static CanonicalPhoneName Resolve(string manufacturer, string model)
        {
            var manufacturerNormalized = manufacturer.Trim().ToUpper();

            switch (manufacturerNormalized)
            {
                case "NOKIA":
                case "MICROSOFT":
                case "MICROSOFTMDG":
                    return ResolveNokia(manufacturer, model);
                case "HTC":
                    return ResolveHtc(manufacturer, model);
                case "SAMSUNG":
                    return ResolveSamsung(manufacturer, model);
                case "LG":
                    return ResolveLg(manufacturer, model);
                case "HUAWEI":
                    return ResolveHuawei(manufacturer, model);
                default:
                    return new CanonicalPhoneName()
                    {
                        ReportedManufacturer = manufacturer,
                        ReportedModel = model,
                        CanonicalManufacturer = manufacturer,
                        CanonicalModel = model,
                        IsResolved = false
                    };
            }
        }

        private static CanonicalPhoneName ResolveHuawei(string manufacturer, string model)
        {
            var modelNormalized = model.Trim().ToUpper();

            var result = new CanonicalPhoneName()
            {
                ReportedManufacturer = manufacturer,
                ReportedModel = model,
                CanonicalManufacturer = "HUAWEI",
                CanonicalModel = model,
                IsResolved = false
            };

            var lookupValue = modelNormalized;

            if (lookupValue.StartsWith("HUAWEI H883G"))
            {
                lookupValue = "HUAWEI H883G";
            }

            if (lookupValue.StartsWith("HUAWEI W1"))
            {
                lookupValue = "HUAWEI W1";
            }

            if (modelNormalized.StartsWith("HUAWEI W2"))
            {
                lookupValue = "HUAWEI W2";
            }

            if (huaweiLookupTable.ContainsKey(lookupValue))
            {
                var modelMetadata = huaweiLookupTable[lookupValue];
                result.CanonicalModel = modelMetadata.CanonicalModel;
                result.Comments = modelMetadata.Comments;
                result.IsResolved = true;
            }

            return result;
        }

        private static CanonicalPhoneName ResolveLg(string manufacturer, string model)
        {
            var modelNormalized = model.Trim().ToUpper();

            var result = new CanonicalPhoneName()
            {
                ReportedManufacturer = manufacturer,
                ReportedModel = model,
                CanonicalManufacturer = "LG",
                CanonicalModel = model,
                IsResolved = false
            };

            var lookupValue = modelNormalized;

            if (lookupValue.StartsWith("LG-C900"))
            {
                lookupValue = "LG-C900";
            }

            if (lookupValue.StartsWith("LG-E900"))
            {
                lookupValue = "LG-E900";
            }

            if (lgLookupTable.ContainsKey(lookupValue))
            {
                var modelMetadata = lgLookupTable[lookupValue];
                result.CanonicalModel = modelMetadata.CanonicalModel;
                result.Comments = modelMetadata.Comments;
                result.IsResolved = true;
            }

            return result;
        }

        private static CanonicalPhoneName ResolveSamsung(string manufacturer, string model)
        {
            var modelNormalized = model.Trim().ToUpper();

            var result = new CanonicalPhoneName()
            {
                ReportedManufacturer = manufacturer,
                ReportedModel = model,
                CanonicalManufacturer = "SAMSUNG",
                CanonicalModel = model,
                IsResolved = false
            };

            var lookupValue = modelNormalized;

            if (lookupValue.StartsWith("GT-S7530"))
            {
                lookupValue = "GT-S7530";
            }

            if (lookupValue.StartsWith("SGH-I917"))
            {
                lookupValue = "SGH-I917";
            }

            if (samsungLookupTable.ContainsKey(lookupValue))
            {
                var modelMetadata = samsungLookupTable[lookupValue];
                result.CanonicalModel = modelMetadata.CanonicalModel;
                result.Comments = modelMetadata.Comments;
                result.IsResolved = true;
            }

            return result;
        }

        private static CanonicalPhoneName ResolveHtc(string manufacturer, string model)
        {
            var modelNormalized = model.Trim().ToUpper();

            var result = new CanonicalPhoneName()
            {
                ReportedManufacturer = manufacturer,
                ReportedModel = model,
                CanonicalManufacturer = "HTC",
                CanonicalModel = model,
                IsResolved = false
            };

            var lookupValue = modelNormalized;

            if (lookupValue.StartsWith("A620"))
            {
                lookupValue = "A620";
            }

            if (lookupValue.StartsWith("C625"))
            {
                lookupValue = "C625";
            }

            if (lookupValue.StartsWith("C620"))
            {
                lookupValue = "C620";
            }

            if (htcLookupTable.ContainsKey(lookupValue))
            {
                var modelMetadata = htcLookupTable[lookupValue];
                result.CanonicalModel = modelMetadata.CanonicalModel;
                result.Comments = modelMetadata.Comments;
                result.IsResolved = true;
            }

            return result;
        }

        private static CanonicalPhoneName ResolveNokia(string manufacturer, string model)
        {
            var modelNormalized = model.Trim().ToUpper();

            var result = new CanonicalPhoneName()
            {
                ReportedManufacturer = manufacturer,
                ReportedModel = model,
                CanonicalManufacturer = "NOKIA",
                CanonicalModel = model,
                IsResolved = false
            };

            var lookupValue = modelNormalized;
            if (modelNormalized.StartsWith("RM-"))
            {
                var rms = Regex.Match(modelNormalized, "(RM-)([0-9]+)");
                lookupValue = rms.Value;
            }

            if (nokiaLookupTable.ContainsKey(lookupValue))
            {
                var modelMetadata = nokiaLookupTable[lookupValue];

                if (!string.IsNullOrEmpty(modelMetadata.CanonicalManufacturer))
                {
                    result.CanonicalManufacturer = modelMetadata.CanonicalManufacturer;
                }
                result.CanonicalModel = modelMetadata.CanonicalModel;
                result.Comments = modelMetadata.Comments;
                result.IsResolved = true;
            }

            return result;
        }


        private static Dictionary<string, CanonicalPhoneName> huaweiLookupTable = new Dictionary<string, CanonicalPhoneName>()
        {
            // Huawei W1
            { "HUAWEI H883G", new CanonicalPhoneName() { CanonicalModel = "Ascend W1" } },
            { "HUAWEI W1", new CanonicalPhoneName() { CanonicalModel = "Ascend W1" } },
            
            // Huawei Ascend W2
            { "HUAWEI W2", new CanonicalPhoneName() { CanonicalModel = "Ascend W2" } },
        };

        private static Dictionary<string, CanonicalPhoneName> lgLookupTable = new Dictionary<string, CanonicalPhoneName>()
        {
            // Optimus 7Q/Quantum
            { "LG-C900", new CanonicalPhoneName() { CanonicalModel = "Optimus 7Q/Quantum" } },

            // Optimus 7
            { "LG-E900", new CanonicalPhoneName() { CanonicalModel = "Optimus 7" } },

            // Jil Sander
            { "LG-E906", new CanonicalPhoneName() { CanonicalModel = "Jil Sander" } },

            // Lancet
            { "LGVW820", new CanonicalPhoneName() { CanonicalModel = "Lancet" } },
        };

        private static Dictionary<string, CanonicalPhoneName> samsungLookupTable = new Dictionary<string, CanonicalPhoneName>()
        {
            // OMNIA W
            { "GT-I8350", new CanonicalPhoneName() { CanonicalModel = "Omnia W" } },
            { "GT-I8350T", new CanonicalPhoneName() { CanonicalModel = "Omnia W" } },
            { "OMNIA W", new CanonicalPhoneName() { CanonicalModel = "Omnia W" } },

            // OMNIA 7
            { "GT-I8700", new CanonicalPhoneName() { CanonicalModel = "Omnia 7" } },
            { "OMNIA7", new CanonicalPhoneName() { CanonicalModel = "Omnia 7" } },

            // OMNIA M
            { "GT-S7530", new CanonicalPhoneName() { CanonicalModel = "Omnia 7" } },

            // Focus
            { "I917", new CanonicalPhoneName() { CanonicalModel = "Focus" } },
            { "SGH-I917", new CanonicalPhoneName() { CanonicalModel = "Focus" } },

            // Focus 2
            { "SGH-I667", new CanonicalPhoneName() { CanonicalModel = "Focus 2" } },

            // Focus Flash
            { "SGH-I677", new CanonicalPhoneName() { CanonicalModel = "Focus Flash" } },

            // Focus S
            { "HADEN", new CanonicalPhoneName() { CanonicalModel = "Focus S" } },
            { "SGH-I937", new CanonicalPhoneName() { CanonicalModel = "Focus S" } },

            // ATIV S
            { "GT-I8750", new CanonicalPhoneName() { CanonicalModel = "ATIV S" } },
            { "SGH-T899M", new CanonicalPhoneName() { CanonicalModel = "ATIV S" } },

            // ATIV Odyssey
            { "SCH-I930", new CanonicalPhoneName() { CanonicalModel = "ATIV Odyssey" } },
            { "SCH-R860U", new CanonicalPhoneName() { CanonicalModel = "ATIV Odyssey", Comments="US Cellular" } },

            // ATIV S Neo
            { "SPH-I800", new CanonicalPhoneName() { CanonicalModel = "ATIV S Neo", Comments="Sprint" } },
            { "SGH-I187", new CanonicalPhoneName() { CanonicalModel = "ATIV S Neo", Comments="AT&T" } },
            { "GT-I8675", new CanonicalPhoneName() { CanonicalModel = "ATIV S Neo" } },

            // ATIV SE
            { "SM-W750V", new CanonicalPhoneName() { CanonicalModel = "ATIV SE", Comments="Verizon" } },
        };

        private static Dictionary<string, CanonicalPhoneName> htcLookupTable = new Dictionary<string, CanonicalPhoneName>()
        {
            // Surround
            { "7 MONDRIAN T8788", new CanonicalPhoneName() { CanonicalModel = "Surround" } },
            { "T8788", new CanonicalPhoneName() { CanonicalModel = "Surround" } },
            { "SURROUND", new CanonicalPhoneName() { CanonicalModel = "Surround" } },
            { "SURROUND T8788", new CanonicalPhoneName() { CanonicalModel = "Surround" } },

            // Mozart
            { "7 MOZART", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "7 MOZART T8698", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "HTC MOZART", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "MERSAD 7 MOZART T8698", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "MOZART", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "MOZART T8698", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "PD67100", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },
            { "T8697", new CanonicalPhoneName() { CanonicalModel = "Mozart" } },

            // Pro
            { "7 PRO T7576", new CanonicalPhoneName() { CanonicalModel = "7 Pro" } },
            { "MWP6885", new CanonicalPhoneName() { CanonicalModel = "7 Pro" } },
            { "USCCHTC-PC93100", new CanonicalPhoneName() { CanonicalModel = "7 Pro" } },

            // Arrive
            { "PC93100", new CanonicalPhoneName() { CanonicalModel = "Arrive", Comments = "Sprint" } },
            { "T7575", new CanonicalPhoneName() { CanonicalModel = "Arrive", Comments = "Sprint" } },

            // HD2
            { "HD2", new CanonicalPhoneName() { CanonicalModel = "HD2" } },
            { "HD2 LEO", new CanonicalPhoneName() { CanonicalModel = "HD2" } },
            { "LEO", new CanonicalPhoneName() { CanonicalModel = "HD2" } },

            // HD7
            { "7 SCHUBERT T9292", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "GOLD", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "HD7", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "HD7 T9292", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "MONDRIAN", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "SCHUBERT", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "Schubert T9292", new CanonicalPhoneName() { CanonicalModel = "HD7" } },
            { "T9296", new CanonicalPhoneName() { CanonicalModel = "HD7", Comments = "Telstra, AU" } },
            { "TOUCH-IT HD7", new CanonicalPhoneName() { CanonicalModel = "HD7" } },

            // HD7S
            { "T9295", new CanonicalPhoneName() { CanonicalModel = "HD7S" } },

            // Trophy
            { "7 TROPHY", new CanonicalPhoneName() { CanonicalModel = "Trophy" } },
            { "7 TROPHY T8686", new CanonicalPhoneName() { CanonicalModel = "Trophy" } },
            { "PC40100", new CanonicalPhoneName() { CanonicalModel = "Trophy", Comments = "Verizon" } },
            { "SPARK", new CanonicalPhoneName() { CanonicalModel = "Trophy" } },
            { "TOUCH-IT TROPHY", new CanonicalPhoneName() { CanonicalModel = "Trophy" } },
            { "MWP6985", new CanonicalPhoneName() { CanonicalModel = "Trophy" } },

            // 8S
            { "A620", new CanonicalPhoneName() { CanonicalModel = "8S" } },
            { "WINDOWS PHONE 8S BY HTC", new CanonicalPhoneName() { CanonicalModel = "8S" } },

            // 8X
            { "C620", new CanonicalPhoneName() { CanonicalModel = "8X" } },
            { "C625", new CanonicalPhoneName() { CanonicalModel = "8X" } },
            { "HTC6990LVW", new CanonicalPhoneName() { CanonicalModel = "8X", Comments="Verizon" } },
            { "PM23300", new CanonicalPhoneName() { CanonicalModel = "8X", Comments="AT&T" } },
            { "WINDOWS PHONE 8X BY HTC", new CanonicalPhoneName() { CanonicalModel = "8X" } },

            // 8XT
            { "HTCPO881", new CanonicalPhoneName() { CanonicalModel = "8XT", Comments="Sprint" } },
            { "HTCPO881 SPRINT", new CanonicalPhoneName() { CanonicalModel = "8XT", Comments="Sprint" } },
            { "HTCPO881 HTC", new CanonicalPhoneName() { CanonicalModel = "8XT", Comments="Sprint" } },

            // Titan
            { "ETERNITY", new CanonicalPhoneName() { CanonicalModel = "Titan", Comments = "China" } },
            { "PI39100", new CanonicalPhoneName() { CanonicalModel = "Titan", Comments = "AT&T" } },
            { "TITAN X310E", new CanonicalPhoneName() { CanonicalModel = "Titan" } },
            { "ULTIMATE", new CanonicalPhoneName() { CanonicalModel = "Titan" } },
            { "X310E", new CanonicalPhoneName() { CanonicalModel = "Titan" } },
            { "X310E TITAN", new CanonicalPhoneName() { CanonicalModel = "Titan" } },
            
            // Titan II
            { "PI86100", new CanonicalPhoneName() { CanonicalModel = "Titan II", Comments = "AT&T" } },
            { "RADIANT", new CanonicalPhoneName() { CanonicalModel = "Titan II" } },

            // Radar
            { "RADAR", new CanonicalPhoneName() { CanonicalModel = "Radar" } },
            { "RADAR 4G", new CanonicalPhoneName() { CanonicalModel = "Radar", Comments = "T-Mobile USA" } },
            { "RADAR C110E", new CanonicalPhoneName() { CanonicalModel = "Radar" } },
            
            // One M8
            { "HTC6995LVW", new CanonicalPhoneName() { CanonicalModel = "One (M8)", Comments="Verizon" } },
            { "0P6B180", new CanonicalPhoneName() { CanonicalModel = "One (M8)", Comments="AT&T" } },
            { "0P6B140", new CanonicalPhoneName() { CanonicalModel = "One (M8)", Comments="Dual SIM?" } },
        };

        private static Dictionary<string, CanonicalPhoneName> nokiaLookupTable = new Dictionary<string, CanonicalPhoneName>()
        {
            // Lumia 505
            { "LUMIA 505", new CanonicalPhoneName() { CanonicalModel = "Lumia 505" } },
            // Lumia 510
            { "LUMIA 510", new CanonicalPhoneName() { CanonicalModel = "Lumia 510" } },
            { "NOKIA 510", new CanonicalPhoneName() { CanonicalModel = "Lumia 510" } },
            // Lumia 610
            { "LUMIA 610", new CanonicalPhoneName() { CanonicalModel = "Lumia 610" } },
            { "LUMIA 610 NFC", new CanonicalPhoneName() { CanonicalModel = "Lumia 610", Comments = "NFC" } },
            { "NOKIA 610", new CanonicalPhoneName() { CanonicalModel = "Lumia 610" } },
            { "NOKIA 610C", new CanonicalPhoneName() { CanonicalModel = "Lumia 610" } },
            // Lumia 620
            { "LUMIA 620", new CanonicalPhoneName() { CanonicalModel = "Lumia 620" } },
            { "RM-846", new CanonicalPhoneName() { CanonicalModel = "Lumia 620" } },
            // Lumia 710
            { "LUMIA 710", new CanonicalPhoneName() { CanonicalModel = "Lumia 710" } },
            { "NOKIA 710", new CanonicalPhoneName() { CanonicalModel = "Lumia 710" } },
            // Lumia 800
            { "LUMIA 800", new CanonicalPhoneName() { CanonicalModel = "Lumia 800" } },
            { "LUMIA 800C", new CanonicalPhoneName() { CanonicalModel = "Lumia 800" } },
            { "NOKIA 800", new CanonicalPhoneName() { CanonicalModel = "Lumia 800" } },
            { "NOKIA 800C", new CanonicalPhoneName() { CanonicalModel = "Lumia 800", Comments = "China" } },
            // Lumia 810
            { "RM-878", new CanonicalPhoneName() { CanonicalModel = "Lumia 810" } },
            // Lumia 820
            { "RM-824", new CanonicalPhoneName() { CanonicalModel = "Lumia 820" } },
            { "RM-825", new CanonicalPhoneName() { CanonicalModel = "Lumia 820" } },
            { "RM-826", new CanonicalPhoneName() { CanonicalModel = "Lumia 820" } },
            // Lumia 822
            { "RM-845", new CanonicalPhoneName() { CanonicalModel = "Lumia 822", Comments = "Verizon" } },
            // Lumia 900
            { "LUMIA 900", new CanonicalPhoneName() { CanonicalModel = "Lumia 900" } },
            { "NOKIA 900", new CanonicalPhoneName() { CanonicalModel = "Lumia 900" } },
            // Lumia 920
            { "RM-820", new CanonicalPhoneName() { CanonicalModel = "Lumia 920" } },
            { "RM-821", new CanonicalPhoneName() { CanonicalModel = "Lumia 920" } },
            { "RM-822", new CanonicalPhoneName() { CanonicalModel = "Lumia 920" } },
            { "RM-867", new CanonicalPhoneName() { CanonicalModel = "Lumia 920", Comments = "920T" } },
            { "NOKIA 920", new CanonicalPhoneName() { CanonicalModel = "Lumia 920" } },
            { "LUMIA 920", new CanonicalPhoneName() { CanonicalModel = "Lumia 920" } },
            // Lumia 520
            { "RM-914", new CanonicalPhoneName() { CanonicalModel = "Lumia 520" } },
            { "RM-915", new CanonicalPhoneName() { CanonicalModel = "Lumia 520" } },
            { "RM-913", new CanonicalPhoneName() { CanonicalModel = "Lumia 520", Comments="520T" } },
            // Lumia 521?
            { "RM-917", new CanonicalPhoneName() { CanonicalModel = "Lumia 521", Comments="T-Mobile 520" } },
            // Lumia 720
            { "RM-885", new CanonicalPhoneName() { CanonicalModel = "Lumia 720" } },
            { "RM-887", new CanonicalPhoneName() { CanonicalModel = "Lumia 720", Comments="China 720T" } },
            // Lumia 928
            { "RM-860", new CanonicalPhoneName() { CanonicalModel = "Lumia 928" } },
            // Lumia 925
            { "RM-892", new CanonicalPhoneName() { CanonicalModel = "Lumia 925" } },
            { "RM-893", new CanonicalPhoneName() { CanonicalModel = "Lumia 925" } },
            { "RM-910", new CanonicalPhoneName() { CanonicalModel = "Lumia 925" } },
            { "RM-955", new CanonicalPhoneName() { CanonicalModel = "Lumia 925", Comments="China 925T" } },
            // Lumia 1020
            { "RM-875", new CanonicalPhoneName() { CanonicalModel = "Lumia 1020" } },
            { "RM-876", new CanonicalPhoneName() { CanonicalModel = "Lumia 1020" } },
            { "RM-877", new CanonicalPhoneName() { CanonicalModel = "Lumia 1020" } },
            // Lumia 625
            { "RM-941", new CanonicalPhoneName() { CanonicalModel = "Lumia 625" } },
            { "RM-942", new CanonicalPhoneName() { CanonicalModel = "Lumia 625" } },
            { "RM-943", new CanonicalPhoneName() { CanonicalModel = "Lumia 625" } },
            // Lumia 1520
            { "RM-937", new CanonicalPhoneName() { CanonicalModel = "Lumia 1520" } },
            { "RM-938", new CanonicalPhoneName() { CanonicalModel = "Lumia 1520", Comments="AT&T" } },
            { "RM-939", new CanonicalPhoneName() { CanonicalModel = "Lumia 1520" } },
            { "RM-940", new CanonicalPhoneName() { CanonicalModel = "Lumia 1520", Comments="AT&T" } },
            // Lumia 525
            { "RM-998", new CanonicalPhoneName() { CanonicalModel = "Lumia 525" } },
            // Lumia 1320
            { "RM-994", new CanonicalPhoneName() { CanonicalModel = "Lumia 1320" } },
            { "RM-995", new CanonicalPhoneName() { CanonicalModel = "Lumia 1320" } },
            { "RM-996", new CanonicalPhoneName() { CanonicalModel = "Lumia 1320" } },
            // Lumia Icon
            { "RM-927", new CanonicalPhoneName() { CanonicalModel = "Lumia Icon", Comments="Verizon" } },
            // Lumia 630
            { "RM-976", new CanonicalPhoneName() { CanonicalModel = "Lumia 630" } },
            { "RM-977", new CanonicalPhoneName() { CanonicalModel = "Lumia 630" } },
            { "RM-978", new CanonicalPhoneName() { CanonicalModel = "Lumia 630" } },
            { "RM-979", new CanonicalPhoneName() { CanonicalModel = "Lumia 630" } },
            // Lumia 635
            { "RM-974", new CanonicalPhoneName() { CanonicalModel = "Lumia 635" } },
            { "RM-975", new CanonicalPhoneName() { CanonicalModel = "Lumia 635" } },
            { "RM-1078", new CanonicalPhoneName() { CanonicalModel = "Lumia 635", Comments="Sprint" } },
            // Lumia 526
            { "RM-997", new CanonicalPhoneName() { CanonicalModel = "Lumia 526", Comments="China Mobile" } },
            // Lumia 930
            { "RM-1045", new CanonicalPhoneName() { CanonicalModel = "Lumia 930" } },
            { "RM-1087", new CanonicalPhoneName() { CanonicalModel = "Lumia 930" } },
            // Lumia 636
            { "RM-1027", new CanonicalPhoneName() { CanonicalModel = "Lumia 636", Comments="China" } },
            // Lumia 638
            { "RM-1010", new CanonicalPhoneName() { CanonicalModel = "Lumia 638", Comments="China" } },
            // Lumia 530
            { "RM-1017", new CanonicalPhoneName() { CanonicalModel = "Lumia 530", Comments="Single SIM" } },
            { "RM-1018", new CanonicalPhoneName() { CanonicalModel = "Lumia 530", Comments="Single SIM" } },
            { "RM-1019", new CanonicalPhoneName() { CanonicalModel = "Lumia 530", Comments="Dual SIM" } },
            { "RM-1020", new CanonicalPhoneName() { CanonicalModel = "Lumia 530", Comments="Dual SIM" } },
            // Lumia 730
            { "RM-1040", new CanonicalPhoneName() { CanonicalModel = "Lumia 730", Comments="Dual SIM" } },
            // Lumia 735
            { "RM-1038", new CanonicalPhoneName() { CanonicalModel = "Lumia 735" } },
            { "RM-1039", new CanonicalPhoneName() { CanonicalModel = "Lumia 735" } },
            { "RM-1041", new CanonicalPhoneName() { CanonicalModel = "Lumia 735", Comments="Verizon" } },
            // Lumia 830
            { "RM-983", new CanonicalPhoneName() { CanonicalModel = "Lumia 830" } },
            { "RM-984", new CanonicalPhoneName() { CanonicalModel = "Lumia 830" } },
            { "RM-985", new CanonicalPhoneName() { CanonicalModel = "Lumia 830" } },
            { "RM-1049", new CanonicalPhoneName() { CanonicalModel = "Lumia 830" } },
            // Lumia 535
            { "RM-1089", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 535" } },
            { "RM-1090", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 535" } },
            { "RM-1091", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 535" } },
            { "RM-1092", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 535" } },
            // Lumia 435
            { "RM-1068", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 435", Comments="DS" } },
            { "RM-1069", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 435", Comments="DS" } },
            { "RM-1070", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 435", Comments="DS" } },
            { "RM-1071", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 435", Comments="DS" } },
            { "RM-1114", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 435", Comments="DS" } },
            // Lumia 532
            { "RM-1031", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 532", Comments="DS" } },
            { "RM-1032", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 532", Comments="DS" } },
            { "RM-1034", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 532", Comments="DS" } },
            { "RM-1115", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 532", Comments="DS" } },
            // Lumia 640
            { "RM-1072", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1073", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1074", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1075", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1077", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1109", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            { "RM-1113", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640" } },
            // Lumia 640XL
            { "RM-1062", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1063", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1064", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1065", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1066", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1067", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            { "RM-1096", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 640 XL" } },
            // Lumia 540
            { "RM-1140", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 540" } },
            { "RM-1141", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 540" } },
            // Lumia 430
            { "RM-1099", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 430", Comments="DS" } },
            // Lumia 950
            { "RM-1104", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 950", Comments="DS" } },
            { "RM-1105", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 950", Comments="DS" } },
            { "RM-1118", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 950", Comments="DS" } },
            // Lumia 950 XL
            { "RM-1085", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 950 XL" } },
            { "RM-1116", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 950 XL", Comments="DS" } },
            // Lumia 550
            { "RM-1127", new CanonicalPhoneName() { CanonicalManufacturer="MICROSOFT", CanonicalModel = "Lumia 550" } },
        };
    }

    public class CanonicalPhoneName
    {
        public string ReportedManufacturer { get; set; }
        public string ReportedModel { get; set; }
        public string CanonicalManufacturer { get; set; }
        public string CanonicalModel { get; set; }
        public string Comments { get; set; }
        public bool IsResolved { get; set; }

        public string FullCanonicalName
        {
            get { return CanonicalManufacturer + " " + CanonicalModel; }
        }
    }
}