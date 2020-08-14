import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements OnInit {
  @Input() items: Item[];
  query: string;

  constructor(private apiCall: ApiCallService) {}

  ngOnInit(): void {}

  onSearchChange($event: Event): void {
    const searchBar = $event.target as HTMLInputElement;
    this.query = searchBar.value;
  }

  onFetchClick(): void {
    this.apiCall.fetchItem().subscribe((data) => {
      this.items = data;
    });
  }

  onSelectAllClicked(): void {
    this.items.forEach((item) => (item.isSelected = true));
  }
}
