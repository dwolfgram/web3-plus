import basex from 'base-x'

export const convertRippleAddress = (address) => {
  return basex('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz').encode(
    basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').decode(address)
  )
}

export const convertRipplePrivate = (privateKey) => {
  return basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').decode(privateKey).toString('hex').slice(2,66)
} 