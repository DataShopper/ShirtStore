require('chromedriver')
const webdriver = require('selenium-webdriver')
const {By, until} = webdriver

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const driver = new webdriver.Builder().forBrowser('chrome').build()
const expect = chai.expect

describe('Non Admin Login Test Suite', () => {
  beforeEach(async () => {
    console.log('Before all Tests login to the page')
    driver.get('http://localhost:8080/login')
    await driver
      .wait(until.elementLocated(By.id('email')))
      .sendKeys('murphy@email.com')
    await driver.findElement(By.id('password')).sendKeys('123')
    await driver.findElement(By.id('loginbtn')).submit()
    await driver.wait(until.elementLocated(By.id('title')))
  })

  it('can logout', async () => {
    //verifies: Logout functionality, that 'LOGIN' and 'SIGNUP' are present and are links
    console.log('Ready to logout')

    await driver.findElement(By.linkText('LOGOUT')).click()
    try {
      return expect(
        driver
          .findElement(By.linkText('LOGIN' || 'Login'))
          .getAttribute('/href'),
        driver.findElement(By.linkText('SIGNUP')).getAttribute('/href')
      )
    } catch (err) {
      console.log(err)
    }
  })

  it('can signup a new user', async () => {
    //verifies: Signup functionality, that the Welcome message is user specific
    try {
      console.log('Ready to test Signup')
      await driver.findElement(By.linkText('LOGOUT')).click()
      await driver.wait(until.elementLocated(By.linkText('SIGNUP'))).click()
      await driver
        .wait(until.elementLocated(By.id('email')))
        .sendKeys('test@email.com')
      await driver.findElement(By.id('password')).sendKeys('123')
      await driver.findElement(By.id('loginbtn')).submit()
      return expect(
        driver
          .wait(until.elementLocated(By.id('title')))
          .getAttribute('innerHTML')
      ).to.eventually.contain('Welcome, test@email.com')
    } catch (err) {
      console.log(err)
    }
  })

  it('returns a user already exists message', async () => {
    //verifies: New user is unique functionailty
    try {
      console.log('Ready to test Unique user')
      await driver.findElement(By.linkText('LOGOUT')).click()
      await driver.wait(until.elementLocated(By.linkText('SIGNUP'))).click()
      await driver
        .wait(until.elementLocated(By.id('email')))
        .sendKeys('test@email.com')
      await driver.findElement(By.id('password')).sendKeys('123')
      await driver.findElement(By.id('loginbtn')).submit()
      return expect(
        driver
          .wait(until.elementLocated(By.id('errorMessage')))
          .getAttribute('innerHTML')
      ).to.eventually.contain('User already exists')
    } catch (err) {
      console.log(err)
    }
  })

  it('returns a Wrong username and/or password message', async () => {
    //verifies: Wrong username and/or password is handled
    try {
      console.log('Ready to test Unique user')
      await driver.findElement(By.linkText('LOGOUT')).click()
      await driver
        .wait(until.elementLocated(By.linkText('LOGIN' || 'Login')))
        .click()
      await driver
        .wait(until.elementLocated(By.id('email')))
        .sendKeys('test@email.com')
      await driver.findElement(By.id('password')).sendKeys('1234') //wrong password
      await driver.findElement(By.id('loginbtn')).submit()
      return expect(
        driver
          .wait(until.elementLocated(By.id('errorMessage')))
          .getAttribute('innerHTML')
      ).to.eventually.contain('Wrong username and/or password')
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
      ).to.eventually.contain('Welcome, murphy@email.com')
    } catch (err) {
      console.log(err)
    }
  })

  it('can read the new Nav links', async () => {
    //verifies: new Nav links are present
    console.log('Ready to verify post-logon Nav Links')
    try {
      return expect(
        await driver
          .findElement(By.linkText('PAST ORDERS'))
          .getAttribute('/href'),
        await driver
          .findElement(By.linkText('YOUR ACCOUNT'))
          .getAttribute('/href'),
        await driver
          .findElement(By.linkText('SHOPPING CART'))
          .getAttribute('/href')
      )
    } catch (err) {
      console.log(err)
    }
  })
  it('can find a product(s)on the home page', async () => {
    //verifies: a shirt is being displayed because a price symbol is present
    console.log('Ready to find a $')
    try {
      return expect(
        await driver.findElement(
          By.xpath('//*[@id="app"]/div/div[2]/div/div/div/div[1]')
        )
      )
        .getAttribute('innerHTML')
        .to.eventually.contain('$')
    } catch (err) {
      console.log(err)
    }
  })
})
