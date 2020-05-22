const constants = require('../configs/constants/constants');
const PageFactory = require('../utils/page_objects/pageFactory');

describe('Test trainings card section', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  });

  it(`Filter trainings by "${constants.FILTER_BY_CITY}" city location`, async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Trainings.waitForTrainings();
    const trainingSection = await PageFactory.getPage('Home').Trainings.trainingSection.getElement()
    await PageFactory.getPage('Home').scrollToElement(trainingSection);

    const filterToggle = await PageFactory.getPage('Home').Trainings.filterToggle.getElement();
    await filterToggle.click();
    await PageFactory.getPage('Home').Trainings.filterSelectionPanel.waitToDisplay();

    await PageFactory.getPage('Home').Trainings.filterCitiesOnPanel.clickElementByText(constants.FILTER_BY_CITY);
    await filterToggle.click();
    await PageFactory.getPage('Home').Trainings.filterSelectionPanel.waitToNotDisplay();

    const citiesOnCards = await PageFactory.getPage('Home').Trainings.trainingCardsLocations.getTexts();
    expect(citiesOnCards.every((curr) => curr.startsWith(constants.FILTER_BY_CITY))).toBeTruthy();
  });

  it('Clear out filter', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').setSessionStorage(constants.FILTER_CITY_KEY, constants.FILTER_BY_CITY_CODE);
    await PageFactory.getPage('Home').Trainings.waitForTrainings();
    const filteredTrainingsCard = await PageFactory.getPage('Home').Trainings.trainingCards.getCount();
    await PageFactory.getPage('Home').Trainings.clearAllFilterButton.click();
    const trainingsCardsAll = await PageFactory.getPage('Home').Trainings.trainingCards.getCount();
    expect(() => trainingsCardsAll > filteredTrainingsCard).toBeTruthy();
  });

});
