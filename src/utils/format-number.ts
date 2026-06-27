// // ----------------------------------------------------------------------

// import { useLocale } from 'next-intl';
// import { getLocale } from 'next-intl/server';
// import { LocaleType, localesSettings } from 'src/i18n/config-locale';

// import { useCurrentLocale } from './locale-utils';

// /*
//  * Locales code
//  * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
//  */

// type InputValue = string | number | null;

// function getLocaleCode() {
//   const {
//     numberFormat: { code, currency },
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//   } = useCurrentLocale();

//   return {
//     code: code ?? 'en-US',
//     currency: currency ?? 'USD',
//   };
// }

// // ----------------------------------------------------------------------

// export function fNumber(inputValue: InputValue) {
//   const { code } = getLocaleCode();

//   if (!inputValue) return '';

//   const number = Number(inputValue);

//   const fm = new Intl.NumberFormat(code, {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(number);

//   return fm;
// }

// // ----------------------------------------------------------------------

// export function fCurrency(inputValue: InputValue) {
//   const { code, currency } = getLocaleCode();

//   if (!inputValue) return '';

//   const number = Number(inputValue);

//   const fm = new Intl.NumberFormat(code, {
//     style: 'currency',
//     currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(number);

//   return fm;
// }

// // ----------------------------------------------------------------------

// export function useCurrency() {
//   const locale = useLocale() as LocaleType;
//   const { currency } = localesSettings[locale];

//   const formater = (inputValue: InputValue, currencyCode = true) => {
//     // if (!inputValue) return '';

//     const number = Number(inputValue);

//     const fm = new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(number);

//     return currencyCode ? `${fm} ${currency}` : fm;
//   };

//   return formater;
// }

// // ----------------------------------------------------------------------

// export async function getCurrency() {
//   const locale = (await getLocale()) as LocaleType;
//   const { currency } = localesSettings[locale];

//   const formater = (inputValue: InputValue, currencyCode = true) => {
//     if (!inputValue) return '';

//     const number = Number(inputValue);

//     const fm = new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(number);

//     return currencyCode ? `${fm} ${currency}` : fm;
//   };

//   return formater;
// }

// // ----------------------------------------------------------------------

// export function fPercent(inputValue: InputValue) {
//   const { code } = getLocaleCode();

//   if (!inputValue) return '';

//   const number = Number(inputValue) / 100;

//   const fm = new Intl.NumberFormat(code, {
//     style: 'percent',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 1,
//   }).format(number);

//   return fm;
// }

// // ----------------------------------------------------------------------

// export function fShortenNumber(inputValue: InputValue) {
//   const { code } = getLocaleCode();

//   if (!inputValue) return '';

//   const number = Number(inputValue);

//   const fm = new Intl.NumberFormat(code, {
//     notation: 'compact',
//     maximumFractionDigits: 2,
//   }).format(number);

//   return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
// }

// // ----------------------------------------------------------------------

// export function fData(inputValue: InputValue) {
//   if (!inputValue) return '';

//   if (inputValue === 0) return '0 Bytes';

//   const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

//   const decimal = 2;

//   const baseValue = 1024;

//   const number = Number(inputValue);

//   const index = Math.floor(Math.log(number) / Math.log(baseValue));

//   const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

//   return fm;
// }
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function isBetween(inputDate: Date | string | number, startDate: Date, endDate: Date) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}

export function useFormat() {
  const t = useTranslations();

  const formatDate = (date: InputValue, newFormat?: string) => {
    const fm = newFormat || 'dd MMM yyyy';

    return date
      ? format(new Date(date), fm).replace(
          /January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g,
          (matched) => t(`Global.Date.${matched.toLocaleLowerCase().slice(0, 3)}`)
        )
      : '';
  };

  const formatTime = (date: InputValue, newFormat?: string) => {
    const fm = newFormat || 'p';

    return date
      ? format(new Date(date), fm).replace(/AM|PM/g, (matched) =>
          t(`Global.Date.${matched.toLocaleLowerCase()}`)
        )
      : '';
  };

  return { formatDate, formatTime };
}

export async function getFormat() {
  const t = await getTranslations();

  const formatDate = (date: InputValue, newFormat?: string) => {
    const fm = newFormat || 'dd MMM yyyy';

    return date
      ? format(new Date(date), fm).replace(
          /January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g,
          (matched) => t(`Global.Date.${matched.toLocaleLowerCase().slice(0, 3)}`)
        )
      : '';
  };

  const formatTime = (date: InputValue, newFormat?: string) => {
    const fm = newFormat || 'p';

    return date
      ? format(new Date(date), fm).replace(/AM|PM/g, (matched) =>
          t(`Global.Date.${matched.toLocaleLowerCase()}`)
        )
      : '';
  };

  return { formatDate, formatTime };
}