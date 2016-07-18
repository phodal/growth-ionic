import {Component} from "@angular/core";
import * as _ from "lodash";
import {HELPER_ARTICLES} from "../../../data/HELPER_ARTICLES";
import {DOMAIN} from "../../../data/DOMAIN_NAME";

@Component({
  templateUrl: "build/pages/more/recommend-articles/index.html"
})
export class RecommendArticles {
  private helpArticles;
  constructor() {
    this.helpArticles = _.transform(HELPER_ARTICLES["zh-cn"], function(result, value, key) {
      result.push({domain: key, value: value});
      return true;
    }, []);
  }

  getDomainName (domain) {
    return DOMAIN[domain];
  }
}
