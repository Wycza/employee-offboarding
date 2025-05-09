import { ChangeDetectionStrategy, Component } from '@angular/core';
import { appUrls } from '../../../../core/consts/app-urls';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface SidenavItem {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, MatButtonModule, RouterLinkActive],
})
export class SidenavListComponent {
  protected readonly sidenavItems: SidenavItem[] = [
    {
      icon: 'home',
      title: 'Dashboard',
      url: appUrls.dashboard,
    },
    {
      icon: 'laptop_mac',
      title: 'Offboarding',
      url: appUrls.offboarding,
    },
  ];
}
