import {PipeTransform, Pipe} from "@angular/core";
import {DomSanitizationService, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: "sanitizeHtml"
})
export class SanitizeHtml implements PipeTransform {

  constructor(private sanitizer:DomSanitizationService) {
  }

  transform(v:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
