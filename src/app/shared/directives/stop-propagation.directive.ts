import { Directive } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
  host: {
    '(click)': '$event.stopPropagation()',
  },
})
export class StopPropagationDirective {}
