import { DateFormatterPipe } from './date-formatter.pipe';

describe('DateFormatterPipe', () => {
  let pipe: DateFormatterPipe;

  beforeEach(() => {
    pipe = new DateFormatterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date in short format', () => {
    const date = new Date('2026-03-27');
    const result = pipe.transform(date, 'short');
    expect(result).toContain('2026');
  });

  it('should format date in long format', () => {
    const date = new Date('2026-03-27');
    const result = pipe.transform(date, 'long');
    expect(result).toContain('March');
  });

  // NOTE: This pipe is not being used in the application
  // Components are duplicating this logic instead
});
