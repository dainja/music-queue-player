import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';



@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: [ './search-input.component.css' ]
})
export class SearchInputComponent implements AfterViewInit {

  @ViewChild('input') inputElement: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: string) => value.length > 3),
        map((value) => value)
      )
      .subscribe(value => {
        this.search.emit(value)


      })
  }

}
