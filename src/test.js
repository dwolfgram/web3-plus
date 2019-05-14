const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const sendTransaction = require('./index').sendTransaction
const getBalance = require('./index').getBalance
const getTransactionHistory = require('./index').getTransactionHistory
const estimateTxFee = require('./index').estimateTxFee
const coins = require('./config/coins')

const createWallet = () => {
  //const mnemonic = generateMnemonic()
  //console.log(mnemonic)
  const account = createIndividualWallet(undefined, coins.bch, 0)
  console.log(account)
}

const sendTx = () => {
  sendTransaction(undefined, coins.bch, 0, '', 0.00759512)
}

const checkBalance = () => {
  getBalance('', coins.bch)
}

const checkAllBalances = () => {
  getBalance('', coins.eth, { assets: [{ symbol: 'BAT', decimals: 18, contractAddress: '' }] })
}

const getFee = () => {
  estimateTxFee(undefined, coins.bch, 0, undefined)
}

const getTxHistory = () => {
  getTransactionHistory(coins.eth, '')
}

//sendTx()