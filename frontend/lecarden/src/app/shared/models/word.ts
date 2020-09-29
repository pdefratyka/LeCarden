import { Language } from './language';

export interface Word {
  id: number;
  name?: string;
  translation?: string;
  plural?: string;
  category?: string;
  imageUrl?: string;
  audioUrl?: string;
  builtIn?: boolean;
  userId?: boolean;
  languageId?: number;
  languageTO?: Language;
  example: string;
}
