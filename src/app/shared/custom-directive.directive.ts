import { Directive ,ElementRef} from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color="red";
   }

}
