const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const sendTransaction = require('./index').sendTransaction
const coins = require('./config/coins')

const createWallet = () => {
  const mnemonic = generateMnemonic()
  const account = createIndividualWallet(mnemonic, coins.btc, 0)
  //console.log(account)
}

const sendTx = () => {
  sendTransaction(undefined, coins.btc, 0)
}

sendTx()