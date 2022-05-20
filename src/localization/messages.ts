import enMessages from './en.json';
import ruMessages from './ru.json';

type Messages = {
  [key: string]: { [key: string]: string };
};

const messages: Messages = {
  en: enMessages,
  ru: ruMessages,
};

export default messages;
