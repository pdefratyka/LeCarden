import { browser } from 'protractor';

export class WordTestHelper {
  navigateToAddWordPage(): Promise<any> {
    return browser.get(browser.baseUrl + 'add-word') as Promise<any>;
  }
}
