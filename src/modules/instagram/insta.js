'use strict'

const puppeteer = require('puppeteer')
const util = require('util')

const pause = util.promisify((a, f) => setTimeout(f, a))

class Insta {
  constructor(creds) {
    this.baseUrl = 'https://instagram.com'
    this.browser = null
    this.page = null
    this.creds = creds

    //state
    this.intialised = false
    this.loggedIn = false

    this.tagCache = {}
  }

  randDelay(num = 500) {
    return num * Math.random()
  }

  tagUrl(tag) {
    return `${this.baseUrl}/explore/tags/${tag}/`;
  }

  delay(ms = 1000) {
    return new Promise
  }
  async init() {
    if (this.intialised) {
      return
    }
    this.browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    this.page = await this.browser.newPage()
    this.intialised = true
  }

  async login() {
    if (this.loggedIn) {
      return
    }
    if (!this.intialised) {
      await this.init()
    }
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle0' })
    let loginButton = await this.page.$x('//a[contains(text(), "Log in")]')
    await loginButton[0].click()

    await this.page.waitForNavigation({ waitUntil: 'networkidle0'})
    await this.page.waitFor(this.randDelay(2000))
    await this.page.type('input[name="username"]', this.creds.username, { delay: this.randDelay(100) })
    await this.page.type('input[name="password"]', this.creds.password, { delay: this.randDelay(100) })
    loginButton = await this.page.$x('//div[contains(text(), "Log In")]')
    await loginButton[0].click()

    await this.page.waitFor(this.randDelay(2000))
    await this.page.waitFor('a > span[aria-label="Profile"]')

    this.loggedIn = true
  }

  async getGrams(tags) {
    if (!this.loggedIn) {
      await this.login()
    }
    while (this.gettingGrams) {
      await pause(1000)
    }
    this.gettingGrams = true

    const batch = []
    for(const tag of tags) {
      if (this.tagCache[tag]) {
        batch.push(this.tagCache[tag])
        continue;
      }
      await this.page.goto(this.tagUrl(tag), { waitUntil: 'networkidle0' })
      await this.page.waitFor(this.randDelay(1000))
      const grams = await this.page.$$('article > div:nth-child(1) img[decoding=auto]')

      const images = []
      for (const el of grams) {
        const handle = await el.getProperty('src')
        const value = await handle.jsonValue()
        images.push({
          url: value,
        })
      }

      this.tagCache[tag] = images;
      batch.push(images)
    }

    this.gettingGrams = false
    return batch
  }
}

module.exports = Insta