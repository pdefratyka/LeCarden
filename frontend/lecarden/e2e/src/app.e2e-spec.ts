import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getLoginForm()).toBeDefined();
  });

  it('should insert correct data', () => {
    page.navigateTo();
    page.getLoginInput().sendKeys('correctLogin');
    page.getPasswordInput().sendKeys('correctPassword');
    page.getSubmitButton().click();
    expect(
      browser
        .wait(protractor.ExpectedConditions.urlContains('add-word'), 5000)
        .catch(() => {
          return false;
        })
    ).toBeTruthy(`Url match could not succced`);
  });

  it('should insert wrong data', () => {
    page.navigateTo();
    page.getLoginInput().sendKeys('wrongLogin');
    page.getPasswordInput().sendKeys('wrongPassword');
    page.getSubmitButton().click();
    expect(
      browser
        .wait(protractor.ExpectedConditions.urlContains('login'), 5000)
        .catch(() => {
          return false;
        })
    ).toBeTruthy(`Url match could not succced`);
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getLoginForm()).toBeDefined();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    /*expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );*/
  });
});
