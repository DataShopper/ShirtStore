const utils = {}

const NEEDS_PADDING = /\.\d$/ // Ends in a decimal and one digit

utils.stringifyPrice = price => {
  const stringPrice = `$${price / 100}`
  return NEEDS_PADDING.test(stringPrice) ? stringPrice + '0' : stringPrice
}

module.exports = utils
