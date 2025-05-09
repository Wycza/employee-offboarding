import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { appUrls } from '@app/core/consts/app-urls';

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
