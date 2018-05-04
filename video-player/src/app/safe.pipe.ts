import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitezer: DomSanitizer){}

  transform(url: any): any {
    return this.sanitezer.bypassSecurityTrustResourceUrl(url.replace("watch?v=", "embed/"));
  }

}
