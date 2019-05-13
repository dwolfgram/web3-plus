const config = require('./config')
const rippleUtils = require('./utils/ripple-utils')
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const ethUtil = require('ethereumjs-util')
const Nebulas = require('nebulas')
const bchaddr = require('bchaddrjs')

const COINS = config.coins

const validateMnemonic = (mnemonic, wordlist) => {
  return bip39.validateMnemonic(mnemonic, wordlist)
}

const getAllAvailableMnemonicLanguages = () => {
  return Object.keys(bip39.wordlists)
}

const getAllCoins = () => {
  return COINS
}

const generateMnemonic = (strength, rng, language) => {
  const wordlist = bip39.wordlists[language]
  const mnemonic = bip39.generateMnemonic(strength, rng, wordlist)
  const isValid = validateMnemonic(mnemonic, wordlist)
  if (!isValid) {
    return { error: 'invalid mnemonic generated' }
  }
  return mnemonic
}

const mnemonicToSeed = (mnemonic) => {
  return bip39.mnemonicToSeedSync(mnemonic)
}

const calcBip32RootKeyFromSeed = (mnemonic, network) => {
  const seed = mnemonicToSeed(mnemonic)
  const root = bip32.fromSeed(seed, network)
  return root
}

const getAddress = (node, segwitAvailable, network) => {
  if (segwitAvailable) {
    const wif = node.toWIF()
    const keyPair = bitcoin.ECPair.fromWIF(wif, network)
    let { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    })
    if (network === COINS.ltc.network) {
      const decoded = bitcoin.address.fromBase58Check(address)
      address = bitcoin.address.toBase58Check(decoded['hash'], 50)
    }
    return address
  } else {
    const keyPair = bitcoin.ECPair.makeRandom({ network })
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })
    return address
  }
}

const getWalletAccount = (node, coin) => {
  let privateKey
  let publicKey
  let address
  const wif = node.toWIF()

  privateKey = node.privateKey
  publicKey = node.publicKey
  // console.log('privateKey1', privateKey)
  // console.log('publicKey1', publicKey)
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
    console.log('privateKey2', privateKey)
    console.log('publicKey2', publicKey)
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
    privateKey = rippleUtils.convertRipplePrivate(wif)
    address = rippleUtils.convertRippleAddress(address)
  }
  if (coin.name == 'BCH - Bitcoin Cash') {
    address = bchaddr.toCashAddress(address)
  }
  return ({ address, publicKey: publicKey.toString('hex'), privateKey: privateKey.toString('hex') })
}

const createWalletsForAllCoins = (mnemonic, i = 0) => {
  for (const coin in COINS) {
    const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
    const node = root.derivePath(`m/44'/${coin.type}'/0'/0/${i}`)
    const account = getWalletAccount(node, coin)
    return account
  }
}

const createIndividualWallet = (mnemonic, coin, i = 0) => {
  const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
  const node = root.derivePath(`m/44'/${coin.type}'/0'/0/${i}`)
  const account = getWalletAccount(node, coin)
  return account
}

const sendTransaction = (mnemonic, coin, index, receiveAddress, amount, options) => {
  const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
  const node = root.derivePath(`m/44'/${coin.type}'/0'/0/${index}`)
  coin.api.transaction(node, coin, receiveAddress, amount, options, (err, tx) => {
    if (!err) {
      console.log(tx)
    } else {
      console.log(err)
    }
  })
}

const getTransactionHistory = (coin, address) => {
  coin.api.getTxHistory(address, (err, history) => {
    if (!err) {
      console.log(history)
    } else {
      console.log(err)
    }
  })
}

const getBalance = (address, coin, options) => {
  coin.api.getBalance(address, options, (err, balance) => {
    if (!err) {
      console.log(balance)
    } else {
      console.log(err)
    }
  })
}

const getAllBalances = (address, coin, assets) => {
  if (coin.name == 'ETH - Ethereum') {
    coin.api.getAllBalances(address, assets, (err, balance) => {
      if (!err) {
        console.log(balance)
      } else {
        console.log(err)
      }
    })
  } else {
    return ({ error: 'function only available for ETH/ERC20 Tokens' })
  }
}

const estimateTxFee = (mnemonic, coin, options, index) => {
  let node
  if (mnemonic) {
    const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
    node = root.derivePath(`m/44'/${coin.type}'/0'/0/${index}`)
  }
  coin.api.getFee(node, coin.network, options, (err, fee) => {
    if (!err) {
      console.log(fee)
    } else {
      console.log(err)
    }
  })
}

module.exports = {
  validateMnemonic,
  getAllAvailableMnemonicLanguages,
  getAllCoins,
  generateMnemonic,
  mnemonicToSeed,
  calcBip32RootKeyFromSeed,
  getAddress,
  getWalletAccount,
  createWalletsForAllCoins,
  createIndividualWallet,
  sendTransaction,
  getBalance,
  estimateTxFee,
  getAllBalances,
  getTransactionHistory
}