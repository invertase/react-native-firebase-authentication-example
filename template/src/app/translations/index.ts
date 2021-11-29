import {english} from './en';
import {spanish} from './es';

export interface translation {
  [key: string]: string;
}

export interface translationMap {
  [key: string]: translation;
}

export const translations: translationMap = {en: english, es: spanish};
