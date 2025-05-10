import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '@app/core/models/equipment.model';

@Pipe({
  name: 'equipment',
})
export class EquipmentPipe implements PipeTransform {
  transform(value: Equipment[] | undefined): string {
    if (!value) {
      return '';
    }

    return value.map(({ name }) => name).join(', ');
  }
}
