require('chromedriver')
const webdriver = require('selenium-webdriver')
const {By, until} = webdriver

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const driver = new webdriver.Builder().forBrowser('chrome').build()
const expect = chai.expect

describe('UserAccount Test Suite', () => {
  after(() => driver.quit())

  beforeEach(async () => {
    console.log('Before all Tests go to the login page')
    await driver.get('http://localhost:8080/login')
    await driver
      .wait(until.elementLocated(By.id('email')))
      .sendKeys('murphy@email.com')
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

  it('can access the Account page', async () => {
    //verifies: Account functionality, that the Account page correctly renders
    console.log('Ready to test Account page')
    driver.findElement(By.linkText('YOUR ACCOUNT' || 'Your Account')).click()
    try {
      return expect(
        await driver
          .wait(until.elementLocated(By.id('firstName')))
          .getAttribute('value')
      ).to.equal('Mollly')
    } catch (err) {
      console.log(err)
    }
  })

  /*

  it("can update the logged in user's First Name", async () => {
    //verifies: New user is unique functionailty
    try {
      console.log('Ready to test updating user first name')
      await driver
        .findElement(By.linkText('YOUR ACCOUNT' || 'Your Account'))
        .click()
      await driver
        .wait(until.elementLocated(By.id('firstName')))
        .to.contain('Molly')
      await driver
        .wait(until.elementLocated(By.id('lastName')))
        .to.contain('Seeley')
      await driver
        .wait(until.elementLocated(By.id('email')))
        .to.contain('murphy@email.com')
      await driver
        .wait(until.elementLocated(By.linkText('Save Changes')))
        .click()
      await driver
        .wait(until.elementLocated(By.id('firstName')))
        .sendKeys('Mary')
      return expect(
        driver
          .wait(until.elementLocated(By.id('toast-container')))
          .getAttribute('innerHTML')
          .to.contain('Success: Your Account info has been modified.'),
        driver.navigate().refresh,
        await driver
          .wait(until.elementLocated(By.id('firstName')))
          .to.contain('MaryBob')
      )
    } catch (err) {
      console.log(err)
    }
  })

  it("can update the logged in user's Last Name", async () => {
    //verifies: New user is unique functionailty
    try {
      console.log('Ready to test updating user second name')
      await driver
        .findElement(By.linkText('YOUR ACCOUNT' || 'Your Account'))
        .click()
      await driver
        .wait(until.elementLocated(By.id('firstName')))
        .to.contain('Molly')
      await driver
        .wait(until.elementLocated(By.id('lastName')))
        .to.contain('Seeley')
      await driver
        .wait(until.elementLocated(By.id('email')))
        .to.contain('murphy@email.com')
      await driver
        .wait(until.elementLocated(By.linkText('Save Changes')))
        .click()
      await driver
        .wait(until.elementLocated(By.id('lastName')))
        .sendKeys('Smith')
      return expect(
        driver
          .wait(until.elementLocated(By.id('toast-container')))
          .getAttribute('innerHTML')
          .to.contain('Success: Your Account info has been modified.'),
        driver.navigate().refresh,
        await driver
          .wait(until.elementLocated(By.id('lastName')))
          .to.contain('Smith')
      )
    } catch (err) {
      console.log(err)
    }
  })

  it("can update the logged in user's email", async () => {
    //verifies: New user is unique functionailty
    try {
      console.log('Ready to test updating user email')
      await driver
        .findElement(By.linkText('YOUR ACCOUNT' || 'Your Account'))
        .click()
      await driver
        .wait(until.elementLocated(By.id('firstName')))
        .to.contain('Molly')
      await driver
        .wait(until.elementLocated(By.id('lastName')))
        .to.contain('Seeley')
      await driver
        .wait(until.elementLocated(By.id('email')))
        .to.contain('murphy@email.com')
      await driver
        .wait(until.elementLocated(By.linkText('Save Changes')))
        .click()
      await driver
        .wait(until.elementLocated(By.id('email')))
        .sendKeys('mary@email.com')
      return expect(
        driver
          .wait(until.elementLocated(By.id('toast-container')))
          .getAttribute('innerHTML')
          .to.contain('Success: Your Account info has been modified.'),
        driver.navigate().refresh,
        await driver
          .wait(until.elementLocated(By.id('email')))
          .to.contain('mary@email.com')
      )
    } catch (err) {
      console.log(err)
    }
  })


  it('will issue a prompt if the user tries to enter an email without the @ symbol', async () => {
    //verifies: New user is unique functionailty
    try {
      console.log('Ready to test updating user  with incorrect email')
      await driver
        .findElement(By.linkText('YOUR ACCOUNT' || 'Your Account'))
        .click()
      await driver
        .wait(until.elementLocated(By.id('firstName')))
        .to.contain('Molly')
      await driver
        .wait(until.elementLocated(By.id('lastName')))
        .to.contain('Seeley')
      await driver
        .wait(until.elementLocated(By.id('email')))
        .to.contain('murphy@email.com')
      await driver
        .wait(until.elementLocated(By.linkText('Save Changes')))
        .click()
      await driver
        .wait(until.elementLocated(By.id('email')))
        .sendKeys('maryemail.com')
      return expect(
        driver
          .wait(until.elementLocated(By.id('email')))
          .getAttribute('requireded')
      )
    } catch (err) {
      console.log(err)
    }
  })
*/
  /*
  xit('returns a Wrong username and/or password message', async () => {
    //verifies: Wrong username and/or password is handled
    console.log('Ready to test Unique user')
    await driver.wait(until.elementLocated(By.linkText('LOGOUT'))).click()
    await driver
      .wait(until.elementLocated(By.linkText('LOGIN' || 'Login')))
      .click()
    await driver
      .wait(until.elementLocated(By.id('email')))
      .sendKeys('test@email.com')
    await driver.findElement(By.id('password')).sendKeys('1234') //wrong password
    await driver.findElement(By.id('loginbtn')).submit()
    try {
      return expect(
        driver
          .wait(until.elementLocated(By.id('errorMessage')))
          .getAttribute('innerHTML')
      ).to.contain('Wrong username and/or password')
    } catch (err) {
      console.log(err)
    }
  })

  xit('can read the welcome message', async () => {
    //verifies: Login functionality, that the Welcome message is user specific
    console.log('Ready to read welcome message')
    try {
      return expect(
        await driver.findElement(By.id('title')).getAttribute('innerHTML')
      ).to.contain('Welcome, murphy@email.com ')
    } catch (err) {
      console.log(err)
    }
  })

  xit('can read the new Nav links', async () => {
    //verifies: new Nav links are present
    console.log('Ready to verify post-logon Nav Links')
    try {
      return expect(
        await driver.findElement(By.linkText('PAST ORDERS')),
        await driver.findElement(By.linkText('YOUR ACCOUNT')),
        await driver.findElement(By.linkText('SHOPPING CART'))
      )
    } catch (err) {
      console.log(err)
    }
  })
  xit('can find a product(s)on the home page', async () => {
    //verifies: a shirt is being displayed because a price symbol is present
    console.log('Ready to find a $')
    await driver.wait(until.elementLocated(By.id('allProductscont')))
    try {
      return expect(
        await driver
          .findElement(By.id('allProductscont'))
          .getAttribute('innerHTML')
      ).to.contain('$')
    } catch (err) {
      console.log(err)
    }
  })
  */
})
