import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { categories, TYPES } from '../../shared/constants';
import { SelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-filters',
  imports: [SelectComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnChanges {
  public categories: string[] = ['All', ...categories];
  public types: string[] = ['All', TYPES.INCOME, TYPES.EXPENSE];

  @Input() public filters: Map<string, string> = new Map([['category', 'All'], ['type', 'All']]);
  @Output() public filterChanged = new EventEmitter<Map<string, string>>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && changes['filters'].currentValue) {
      const filters = changes['filters'].currentValue as Map<string, string>;
      this.filters = new Map(filters);
    }
  }

  public updateFilter(value: string, filterKey: string): void {
    this.filters.set(filterKey, value);
    this.filterChanged.emit(new Map(this.filters));
  }
}
