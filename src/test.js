const generateMnemonic = require('./index').generateMnemonic
const createIndividualWallet = require('./index').createIndividualWallet
const coins = require('./config/coins')

const createWallet = () => {
  const mnemonic = generateMnemonic()
  const account = createIndividualWallet(mnemonic, coins.rvn, 0)
  console.log(account)
}

createWallet()