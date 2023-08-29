import { AbstractControl, ValidatorFn } from '@angular/forms';

export function endDateAfterStartDateValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);

      if (endDate <= startDate) {
        return { endDateBeforeStartDate: true };
      }
    }

    return null;
  };
}
