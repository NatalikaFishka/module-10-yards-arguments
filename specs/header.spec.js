const constants = require('../configs/constants/constants');
const PageFactory = require('../utils/page_objects/pageFactory');

describe('Test header links navigation', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  });

  it('Go to training.by and verify correct page title', async () => {
    await PageFactory.getPage('Home').open();
    const pageTitle = await PageFactory.getPage('Home').getTitle();
    expect(pageTitle).toEqual(constants.EXPECTED_HOME_PAGE_TITLE);
  });

  it('Go to training.by and confirm that default page language is Russian', async () => {
    await PageFactory.getPage('Home').open();
    const currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.RUSSIAN_HOME_PAGE_URL);
  });

  it('Go to training.by and switch to English language', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.languageButton.click();
    await PageFactory.getPage('Home').Header.languageSelectionPanel.clickElementByText(constants.ENGLISH_LANGUAGE_OPTION);
    let isUrlMatch = await PageFactory.getPage('Home').waitForUrl(constants.ENGLISH_HOME_PAGE_URL);
    expect(isUrlMatch).toBeTruthy();
  });

  it('Go to training list and navigate back', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.navigationButtons.clickElementByText(constants.TRAINING_LIST_LINK_TEXT_RU);
    let currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.TRAINING_LIST_LINK_RU);
    await PageFactory.getPage('Home').goBack();
    currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.DEFAULT_TARGET_URL);
  });

});
