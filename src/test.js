const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const sendTransaction = require('./index').sendTransaction
const getBalance = require('./index').getBalance
const estimateTxFee = require('./index').estimateTxFee
const coins = require('./config/coins')

const createWallet = () => {
  const mnemonic = generateMnemonic()
  const account = createIndividualWallet(mnemonic, coins.btc, 0)
  //console.log(account)
}

const sendTx = () => {
  sendTransaction(undefined, coins.btc, 0)
}

const checkBalance = () => {
  getBalance('3CViJc2w7p9AcboXo6BY7SSfsS9dZNvcRM', coins.btc)
}

const getFee = () => {
  estimateTxFee('month hotel cereal sick shop sudden wine betray pulp diagram erode design', coins.btc, 0)
}

getFee()