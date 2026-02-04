/**
 * dateUtils.ts
 * A collection of utility functions for handling and comparing dates.
 */

// --- Type Definitions ---
export type DateInput = string | number | Date;

// --- Helper Functions ---
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
/**
 * Converts various inputs into a valid Date object.
 * Returns null if the input is invalid.
 */
function toDateObject(input: DateInput): Date | null {
  const date = new Date(input);
  return isNaN(date.getTime()) ? null : date;
}

// --- Comparison Functions ---
    
export function isDateGreaterOrEqual(d1: DateInput, d2: DateInput): boolean {
  const date1 = toDateObject(d1);
  const date2 = toDateObject(d2);
  return !!date1 && !!date2 && date1.getTime() >= date2.getTime();
}

export function isDateAfter(d1: DateInput, d2: DateInput): boolean {
  const date1 = toDateObject(d1);
  const date2 = toDateObject(d2);
  return !!date1 && !!date2 && date1.getTime() > date2.getTime();
}

export function isDateLessOrEqual(d1: DateInput, d2: DateInput): boolean {
  const date1 = toDateObject(d1);
  const date2 = toDateObject(d2);
  return !!date1 && !!date2 && date1.getTime() <= date2.getTime();
}

export function areDatesEqual(d1: DateInput, d2: DateInput): boolean {
  const date1 = toDateObject(d1);
  const date2 = toDateObject(d2);
  return !!date1 && !!date2 && date1.getTime() === date2.getTime();
}

// --- Difference Utilities ---

/**
 * Returns the signed number of days between two dates (end - start).
 * Can be negative.
 */
export function getDaysDifference(
  start: DateInput,
  end: DateInput
): number {
  const startDate = toDateObject(start);
  const endDate = toDateObject(end);

  if (!startDate || !endDate) {
    return NaN;
  }

  //const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((endDate.getTime() - startDate.getTime()) / MS_PER_DAY);
}

/**
 * Returns the absolute number of days between two dates.
 */
export function getAbsoluteDaysDifference(
  d1: DateInput,
  d2: DateInput
): number {
  const date1 = toDateObject(d1);
  const date2 = toDateObject(d2);

  if (!date1 || !date2) {
    return NaN;
  }

  //const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / MS_PER_DAY);
}
/**
 * Returns the signed time difference in seconds (end - start).
 * Can be negative.
 */
export function getTimeDifferenceInSeconds(
  start: DateInput,
  end: DateInput
): number | null {
  const startDate = toDateObject(start);
  const endDate = toDateObject(end);

  if (!startDate || !endDate) {
    return null;
  }

  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / MS_PER_SECOND
  );
}

// --- Formatting Utilities ---

/**
 * Formats a date to YYYY-MM-DD
 */
export function formatDateToYYYYMMDD(input: DateInput): string | null {
  const date = toDateObject(input);
  return date ? date.toISOString().split('T')[0] : null;
}

/**
 * Formats a date using locale-specific options (e.g., MM/DD/YYYY)
 */
export function formatLocaleDate(
  input: DateInput,
  locale: string = 'en-US'
): string | null {
  const date = toDateObject(input);
  return date
    ? date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : null;
}

// --- Mutation Utilities ---

/**
 * Adds days to a date and returns a new Date object
 */
export function addDays(input: DateInput, days: number): Date | null {
  const date = toDateObject(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// --- State Checks ---

/**
 * Checks if a date is in the past (compared to today, ignoring time)
 */
export function isPastDate(input: DateInput): boolean {
  const date = toDateObject(input);
  if (!date) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
}
