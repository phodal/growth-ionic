import * as marked from "marked";
import * as _ from "lodash";
import {TIPS} from "../data/TIPS";

export function convertToMarkdown(data) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  return marked(data);
}

export function getSpinnerConfig() {
  return {
    spinner: "circles",
    content: `<ion-spinner [name]="d.spinner"></ion-spinner><p><strong>Tips</strong>： ` + TIPS[_.random(5)] + "</p>",
    duration: 20000
  };
}

export function openLink(link) {
  window.open(link, "_system", "location=yes");
}
