import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl + 'login') as Promise<any>;
  }

  getTitleText() {
    return element(
      by.css('app-root .content span')
    ).getText() as Promise<string>;
  }

  getLoginForm() {
    return element(by.css('.frame-container'));
  }

  getLoginInput() {
    return element(by.id('inputLogin'));
  }

  getPasswordInput() {
    return element(by.id('passwordInput'));
  }

  getSubmitButton() {
    return element(by.css('.btn-success'));
  }

  getAlertDanger() {
    return element(by.css('.alert-danger'));
  }
}
