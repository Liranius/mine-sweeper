import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Pipe({
  name: 'safeScript'
})
export class SafeScriptPipe implements PipeTransform {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  transform(style: string): SafeScript {
    return this.domSanitizer.bypassSecurityTrustScript(style);
  }
}
