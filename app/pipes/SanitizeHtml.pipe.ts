import {PipeTransform, Pipe} from "@angular/core";
import {DomSanitizationService, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtml implements PipeTransform {

  constructor(private _sanitizer:DomSanitizationService) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
