/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
declare class AppRate {
	static locales:Locales;
	static preferences:AppRatePreferences;
	
	static init():AppRate;
	static promptForRating(immediately?:boolean):AppRate;
	static navigateToAppStore():AppRate;
}

declare class AppRatePreferences {
	useLanguage:string;
	displayAppName:string;
	promptAgainForEachNewVersion:boolean;
	usesUntilPrompt:number;
	openStoreInApp:boolean;
	useCustomRateDialog:boolean;
	callbacks:CallbackPreferences;
	storeAppURL:StoreAppURLPreferences;
	customLocale:CustomLocale;
}

declare class StoreAppURLPreferences {
	ios:string;
	android:string;
	blackberry:string;
	windows8:string;
	windows:string;
}

declare class CallbackPreferences {
	onButtonClicked:(buttonIndex:number) => void;
	onRateDialogShow:(rateCallback:(buttonIndex:number) => void) => void;
}

declare class CustomLocale {
	title:string;
	message:string;
	cancelButtonLabel:string;
	laterButtonLabel:string;
	rateButtonLabel:string;
}

declare class Locales {
	addLocale(localeObject:Locale):Locale;
	getLocale(language:string, applicationTitle?:string):Locale;
	getLocalesNames():Array<string>;
}

declare class Locale {
	constructor(localeOptions:LocaleOptions);
}

declare class LocaleOptions {
	language:string
	title:string;
	message:string;
	cancelButtonLabel:string;
	laterButtonLabel:string;
	rateButtonLabel:string;
}
