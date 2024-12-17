import { en } from "./en";
import { ptBR } from "./pt-BR";

/**
 * The object that contains the actual locales' content strings.
 * Will be imported by i18n and the makeT function.
 */
const locales: Record<string, Record<string, string | object>> = {
  en,
  "pt-BR": ptBR,
};

/**
 * The language that should be used as fallback (i.e. if 'lng' route param is
 *  undefined or unavailable inside AVAILABLE_LANGS array).
 */
const FALLBACK_LANG = "en";

/**
 * The list of available languages for the website.
 * It is used for retrieving languages and for rendering the lanaguage picker component.
 */
export const AVAILABLE_LANGS = [
  {
    locale: "en",
    title: "English",
    flagUrl: "🇺🇸",
  },
  {
    locale: "pt-BR",
    title: "Português",
    flagUrl: "🇧🇷",
  },
];

/**
 * Generates a 't' function that allows retrieving locales' strings inside components.
 */
export const makeT = (lng: string) => (path: string) => {
  const pathList = path.split(".");
  let ref: string | Record<string, string | object> = locales[lng];
  if (!ref) {
    ref = locales[FALLBACK_LANG];
  }
  for (const level of pathList) {
    if (
      typeof ref === "object" &&
      (ref as Record<string, string>)[level] !== undefined
    ) {
      ref = (ref as Record<string, string>)[level];
    } else {
      // Breaks the function and returns the whole path instead
      return path;
    }
  }
  return typeof ref === "string" ? ref : path;
};

/**
 * The ultimate way to retrieve a locale.
 * It tries to retrieve the language that best matches the 'lng' param (id defined).
 * In the worst scenario, returns the fallback language
 */
export const getSafeLng = (lng: string | undefined): string => {
  if (lng !== undefined) {
    const closestLang = AVAILABLE_LANGS.find(({ locale }) => {
      return locale.includes(lng) || lng.includes(locale);
    });
    return closestLang?.locale || FALLBACK_LANG;
  }
  return FALLBACK_LANG;
};
