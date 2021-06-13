import { by, element, ElementFinder } from 'protractor';

export class AuthenticationSelector {
  getLoginForm(): ElementFinder {
    return element(by.css('.frame-container'));
  }

  getLoginInput(): ElementFinder {
    return element(by.id('inputLogin'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.id('passwordInput'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.css('.btn-success'));
  }

  getAlertDanger(): ElementFinder {
    return element(by.css('.alert-danger'));
  }
}
