const logger = require('../../../configs/logger.config');

class Element {
  constructor(selector) {
    this.selector = selector;
    this.element = element(by.css(selector));
  }
  getElement() {
    logger.debug(`Get element by passed selector "${this.selector}"`);
    return this.element;
  };

  async click() {
    await this.element.click();
    logger.debug(`Element with selector "${this.selector}" clicked`);
  };

  async getText() {
    const elementText = await this.element.getText();
    logger.debug(`Element's text is "${elementText}"`);
    return elementText;
  };

  async isDisplayed() {
    const isElementDisplayed = await this.element.isDisplayed();
    logger.debug(`Element displayed: "${isElementDisplayed}"`);
    return isElementDisplayed;
  };

  async sendKeys(key) {
    await this.element.sendKeys(key);
    logger.debug(`Send kyes: "${key}"`);
  };

  async waitToDisplay() {
    await browser.wait(async () => await this.element.isPresent(), 5000);
    const isDisplayed = await browser.wait(async () => await this.element.isDisplayed(), 5000);
    logger.debug(`Wait for element to display. Is it displayed: "${isDisplayed}"`);
    return isDisplayed;
  };

  waitToNotDisplay() {
    logger.debug(`Wait for element to not be displayed`);
    return browser.wait(async () => !(await this.element.isPresent()) || !(await this.element.isDisplayed()), 5000);
  }
};

module.exports = Element;