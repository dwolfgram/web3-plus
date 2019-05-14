const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const sendTransaction = require('./index').sendTransaction
const getBalance = require('./index').getBalance
const getTransactionHistory = require('./index').getTransactionHistory
const estimateTxFee = require('./index').estimateTxFee
const getAllCoins = require('./index').getAllCoins
const getAllAvailableMnemonicLanguages = require('./index').getAllAvailableMnemonicLanguages
const getAll = require('./index').createWalletsForAllCoins
const coins = require('./config/coins')

const createWallet = async (symbol) => {
  //const mnemonic = generateMnemonic()
  //console.log(mnemonic)
  try {
    const account = await createIndividualWallet(undefined, symbol, 0)
    console.log({ ...account, symbol: symbol })
  } catch (err) {
    console.log(symbol)
  }
  
  // console.log({ ...account, symbol })
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
  estimateTxFee(undefined, coins.btc, 0, undefined)
}

const getTxHistory = () => {
  getTransactionHistory(coins.bch, '')
}

const getAllTheCoins = () => {
  const coins = getAllCoins()
  Promise.all(coins.map(coin => createWallet(coin.symbol)))
  .then((w) => w)
}

const createAllTheWallets = () => {
  createWalletsForAllCoins(undefined, 0)
    .then((wallets) => wallets)
}

console.log(getAllAvailableMnemonicLanguages())