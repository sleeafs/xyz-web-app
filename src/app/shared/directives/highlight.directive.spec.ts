import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const renderer = {} as Renderer2;
    const directive = new HighlightDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
