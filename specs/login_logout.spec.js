const constants = require('../configs/constants/constants');
const PageFactory = require('../utils/page_objects/pageFactory');

describe('Test Login - Logout', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  });

  it('Login', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.loginButton.click();
    await PageFactory.getPage('Home').LogInModal.loginForm.waitToDisplay();
    await PageFactory.getPage('Home').LogInModal.enterEmail(constants.LOGIN);
    await PageFactory.getPage('Home').LogInModal.enterPassword(constants.PASSWORD);
    await PageFactory.getPage('Home').LogInModal.clickLogin();
    await PageFactory.getPage('Home').Header.loggedInUserName.waitToDisplay();
    const userName = await PageFactory.getPage('Home').Header.loggedInUserName.getText();
    const { value } = await PageFactory.getPage('Home').getCookie(constants.LOGIN_TOKEN_KEY);
    constants.LOGIN_TOKEN_VALUE = value;
    expect(userName).toEqual(constants.USER_NAME);
  });

  it('Log out', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').addCookie(constants.LOGIN_TOKEN_KEY, constants.LOGIN_TOKEN_VALUE);
    await PageFactory.getPage('Home').addCookie(constants.LOGIN_STATUS_KEY, constants.LOGIN_STATUS_VALUE);
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.userInfoArrow.click();
    await PageFactory.getPage('Home').Header.userInfoDropMenu.waitToDisplay();
    await PageFactory.getPage('Home').Header.userInfoDropElements.clickElementByText(constants.LOGOUT_OPTION_TEXT);
    const isLoggedOut = await PageFactory.getPage('Home').Header.loggedInUserName.waitToNotDisplay();
    expect(isLoggedOut).toBeTruthy();
  })
});
