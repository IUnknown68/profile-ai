import { createI18n } from 'vue-i18n';

import de from './de';
import en from './en';

const FALLBACK_LOCALE = 'en';

const messages = {
  de,
  en,
};

let i18n = null;

export const LANG_TO_ISO = {
  German: 'de',
  English: 'en',
};

export const ISO_TO_LANG = {
  de: 'German',
  en: 'English',
};

//------------------------------------------------------------------------------
function getLocale(availableLocales) {
  const localesToTry = [];
  if (availableLocales.includes(navigator.language)) {
    localesToTry.push(navigator.language);
  }
  localesToTry.push(...navigator.languages);
  return localesToTry.find((locale) => availableLocales.includes(locale)) || FALLBACK_LOCALE;
}

//------------------------------------------------------------------------------
export async function create() {
  i18n = createI18n({
    legacy: false,
    locale: getLocale(Object.keys(messages)),
    fallbackLocale: FALLBACK_LOCALE,
    messages,
  });

  return i18n;
}

//------------------------------------------------------------------------------
function getI18n() {
  return i18n;
}

export default getI18n;
