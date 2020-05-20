const logger = require('../../../configs/logger.config');

class Collection {
  constructor(selector) {
    this.collection = element.all(by.css(selector));
  };
  async getCount() {
    const collectionCount = await this.collection.count();
    if (collectionCount > 0) logger.debug(`Counted ${collectionCount} element(s)`);
    return collectionCount;
  };

  async getTexts() {
    const collectionTexts = await this.collection.getText();
    logger.debug(`Texts are: ${collectionTexts}`);
    return collectionTexts;
  };

  async clickElementByText(textToClick) {
    const arrayOfElementTexts = await this.collection.getText();
    const elementToClickIndex = arrayOfElementTexts.indexOf(textToClick);
    if (elementToClickIndex === -1) {
      logger.debug(`No element with [${textToClick}] text found!`);
      throw new Error(`No element with [${textToClick}] text found!`);
    }
    await this.collection.get(elementToClickIndex).click();
    logger.debug(`Element with "${textToClick}" text clicked`);
  };

  async getElementByText(innerText) {
    const arrayOfElementTexts = await this.collection.getText();
    const elementIndex = arrayOfElementTexts.indexOf(innerText);
    if (elementIndex === -1) {
      throw new Error(`No element with [${innerText}] text found!`);
    }
    const elementByText = await this.collection.get(elementIndex);
    logger.debug(`Element by text "${innerText}" found`);
    return elementByText;
  };
};

module.exports = Collection;