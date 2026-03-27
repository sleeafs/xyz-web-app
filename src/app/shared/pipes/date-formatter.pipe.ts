import { Pipe, PipeTransform } from '@angular/core';

// CODE SMELL: This pipe exists but is not being used
// VIOLATION: DRY - Date formatting is duplicated in components instead of using this pipe
// QUESTION FOR CANDIDATE: Why is date formatting repeated in components when this pipe exists?

@Pipe({
  name: 'dateFormatter',
  pure: true
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: Date | string, format: 'short' | 'long' = 'short'): string {
    const date = new Date(value);

    if (format === 'short') {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  }
}
