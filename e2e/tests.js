require('chromedriver')
const webdriver = require('selenium-webdriver')
const {By, until} = webdriver

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const driver = new webdriver.Builder().forBrowser('chrome').build()
const expect = chai.expect

describe('End to End Test Suite', () => {
  beforeEach(async () => {
    console.log('Before everything login to the page')
    driver.get('http://localhost:8080')
    await driver.findElement(By.linkText('Login')).click()
    await driver
      .wait(until.elementLocated(By.id('email')))
      .sendKeys('cody@email.com')
    await driver.findElement(By.id('password')).sendKeys('123')
    await driver.findElement(By.id('loginbtn')).submit()
    await driver.wait(until.elementLocated(By.id('title')))
  })
  it('can read the welcome message', () => {
    console.log('Ready to read welcome message')
    return expect(
      driver.findElement(By.id('title')).getAttribute('innerHTML')
    ).to.eventually.contain('Welcome, cody@email.com')
  })
  it('as an admin account, it can add a test t-shirt')
  return expect(
    driver.findElement(By.linkText('WackyShirt')).getAttribute('innerHTML')
  ).to.eventually.contain('Welcome, cody@email.com')
})
