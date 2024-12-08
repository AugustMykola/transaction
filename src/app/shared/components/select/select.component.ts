import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() public values: string[] = [];
  @Input() public currentValue: string = '';
  @Output() public selectedValueChanged: EventEmitter<string> =
    new EventEmitter();

  public selectedValue: string = '';

  public ngOnChanges({ currentValue }: SimpleChanges): void {
    if (currentValue && currentValue.currentValue !== undefined) {
      this.selectedValue = currentValue.currentValue;
    }
  }
  public sendData(): void {
    this.selectedValueChanged.emit(this.selectedValue);
  }
}
