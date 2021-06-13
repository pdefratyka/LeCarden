import { browser, logging } from 'protractor';
import { WordTestHelper } from '../helpers/word-test.helper';
import { WordSelector } from '../selectors/word.selector';
import { AuthenticationTestHelper } from '../../authentication/helpers/authentication-test.helper';
import { properties } from '../../../properties/properties';

describe('add-word panel', () => {
  let wordSelector: WordSelector;
  let wordTestHelper: WordTestHelper;
  let authenticationHelper: AuthenticationTestHelper;

  beforeEach(() => {
    wordSelector = new WordSelector();
    wordTestHelper = new WordTestHelper();
    authenticationHelper = new AuthenticationTestHelper();
    authenticationHelper.login();
  });

  it('should display add word form', () => {
    expect(wordSelector.getAddWordForm().isPresent()).toBeTruthy();
  });

  it('should all elements in add from be present', () => {
    expect(wordSelector.getWordInput().isPresent()).toBeTruthy();
    expect(wordSelector.getPluralInput().isPresent()).toBeTruthy();
    expect(wordSelector.getMeaningInput().isPresent()).toBeTruthy();
    expect(wordSelector.getCategoryInput().isPresent()).toBeTruthy();
    expect(wordSelector.getLanguageInput().isPresent()).toBeTruthy();
    expect(wordSelector.getImageInput().isPresent()).toBeTruthy();
    expect(wordSelector.getAudioInput().isPresent()).toBeTruthy();
    expect(wordSelector.getExampleInput().isPresent()).toBeTruthy();
    expect(wordSelector.getClearButton().isPresent()).toBeTruthy();
    expect(wordSelector.getSubmitButton().isPresent()).toBeTruthy();
  });

  it('should word input be valid after input data', () => {
    wordSelector.getWordInput().sendKeys('Word');
    expect(wordSelector.getWordInput().getAttribute('class')).toContain(
      properties.validationClasses.valid
    );
  });

  it('should word input be invalid after clicking it', () => {
    wordSelector.getWordInput().click();
    wordSelector.getPluralInput().click();
    expect(wordSelector.getWordInput().getAttribute('class')).toContain(
      properties.validationClasses.invalid
    );
    expect(wordSelector.getWordInput().getAttribute('class')).toContain(
      properties.validationClasses.touched
    );
  });

  it('should plural input be valid all the time', () => {
    wordSelector.getPluralInput().click();
    wordSelector.getWordInput().click();
    expect(wordSelector.getPluralInput().getAttribute('class')).toContain(
      properties.validationClasses.valid
    );
  });

  it('should display danger alert after submiting without filling required fields', () => {
    expect(wordSelector.getDangerAlert().isPresent()).toBeFalsy();
    wordSelector.getSubmitButton().click();
    expect(wordSelector.getDangerAlert().isPresent()).toBeTruthy();
  });

  it('should clear inputs after clicking clear button', () => {
    wordSelector.getWordInput().sendKeys('word');
    wordSelector.getClearButton().click();
    expect(wordSelector.getPluralInput().getAttribute('class')).toContain(
      properties.validationClasses.untouched
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
