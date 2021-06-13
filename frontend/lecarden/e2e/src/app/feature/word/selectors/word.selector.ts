import { by, element, ElementFinder } from 'protractor';

export class WordSelector {
  getAddWordForm(): ElementFinder {
    return element(by.tagName('app-add-word-form'));
  }

  getWordInput(): ElementFinder {
    return element(by.id('german-word-input'));
  }

  getPluralInput(): ElementFinder {
    return element(by.id('plural-input'));
  }

  getMeaningInput(): ElementFinder {
    return element(by.id('meaning-input'));
  }

  getCategoryInput(): ElementFinder {
    return element(by.id('category-input'));
  }

  getLanguageInput(): ElementFinder {
    return element(by.id('language'));
  }

  getImageInput(): ElementFinder {
    return element(by.id('imageUrl-input'));
  }

  getAudioInput(): ElementFinder {
    return element(by.id('audioUrl-input'));
  }

  getExampleInput(): ElementFinder {
    return element(by.id('example-input'));
  }

  getClearButton(): ElementFinder {
    return element(by.id('cancel-button'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.id('submit-button'));
  }

  getDangerAlert(): ElementFinder {
    return element(by.css('.alert-danger'));
  }
}
