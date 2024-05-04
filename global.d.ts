import { WebApp } from './src/twa/twa';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
    TelegramWebviewProxy?: any;
  }
}
