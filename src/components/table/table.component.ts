import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GlobalStateService } from '../../services/state.service';
import { UserBalance } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor(private api: ApiService, private globalState: GlobalStateService) { }

  data: UserBalance[] = [];
  sortOrder: string = '';
  sortIcon: string = '';

  isLoading: boolean = false;

  private tableState: Subscription | undefined;

  ngOnInit() {
    this.tableState = this.globalState.state.subscribe(
      (state: { sortedOrder: any; userData: any; }) => {
        this.sortOrder = state.sortedOrder;
        this.data = state.userData;
        this.handleSortIcon()
      }
    );
  }

  ngOnDestroy() {
    if (this.tableState) {
      this.tableState.unsubscribe();
    }
  }

  resetTable() {
    this.isLoading = true;
    this.data = [];
    this.sortIcon = ''
    this.globalState.resetState()
  }

  loadData() {
    this.resetTable()
    this.api.getTableData()
      .subscribe(res => {
        this.data = res;
        this.isLoading = false;
        this.globalState.setState({ userData: this.data })
      })
  }

  onClickBalance() {
    if (this.sortOrder === 'asc' || this.sortOrder === '') {
      this.sortDescending()
      this.sortOrder = 'des'
      this.handleSortIcon()
      this.globalState.setState({ userData: this.data, sortedOrder: this.sortOrder })
    }
    else {
      this.sortAscending()
      this.sortOrder = 'asc'
      this.handleSortIcon()
      this.globalState.setState({ userData: this.data, sortedOrder: this.sortOrder })
    }
  }

  handleSortIcon() {
    if (this.sortOrder === 'asc') this.sortIcon = 'fa-solid fa-sort-up'
    else if (this.sortOrder === 'des') this.sortIcon = 'fa-solid fa-sort-down'
    else if (this.sortIcon === '') this.sortIcon = 'fa-solid fa-sort'
  }

  sortAscending() {
    this.data?.sort((a, b) => {
      const nameA = a.balance
      const nameB = b.balance
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
  }

  sortDescending() {
    this.data?.sort((a, b) => {
      const nameA = a.balance
      const nameB = b.balance
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    })
  }
}
