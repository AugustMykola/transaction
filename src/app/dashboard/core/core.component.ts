import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject, OnInit,
  signal,
} from '@angular/core';
import { ITransactions } from '../../shared/interfaces/transactions';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { BalanceComponent } from '../balance/balance.component';
import { FiltersComponent } from '../filters/filters.component';
import { TransactionService } from '../../shared/services/transaction-storage.service';

@Component({
  selector: 'app-core',
  imports: [
    BalanceComponent,
    TransactionButtonComponent,
    TransactionListComponent,
    FiltersComponent,
  ],
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent implements OnInit {
  private transactionService = inject(TransactionService);

  public transactions = signal<ITransactions[]>([]);
  public filters = signal<Map<string, string>>(new Map([['category', 'All'], ['type', 'All']]));

  public filteredTransactions = computed(() => this.applyFilters());
  public totalMoney = computed(() =>
    this.filteredTransactions().reduce(
      (acc, { amount, type }) => acc + (type === 'Income' ? amount : -amount),
      0
    )
  );

  constructor() {
    effect(() => {
      this.transactionService.saveTransactions(this.transactions());
      this.transactionService.saveFilters(this.filters());
    });
  }

  ngOnInit(): void {
    this.loadState();
  }

  private loadState(): void {
    this.transactions.set(this.transactionService.getTransactions());
    this.filters.set(this.transactionService.getFilters());
  }

  private applyFilters(): ITransactions[] {
    const currentFilters = this.filters();
    return this.transactions().filter((transaction) => {
      for (const [key, value] of currentFilters) {
        if (value !== 'All' && transaction[key as keyof ITransactions] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  public addTransaction(newTransaction: ITransactions): void {
    if (!newTransaction) return;
    this.transactions.set([newTransaction, ...this.transactions()]);
  }

  public updateFilters(newFilters: Map<string, string>): void {
    this.filters.set(newFilters);
  }
}
