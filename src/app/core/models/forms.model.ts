import { FormControl } from '@angular/forms';

export type FormsModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
