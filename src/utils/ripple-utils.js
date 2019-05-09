const basex = require('base-x')

const convertRippleAddress = (address) => {
  return basex('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz').encode(
    basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').decode(address)
  )
}

const convertRipplePrivate = (privateKey) => {
  return basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').decode(privateKey).toString('hex').slice(2,66)
} 

module.exports = {
  convertRippleAddress,
  convertRipplePrivate
}