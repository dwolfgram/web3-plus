const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const sendTransaction = require('./index').sendTransaction
const getBalance = require('./index').getBalance
const getTransactionHistory = require('./index').getTransactionHistory
const estimateTxFee = require('./index').estimateTxFee
const coins = require('./config/coins')

const createWallet = () => {
  const mnemonic = generateMnemonic()
  console.log(mnemonic)
  const account = createIndividualWallet(mnemonic, coins.eth, 0)
  console.log(account)
}

const sendTx = () => {
  sendTransaction(undefined, coins.eth, 0, '', 5.5, ({ asset: { decimals: 18, contractAddress: '' } }))
}

const checkBalance = () => {
  getBalance('', coins.eth, ({ asset: { decimals: 18 } }))
}

const checkAllBalances = () => {
  getBalance('', coins.eth, { assets: [{ symbol: 'BAT', decimals: 18, contractAddress: '' }] })
}

const getFee = () => {
  estimateTxFee(undefined, coins.eth, undefined, 0)
}

const getTxHistory = () => {
  getTransactionHistory(coins.eth, '')
}

//getTxHistory()