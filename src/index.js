import config from './config'
import { convertRippleAddress, convertRipplePrivate } from './utils/ripple-utils'
import bip39 from 'bip39'
import bip32 from 'bip32'
import bitcoin from 'bitcoinjs-lib'
import ethUtil from 'ethereumjs-util'
import Nebulas from 'nebulas'
import bchaddr from 'bchaddrjs'

const COINS = config.coins

export const hasStrongRandom = () => {
  return 'crypto' in window && window['crypto'] !== null
}

export const validateMnemonic = (mnemonic, wordlist) => {
  return bip39.validateMnemonic(mnemonic, wordlist)
}

export const getAllAvailableMnemonicLanguages = () => {
  return Object.keys(bip39.wordlists)
}

export const getAllCoins = () => {
  return COINS
}

export const generateMnemonic = (strength, rng, language) => {
  if (!hasStrongRandom()) {
    return { error: 'This browser does not support strong randomness' }
  }
  const wordlist = bip39.wordlists[language]
  const mnemonic = bip39.generateMnemonic(strength, rng, wordlist)
  const isValid = validateMnemonic(mnemonic, wordlist)
  if (!isValid) {
    return { error: 'invalid mnemonic generated' }
  }
  return mnemonic
}

export const mnemonicToSeed = (mnemonic) => {
  return bip39.mnemonicToSeed(mnemonic)
}

export const calcBip32RootKeyFromSeed = (mnemonic, network) => {
  const seed = mnemonicToSeed(mnemonic)
  const root = bip32.fromSeed(seed, network)
  return root
}

export const getAddress = (node, segwitAvailable, network) => {
  if (segwitAvailable) {
    const wif = node.toWIF()
    const keyPair = bitcoin.ECPair.fromWIF(wif)
    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })
    })
    return address
  } else {
    const keyPair = bitcoin.ECPair.makeRandom({ network })
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })
    return address
  }
}

export const getWalletAccount = (node, coin) => {
  let privateKey
  let publicKey
  let address

  privateKey = node.privateKey
  publicKey = node.publicKey
  address = getAddress(node, coin.segwitAvailable, coin.network)

  // Ethereum values are different
  if (coin.name == 'ETH - Ethereum' || 
  coin.name == 'ETC - Ethereum Classic' || 
  coin.name == 'PIRL - Pirl' || 
  coin.name == 'MIX - MIX' || 
  coin.name == 'MUSIC - Musicoin' || 
  coin.name == 'POA - Poa' ||
  coin.name == 'EXP - Expanse' || 
  coin.name == 'CLO - Callisto' || 
  coin.name == 'DXN - DEXON' || 
  coin.name == 'ELLA - Ellaism' || 
  coin.name == 'ESN - Ethersocial Network') {
    publicKey = ethUtil.privateToPublic(privateKey)
    const addr = ethUtil.publicToAddress(publicKey).toString('hex')
    const checksumAddress = ethUtil.toChecksumAddress(addr)
    // add hex prefixes
    address = ethUtil.addHexPrefix(checksumAddress)
    privateKey = ethUtil.addHexPrefix(privateKey)
    publicKey = ethUtil.addHexPrefix(publicKey)
  }
  if (coin.name == 'NAS - Nebulas') {
    const nebulasAccount = Nebulas.Account
    const account = nebulasAccount.NewAccount()
    account.setPrivateKey(privateKey)
    address = account.getAddressString()
    privateKey = account.getPrivateKeyString()
    publicKey = account.getPublicKeyString()
  }
  if (coin.name == 'XRP - Ripple') {
    privateKey = convertRipplePrivate(privateKey)
    address = convertRippleAddress(address)
  }
  if (coin.name == 'BCH - Bitcoin Cash') {
    address = bchaddr.toCashAddress(address)
  }
  return ({ address, publicKey, privateKey })
}

export const createWalletsForAllCoins = (mnemonic, i = 0) => {
  for (const coin in COINS) {
    const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
    const node = root.derivePath(`m/44'/${coin.type}'/0'/0/${i}`)
    const account = getWalletAccount(node, coin)
    return account
  }
}

export const createIndividualWallet = (mnemonic, coin, i) => {
  const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
  const node = root.derivePath(`m/44'/${coin.type}'/0'/0/${i}`)
  const account = getWalletAccount(node, coin)
  return account
}