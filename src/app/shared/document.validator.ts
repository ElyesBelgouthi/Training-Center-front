import { ValidatorFn } from '@angular/forms';

export const documentValidator: ValidatorFn = (
  control: any
): { [message: string]: boolean } | null => {
  const file = control.value?.name;
  const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
  if (file) {
    const fileExt = file.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      return { invalidFileType: true };
    }
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      return { sizeExceeded: true };
    }
  }
  return null;
};
