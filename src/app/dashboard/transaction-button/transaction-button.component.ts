import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalRecordsIncomeExpensesComponent } from '../../shared/components/modals/modal-records-income-expenses/modal-records-income-expenses.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ITransactions } from '../../shared/interfaces/transactions';
import { take } from 'rxjs';

@Component({
  selector: 'app-transaction-button',
  imports: [MatButtonModule, DialogModule],
  templateUrl: './transaction-button.component.html',
  styleUrl: './transaction-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionButtonComponent implements OnDestroy {
  @Output() public dataDialog: EventEmitter<ITransactions> = new EventEmitter();

  public dialog = inject(Dialog);

  public openModal(): void {
    const dialogRef = this.dialog.open<ITransactions>(
      ModalRecordsIncomeExpensesComponent
    );

    dialogRef.closed.pipe(take(1)).subscribe((result) => {
      this.dataDialog.emit(result);
    });
  }

  public ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
