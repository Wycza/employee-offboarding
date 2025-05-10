import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly duration = 5000;

  openSnackbar(message: string, duration: number = this.duration): void {
    this.snackBar.open(message, '', { duration });
  }
}
