import {Directive, OnInit, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective implements OnInit {

  @Output()
  ngInit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    setTimeout(() => this.ngInit.emit(), 100);
  }
}
