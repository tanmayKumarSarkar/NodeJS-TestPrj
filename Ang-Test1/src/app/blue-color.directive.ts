import { Directive } from '@angular/core';
import {ElementRef, HostListener} from '@angular/core';
@Directive({
  selector: '[blueColor]'
})
export class BlueColorDirective {

  constructor(element: ElementRef) {
  	element.nativeElement.style.color = "blue";
  }

/*  @HostListener('click') doSomething(){
  	alert("i'm clicked");
  	//(mouseenter/ mouseleave/mousemove)
  }*/

  @HostListener('document: click', ['$event'])
  	elmClicked(elm){
  		console.log('clicked', elm);
  	}
}
