import {Platform} from '@angular/cdk/platform';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {MAT_DATE_LOCALE, MatDateFormats, NativeDateAdapter} from '@angular/material/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const DATE_TIME_PICKER_DISPLAY_FORMAT_TOKEN = new InjectionToken<string>('custom-time-format', {
  providedIn: 'root',
  factory: () => DATE_TIME_PICKER_DISPLAY_FORMAT,
});

export const DATE_TIME_PICKER_CONVERT_FORMAT_TOKEN = new InjectionToken<string>('custom-time-convert-format', {
  providedIn: 'root',
  factory: () => DATE_TIME_PICKER_DISPLAY_FORMAT,
});

export function convertToDate(value: string, valueFormat: string): Date {
  return dayjs(value, valueFormat).toDate();
}

export function formatDate(date: Date, format: string): string {
  return dayjs(date).format(format);
}

export const DATE_TIME_PICKER_DISPLAY_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const CUSTOM_DATE_TIME_FORMATS: MatDateFormats = {
  parse: {
    dateInput: DATE_TIME_PICKER_DISPLAY_FORMAT,
  },
  display: {
    dateInput: DATE_TIME_PICKER_DISPLAY_FORMAT,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: DATE_TIME_PICKER_DISPLAY_FORMAT,
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Injectable({providedIn: 'root'})
export class CustomDateTimeAdapter extends NativeDateAdapter {
  constructor(
    @Inject(DATE_TIME_PICKER_DISPLAY_FORMAT_TOKEN) public displayDateFormat: string,
    @Inject(MAT_DATE_LOCALE) matLocale: string,
    platform: Platform,
  ) {
    super(matLocale, platform);
  }

  public override format(date: Date, displayFormat: any): string {
    if (!date || isNaN(date.getTime())) {
      console.warn('Invalid date passed to format method:', date);
      return '';
    }
    if (typeof displayFormat === 'string') {
      return formatDate(date, displayFormat);
    }
    if (!displayFormat.day && (displayFormat.month === 'short' || displayFormat.month === 'long') && displayFormat.year === 'numeric') {
      const monthNames = this.getMonthNames(displayFormat.month);
      const monthName = monthNames[date.getMonth()];
      return `${monthName} ${date.getFullYear()}`;
    }

    console.log(date);

    return super.format(date, displayFormat);
  }

  public override parse(value: string): Date | null {
    if (value) {
      return convertToDate(value, this.displayDateFormat);
    }
    return null;
  }
}
