# web3-plus

The goal of web3-plus is to provide an open source foundation for devs to access when building cryptocurrency resources. I hope it helps someone save some time and can help the crypto space develop.

I am a bit tired of seeing closed source cryptocurrency wallet applications. The best part of crypto is the sharing of knowledge and I hope we can keep that going. Shout out to [Ian Coleman](https://github.com/iancoleman/bip39) and [Faa.st](https://github.com/goFaast) for providing a lot of the base for this project.

Contributions are very welcome! The next step is to just continue integrating payment libraries for coins.

# How to use

install web3-plus
```bash
npm install --save github:dwolfgram/web3-plus
```

Require web3-plus
```js
const web3plus = require('web3-plus')
```

Get all mnemonic languages
```js
const languages = web3plus.getAllAvailableMnemonicLanguages()
```

Create new BIP39 mneomonic
```js
// params: (strength, rng, language), can leave all undefined
// defaults to english and 12 words

const mnemonic = await web3plus.generateMnemonic(strength, rng, language)
```

Get all coins supported
```js
const coins = web3plus.getAllCoins()
```

Create individual wallet
```js
// ticker can either be coin ticker (should match up to coins retreived above) or whole object

const wallet = await web3plus.createIndividualWallet(mnemonic, ticker, index)

// => const { address, privateKey, publicKey, symbol, index } = wallet
```

send transaction
```js
// some coins use feePerByte as an option : { feePerByte: 55 } used to calc fees
// however if undefined an api will be used to provide up-to-date feePerByte values
// index is index of wallet in BIP44 derivation

// web3 if sending erc20 token this option is mandatory
// options = { asset: { contractAddress, decimals }}

// web3 you can optionally provide functions in options to catch events of sending transaction
// options =  { onTxHash, onReceipt, onConfirmation, onError}

// IMPORTANT: ticker should always be 'ETH' if sending an ERC20 token
const txObj = await web3plus.sendTransaction(mnemonic, ticker, index, receiveAddress, amount, options)
```

get transaction history
```js
const txns = await web3plus.getTransactionHistory(coin, address) 
```

get balance (or multiple if web3)
```js
// web3 options:
// options =  { assets = [{ symbol: 'BAT', contractAddress: '0xasd..', decimals: 18 }] }
// if you only want ETH balance no need to provide options

// if want some tokens and ETH dont provide contract address for ETH object:
// options = { assets = [{ ...BAT OBJ }, { symbol: 'ETH', decimals: 18 }] }

// IMPORTANT: ticker should always be 'ETH' if sending an ERC20 token
const balance = await web3plus.getBalance(address, coin, options)

// non web3 =>  const { balance, unconfirmedBalance?  }
// web3 => { bat: 20332030, eth: 1020 }
```

estimate tx fee
```js
// options:
// utxo based (optional just like creating tx): options = { feePerByte: xyz } 
// or web3: options = { contractAddress: abc }, 
// you should provide this as token transactions have higher fees

// IMPORTANT: ticker should always be 'ETH' if sending an ERC20 token
const txfee = await web3plus.estimateTxFee(mnemonic, coin, index, options)
```

# Implemented payment libraries:

[Bitcoin Payments](https://github.com/dwolfgram/bitcoin-segwit-payments)

[Litecoin Payments](https://github.com/dwolfgram/litecoin-segwit-payments)

[Bitcoin cash Payments](https://github.com/dwolfgram/bitcoin-cash-payments)

[Web3 Payments](https://github.com/dwolfgram/web3-payments)
