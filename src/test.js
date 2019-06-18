const discoverAccount = require('./index').discoverAccount

const getAccount = async () => {
  try {
    const account = await discoverAccount('', 'btc')
    console.log('yoooo', account)
  } catch (err) {
    console.log(err)
  }
}

getAccount()