import { Equipment } from '@app/core/models/equipment.model';
import { EquipmentPipe } from './equipment-pipe';

describe(EquipmentPipe.name, () => {
  let pipe: EquipmentPipe;

  beforeEach(() => {
    pipe = new EquipmentPipe();
  });

  it('should return empty string when value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return empty string when value is an empty array', () => {
    expect(pipe.transform([])).toBe('');
  });

  it('should return a comma-separated list of equipment names', () => {
    // Arrange
    const equipmentList: Equipment[] = [
      { id: '1', name: 'MacBook Pro' },
      { id: '2', name: 'Xiaomi Mi 3' },
      { id: '3', name: 'Dell 200XP' },
    ];
    const expectedResult = 'MacBook Pro, Xiaomi Mi 3, Dell 200XP';

    // Act
    const result = pipe.transform(equipmentList);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should handle a single equipment item correctly', () => {
    // Arrange
    const equipmentList: Equipment[] = [{ id: '1', name: 'MacBook Pro' }];
    const expectedResult = 'MacBook Pro';

    // Act
    const result = pipe.transform(equipmentList);

    // Assert
    expect(result).toBe(expectedResult);
  });
});
