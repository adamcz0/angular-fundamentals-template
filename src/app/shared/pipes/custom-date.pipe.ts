import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: Date | string): string {
        if (typeof value === 'string') {
            value = new Date(value);
        }
        const year = value.getFullYear().toString();
        const month = (value.getMonth() + 1).toString().padStart(2, '0');
        const day = value.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    }
}
