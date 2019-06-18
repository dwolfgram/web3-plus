const config = require('./config')
const rippleUtils = require('../utils/ripple-utils')
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const ethUtil = require('ethereumjs-util')
const bchaddr = require('bchaddrjs')

const COINS = config.coins

const validateMnemonic = (mnemonic, wordlist) => {
  return bip39.validateMnemonic(mnemonic, wordlist)
}

const getAllAvailableMnemonicLanguages = () => {
  return Object.keys(bip39.wordlists)
}

const getAllCoins = () => {
  const coins = Object.keys(COINS).map(sym => {
    return ({ ...COINS[sym], symbol: sym })
  })
  return coins
}

const getCoinByTicker = (ticker) => {
  const coins = getAllCoins()
  const coin = coins.find(coin => coin.symbol.toLowerCase() === ticker.toLowerCase())
  return coin
}

const generateMnemonic = (strength, rng, language) => {
  return new Promise((resolve, reject) => {
    const wordlist = bip39.wordlists[language]
    const mnemonic = bip39.generateMnemonic(strength, rng, wordlist)
    const isValid = validateMnemonic(mnemonic, wordlist)
    if (!isValid) {
      return reject('invalid mnemonic generated')
    }
    return resolve(mnemonic)
  })
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
  const wif = node.toWIF()
  if (segwitAvailable) {
    const keyPair = bitcoin.ECPair.fromWIF(wif, network)
    let { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network })
    })
    if (network === COINS.ltc.network) {
      const decoded = bitcoin.address.fromBase58Check(address)
      address = bitcoin.address.toBase58Check(decoded['hash'], 50)
    }
    return address
  } else {
    const keyPair = bitcoin.ECPair.fromWIF(wif, network)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })
    return address
  }
}

const getWalletAccount = (node, coin, index) => {
  return new Promise((resolve, reject) => {
    let privateKey
    let publicKey
    let address
    const wif = node.toWIF()
    privateKey = node.privateKey
    publicKey = node.publicKey
    address = getAddress(node, coin.segwitAvailable, coin.network, coin.symbol)
    if (!address) return reject('error creating address')
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
    // if (coin.name == 'NAS - Nebulas') {
    //   const nebulasAccount = Nebulas.Account
    //   const account = nebulasAccount.NewAccount()
    //   account.setPrivateKey(privateKey)
    //   address = account.getAddressString()
    //   privateKey = account.getPrivateKeyString()
    //   publicKey = account.getPublicKeyString()
    // }
    if (coin.name == 'XRP - Ripple') {
      privateKey = rippleUtils.convertRipplePrivate(wif)
      address = rippleUtils.convertRippleAddress(address)
    }
    if (coin.name == 'BCH - Bitcoin Cash') {
      address = bchaddr.toCashAddress(address)
    }
    return resolve({ address, publicKey: publicKey.toString('hex'), privateKey: privateKey.toString('hex'), index })
  })
}

const createWalletsForAllCoins = async (mnemonic, i = 0) => {
  const coins = getAllCoins()
  try {
    const wallets = await Promise.all(coins.map(async coin => {
      const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
      const purpose = coin.purpose ? coin.purpose : 44
      const node = root.derivePath(`m/${purpose}'/${coin.type}'/0'/0/${i}`)
      const account = await getWalletAccount(node, coin, i)
      return ({ ...account, symbol: coin.symbol })
    }))
    return wallets
  } catch (err) {
    throw new Error('error creating wallets for all coins', err)
  }
}

const getExtendedPublicKey = (mnemonic, coin) => {
  if (typeof coin === 'string') coin = getCoinByTicker(coin)
  const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
  const purpose = coin.purpose ? coin.purpose : 44
  const xpub = root.derivePath(`m/${purpose}'/${coin.type}'/0'`).neutered().toBase58()
  return xpub
}

const createIndividualWallet = (mnemonic, coin, i = 0) => {
  return new Promise(async (resolve, reject) => {
    if (!mnemonic) return reject('you first need to create mnemonic')
    if (!coin) return reject('you need to provide a coin object or ticker')
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
    const purpose = coin.purpose ? coin.purpose : 44
    const node = root.derivePath(`m/${purpose}'/${coin.type}'/0'/0/${i}`)
    const account = await getWalletAccount(node, coin, i)
    return resolve({ ...account, symbol: coin.symbol })
  })
}

const sendTransaction = (mnemonic, coin, index, receiveAddress, amount, options) => {
  return new Promise((resolve, reject) => {
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
    const purpose = coin.purpose ? coin.purpose : 44
    const node = root.derivePath(`m/${purpose}'/${coin.type}'/0'/0/${index}`)
    coin.api().transaction(node, coin, receiveAddress, amount, options, (err, tx) => {
      if (!err) {
        return resolve(tx)
      } else {
        return reject(err)
      }
    })
  })
}

const getTransactionHistory = (address, coin) => {
  return new Promise((resolve, reject) => {
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    coin.api().getTxHistory(address, (err, history) => {
      if (!err) {
        return resolve(history)
      } else {
        return reject(err)
      }
    })
  })
}

const getBalance = (address, coin, options) => {
  return new Promise((resolve, reject) => {
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    coin.api().getBalance(address, options, (err, res) => {
      if (!err) {
        if (typeof res.balance !== 'undefined') {
          return resolve({ ...res, symbol: coin.symbol })
        }
        return resolve(res)
      } else {
        return reject(err)
      }
    })
  })
}

const discoverAccount = (mnemonic, coin) => {
  return new Promise((resolve, reject) => {
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    const xpub = getExtendedPublicKey(mnemonic, coin)
    coin.api().discoverAccount(xpub, coin.network, (err, account) => {
      if (!err) {
        resolve(account)
      } else {
        reject(err)
      }
    })
  })
}

const estimateTxFee = (mnemonic, coin, index, options) => {
  return new Promise((resolve, reject) => {
    if (typeof coin === 'string') coin = getCoinByTicker(coin)
    let node
    if (mnemonic) {
      const root = calcBip32RootKeyFromSeed(mnemonic, coin.network)
      const purpose = coin.purpose ? coin.purpose : 44
      node = root.derivePath(`m/${purpose}'/${coin.type}'/0'/0/${index}`)
    }
    coin.api().getFee(node, coin.network, options, (err, fee) => {
      if (!err) {
        return resolve(fee)
      } else {
        return reject(err)
      }
    })
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
  getTransactionHistory,
  discoverAccount,
  getExtendedPublicKey
}