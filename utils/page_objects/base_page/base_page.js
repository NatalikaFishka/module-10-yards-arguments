const Header = require('./header');
const Footer = require('./footer');
const LogInModal = require('./login_modal');
const EC = protractor.ExpectedConditions;
const logger = require('../../../configs/logger.config');

class BasePage {
  constructor() {
    this.Header = new Header();
    this.Footer = new Footer();
    this.LogInModal = new LogInModal();
  };

  async open(url) {
    await browser.get(url);
    logger.debug(`Go to URL "${url}"`);
  };

  async getCurrenUrl() {
    const currentUrl = await browser.getCurrentUrl();
    logger.debug(`Current URL is "${currentUrl}"`);
    return currentUrl;
  };

  async getTitle() {
    const pageTitle = await browser.getTitle();
    logger.debug(`Page title is "${pageTitle}"`);
    return pageTitle;
  };

  sleep(waitInMilliseconds) {
    logger.debug(`Sleeping for "${waitInMilliseconds}" ms`);
    return browser.sleep(waitInMilliseconds);
  };

  goBack() {
    logger.debug(`Navigate back in browser`);
    return browser.navigate().back();
  };

  waitForUrl(url) {
    logger.debug(`Waitong for url: "${url}"`);
    return browser.wait(EC.urlIs(url), 5000);
  };

  async scrollToElement(element) {
    const { y } = await element.getLocation();
    await browser.executeScript('window.scrollTo(0,arguments[0]);', y);
    logger.debug(`Scroll to see desired element`);
    return;
  };

  setSessionStorage(key, value) {
    return browser.executeScript(`window.sessionStorage.setItem('${key}', ${value});`);
  };

  addCookie(key, value) {
    return browser.manage().addCookie({ name: key, value: value });
  };

  getCookie(key) {
    return browser.manage().getCookie(key);
  };
};

module.exports = BasePage;