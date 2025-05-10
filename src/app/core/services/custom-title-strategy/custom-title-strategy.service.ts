import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const titleValue = this.buildTitle(routerState);

    if (titleValue) {
      this.title.setTitle(`${titleValue} - Tequipy`);
    } else {
      this.title.setTitle('Tequipy');
    }
  }
}
