import {PipeTransform, Pipe} from "@angular/core";
import {SafeHtml, DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: "sanitizeHtml"
})
export class SanitizeHtml implements PipeTransform {

  constructor(private sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
