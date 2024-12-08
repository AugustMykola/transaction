import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITransactions } from '../../shared/interfaces/transactions';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CurrencyPipe, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements AfterViewInit, OnChanges {
  @Input() public transactions: ITransactions[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['name', 'amount', 'category', 'date'];
  public dataSource = new MatTableDataSource<ITransactions>();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && changes['transactions'].currentValue) {
      this.dataSource.data = this.transactions;
    }
  }
}
