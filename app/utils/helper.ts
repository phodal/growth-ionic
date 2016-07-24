import * as showdown from "showdown";
import * as _ from "lodash";
import {TIPS} from "../data/TIPS";

export function convertToMarkdown(data) {
  let converter = new showdown.Converter({tables: true, smoothLivePreview: true, ghCodeBlocks: true});
  return converter.makeHtml(data);
}

export function getSpinnerConfig() {
  return {
    spinner: "circles",
    content: `<ion-spinner [name]="d.spinner"></ion-spinner><p><strong>Tips</strong>： ` + TIPS[_.random(5)] + "</p>",
    duration: 20000
  };
}
