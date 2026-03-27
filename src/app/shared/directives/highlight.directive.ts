import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

// CODE SMELL: Unused directive - exists but not applied anywhere
// QUESTION FOR CANDIDATE: What could this be used for?

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.appHighlight
    );
  }
}
