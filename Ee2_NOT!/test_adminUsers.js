require('chromedriver')
const webdriver = require('selenium-webdriver')
const {By, until} = webdriver

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const driver = new webdriver.Builder().forBrowser('chrome').build()
const expect = chai.expect

describe('Admin Login Test Suite', () => {
  after(() => driver.quit())

  beforeEach(async () => {
    console.log('Before all Tests login to the page')
    await driver.get('http://localhost:8080/login')
    await driver
      .wait(until.elementLocated(By.id('email')))
      .sendKeys('cody@email.com')
    await driver.findElement(By.id('password')).sendKeys('123')
    await driver.findElement(By.id('loginbtn')).submit()
    await driver.wait(until.elementLocated(By.id('title')))
    let currentUrl = await driver.getCurrentUrl()
    try {
      return expect(currentUrl).to.contain('http://localhost:8080/home')
    } catch (err) {
      console.log(err)
    }
  })

  it('can read the welcome message', async () => {
    //verifies: Login functionality, that the Welcome message is user specific
    console.log('Ready to read welcome message')
    try {
      return expect(
        await driver.findElement(By.id('title')).getAttribute('innerHTML')
      ).to.contain('Welcome, cody@email.com ')
    } catch (err) {
      console.log(err)
    }
  })

  it('can add a new item and then find it listed on home page', async () => {
    //verifies: product input fields are present
    console.log('Ready to Add Item')
    await driver.wait(until.elementLocated(By.id('price'))).sendKeys('1000')
    await driver.findElement(By.id('name')).sendKeys('Ashleys Shirts')
    await driver.findElement(By.id('color')).sendKeys('red')
    await driver.findElement(By.id('desc')).sendKeys('A Red Shirt')
    await driver.findElement(By.id('size')).sendKeys('M')
    await driver.findElement(By.id('category')).sendKeys('womens')
    await driver.findElement(By.id('add_item_btn')).submit()

    try {
      return expect(
        await driver
          .findElement(By.partialLinkText('Ashleys'))
          .getAttribute('href')
      )
    } catch (err) {
      console.log(err)
    }
  })
  it('can use the remove button', async () => {
    //verifies: a shirt is being displayed because a price symbol is present
    console.log('Ready to test the remove product button')
    await driver.wait(until.elementLocated(By.id('allProductscont')))
    await driver.findElement(By.id('removeBtn')).click()
    try {
      return expect(
        await driver
          .wait(until.elementLocated(By.id('toast-container')))
          .getAttribute('innerHTML')
      ).to.contain('removed')
    } catch (err) {
      console.log(err)
    }
  })
})
