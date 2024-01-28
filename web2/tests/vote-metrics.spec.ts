import { test, expect } from '@playwright/test';

test.describe('Vote Metrics -- Chart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/1/results');
  });

  test('graph tooltip appears on hover', async ({ page }) => {
    await expect(page.locator('#chart')).toBeVisible();
    await page.hover('#chart');

    const isTooltipVisible = await page.isVisible('.arrow_box');
    expect(isTooltipVisible).toBeTruthy();

    const tooltipContainsFor = await page.textContent('.arrow_box').then((text) => text?.toLowerCase().includes('for'));
    expect(tooltipContainsFor).toBeTruthy();

    const tooltipContainsAgainst = await page
      .textContent('.arrow_box')
      .then((text) => text?.toLowerCase().includes('against'));
    expect(tooltipContainsAgainst).toBeTruthy();
  });

  test('page should contain the text "Voting Distribution"', async ({ page }) => {
    const isVotingDistributionTextPresent = await page.isVisible('text=Voting Distribution');
    expect(isVotingDistributionTextPresent).toBeTruthy();

    const descriptionContainsForAgainst = await page
      .textContent('.card-description')
      .then((text) => text?.includes('FOR / AGAINST'));
    expect(descriptionContainsForAgainst).toBeTruthy();
  });
});

test.describe('Vote Metrics -- Total Votes Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/3/results');
  });

  test('total votes should be visible', async ({ page }) => {
    const isTotalVotesPresent = await page.isVisible('text=Total Votes');
    expect(isTotalVotesPresent).toBeTruthy();
  });

  test('total votes should be a number', async ({ page }) => {
    const totalVotes = await page.textContent('.total-votes');
    expect(totalVotes).toMatch(/\d+/);
  });

  test('total votes should be greater than 0', async ({ page }) => {
    const totalVotes = await page.textContent('.votes-number');
    expect(parseInt(totalVotes!)).toBeGreaterThan(0);
  });

  test('total votes should be less than 1000000000', async ({ page }) => {
    const totalVotes = await page.textContent('.votes-number');
    expect(parseInt(totalVotes!)).toBeLessThan(100000000000);
  });
});

test.describe('Vote Metrics -- Total Stake', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/4/results');
  });

  test('total stake text and uncertainty should be visible', async ({ page }) => {
    const isForTotalStakePresent = await page.isVisible('text=Total Stake Participated');
    const isUncertaintyPresent = await page.isVisible('text=0.005');
    expect(isForTotalStakePresent).toBeTruthy();
    expect(isUncertaintyPresent).toBeTruthy();
  });

  test('for total stake should be a number', async ({ page }) => {
    const totalStake = await page.textContent('.total-stake');
    expect(totalStake).toMatch(/\d+/);
  });
});

test.describe('Vote Metrics -- Voting Results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/1/results');
  });

  test('voting on results page should have ended', async ({ page }) => {
    const isVotingResultsPresent = await page.isVisible('text=Voting has ended');
    expect(isVotingResultsPresent).toBeTruthy();
  });

  test('FOR and AGAINST percentages should add up to 100%', async ({ page }) => {
    const positivePercentageText = await page.textContent('.card-content p:nth-of-type(1)');
    const negativePercentageText = await page.textContent('.card-content p:nth-of-type(2)');

    // Extract the numeric values
    const positivePercentage = parseFloat(positivePercentageText.match(/(\d+(\.\d+)?)%/)[1]);
    const negativePercentage = parseFloat(negativePercentageText.match(/(\d+(\.\d+)?)%/)[1]);

    expect(positivePercentage + negativePercentage).toBeCloseTo(100);
  });
});

test.describe('Vote Metrics -- Voting Instructions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/3');
  });

  test('instruction text and buttons should be present', async ({ page }) => {
    const isInstructionTitlePresent = await page.isVisible('text=How do I cast my vote?');
    expect(isInstructionTitlePresent).toBeTruthy();
    const isInstructionDescPresent = await page.isVisible('text=I want to vote...');
    expect(isInstructionDescPresent).toBeTruthy();
  });

  test('For and Against buttons should be clickable', async ({ page }) => {
    const forButton = page.locator('#open-dialog-button-For');
    await expect(forButton).toBeVisible();
    await expect(forButton).toBeEnabled();

    const againstButton = page.locator('#open-dialog-button-Against');
    await expect(againstButton).toBeVisible();
    await expect(againstButton).toBeEnabled();

    await forButton.click();
    const dialog = page.locator('dialog[data-dialogId=For]');
    const isOpen = await dialog.evaluate((node) => node.hasAttribute('open'));
    expect(isOpen).toBeTruthy();
  });
});

test.describe('Vote Metrics -- Voting Period', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/4');
  });

  test('Voting Period card should display correct information', async ({ page }) => {
    const isPeriodTitlePresent = await page.isVisible('text=Voting Period');
    expect(isPeriodTitlePresent).toBeTruthy();

    const startDate = await page.textContent('.date-vals p:nth-of-type(1)');
    expect(startDate).toMatch(/\d{4}-\d{2}-\d{2} \| \d{2}:\d{2} (AM|PM) UTC/);

    const endDate = await page.textContent('.date-vals p:nth-of-type(2)');
    expect(endDate).toMatch(/\d{4}-\d{2}-\d{2} \| \d{2}:\d{2} (AM|PM) UTC/);
  });
});
