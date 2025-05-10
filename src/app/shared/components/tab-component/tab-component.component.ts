import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { StopPropagationDirective } from '@app/shared/directives/stop-propagation.directive';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrl: './tab-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, MatInputModule, MatIconModule, StopPropagationDirective],
})
export class TabComponentComponent implements AfterViewInit {
  readonly tabs = contentChildren<MatTab>(MatTab);
  readonly matTabGroup = viewChild.required(MatTabGroup);
  readonly searchInputTab = viewChild<MatTab>('searchInputTab');
  readonly searchInput = input(false);
  readonly searchValueChange = output<string>();

  ngAfterViewInit(): void {
    const matTabs = this.tabs().map(tab => tab);

    if (this.searchInput() && this.searchInputTab()) {
      matTabs.push(this.searchInputTab()!);
    }

    this.matTabGroup()._allTabs.reset([...matTabs]);
    this.matTabGroup().ngAfterContentInit();
  }
}
