import { i18n } from '@lingui/core';
import { en, vi } from 'make-plural/plurals';
// import { setupI18n } from '@lingui/core';
// import viCatalog from "@lingui/loader!../locales/vi/messages.po";
// import enCatalog from "@lingui/loader!../locales/en/messages.po";

export const locales = {
  en: "English",
  vi: "Viet nam",
};
export const defaultLocale = "vi";

i18n.loadLocaleData({
  en: { plurals: en },
  vi: { plurals: vi },
})

/**
* We do a dynamic import of just the catalog that we need
* @param locale any locale string
*/
export async function dynamicActivate(locale) {
  const { messages } = await import(`@lingui/loader!../locales/${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
  return true;
};

// export const i18n_Instance = setupI18n({
//   language: 'vi',
//   catalogs: {
//     en: enCatalog,
//     vi: viCatalog, 
//   },
// });