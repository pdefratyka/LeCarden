import { properties } from '../../../properties/properties';
import { browser } from 'protractor';
import { AuthenticationSelector } from '../selectors/authentication.selector';

export class AuthenticationTestHelper {
  navigateToLoginPage(): Promise<any> {
    return browser.get(browser.baseUrl + 'login') as Promise<any>;
  }

  login(): void {
    const authenticationSelector = new AuthenticationSelector();
    this.navigateToLoginPage();
    authenticationSelector.getLoginInput().sendKeys(properties.login);
    authenticationSelector.getPasswordInput().sendKeys(properties.password);
    authenticationSelector.getSubmitButton().click();
  }
}
