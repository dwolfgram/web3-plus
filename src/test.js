const sendTransaction = require('./index').sendTransaction


const getAccount = async () => {
  try {
    const tx = await sendTransaction(
      '', 
      'btc',
      0,
      '36W5pKKg1coPs8CkqA8yDvPhmV1wUWrsp9',
      .0005,
      { account }
    )
    console.log('yoooo', tx)
    // const balance = await discoverAccount('1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX', 'btc')
    // console.log(balance)
  } catch (err) {
    console.log(err)
  }
}

getAccount()