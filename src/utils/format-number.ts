
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { LocaleType, localesSettings } from 'src/i18n/config-locale';

// Remove this line:
// import { useCurrentLocale } from './locale-utils';

type InputValue = string | number | null | undefined;

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputValue) {
  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputValue) {
  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function useCurrency() {
  const locale = useLocale() as LocaleType;
  const { currency } = localesSettings[locale];

  const formater = (inputValue: InputValue, currencyCode = true) => {
    const number = Number(inputValue);

    const fm = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return currencyCode ? `${fm} ${currency}` : fm;
  };

  return formater;
}

// ----------------------------------------------------------------------

export async function getCurrency() {
  const locale = (await getLocale()) as LocaleType;
  const { currency } = localesSettings[locale];

  const formater = (inputValue: InputValue, currencyCode = true) => {
    if (!inputValue) return '';

    const number = Number(inputValue);

    const fm = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return currencyCode ? `${fm} ${currency}` : fm;
  };

  return formater;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputValue) {
  if (!inputValue) return '';

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputValue) {
  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue) {
  if (!inputValue) return '';

  if (inputValue === 0) return '0 Bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}