import * as _ from "lodash";
import {TIPS} from "../data/TIPS";

export const ANIMATION_DURATION = 500;

export function getSpinnerConfig() {
  return {
    spinner: "circles",
    content: `<ion-spinner [name]="d.spinner"></ion-spinner><p><strong>Tips</strong>： ` + TIPS[_.random(5)] + "</p>",
    duration: 20000
  };
}

export const SERVER_BASE_URL = {
  toolbox: "http://toolbox.phodal.com/",
  growthAction: "http://growth-in-action.phodal.com/",
  ideabook: "http://ideabook.phodal.com/"
};
