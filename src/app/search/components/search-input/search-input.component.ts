import {
  AfterViewInit,
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  pluck,
} from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: [ './search-input.component.css' ],
})
export class SearchInputComponent implements AfterViewInit {
  // view #input html tag
  @ViewChild('input') inputElement: ElementRef;

  // eventemitter for search
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  ngAfterViewInit(): void {
    // search rules
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        // take atlest three keys before searching for track
        filter((value: string) => value.length > 3),
        map((value) => value)
      )
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
