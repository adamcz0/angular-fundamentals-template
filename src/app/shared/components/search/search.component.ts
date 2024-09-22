import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  onSearch(): void {
    this.search.emit(this.searchText);
    this.searchText = ''
  }
}