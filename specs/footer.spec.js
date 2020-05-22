const constants = require('../configs/constants/constants');
const PageFactory = require('../utils/page_objects/pageFactory');

describe('Test footer links navigation', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  });

  it('Go to Privacy Policy', async () => {
    await PageFactory.getPage('Home').open();
    const privacyPolicyElement = await PageFactory.getPage('Home').Footer.navigationButtons.getElementByText(constants.PRIVACY_PILICY_LINK_TEXT_RU);
    await PageFactory.getPage('Home').scrollToElement(privacyPolicyElement);
    await PageFactory.getPage('Home').Footer.navigationButtons.clickElementByText(constants.PRIVACY_PILICY_LINK_TEXT_RU);
    let isUrlMatch = await PageFactory.getPage('Home').waitForUrl(constants.PRIVACY_PILICY_LINK);
    expect(isUrlMatch).toBeTruthy();
  });

});
