const Networks = require('./networks')
const segwitPayments = require('bitcoin-segwit-payments')
const web3Payments = require('web3-payments')
const litecoinSegwitPayments = require('litecoin-segwit-payments')
const bitcoinCashPayments = require('bitcoin-cash-payments')

module.exports = {
  ac: {
    name: 'AC - Asiacoin',
    network: Networks.asiacoin,
    type: 51
  },
  acc: {
    name: 'ACC - Adcoin',
    network: Networks.adcoin,
    type: 161
  },
  aur: {
    name: 'AUR - Auroracoin',
    network: Networks.auroracoin,
    type: 85
  },
  axe: {
    name: 'AXE - Axe',
    network: Networks.axe,
    type: 4242
  },
  // anon: {
  //   name: 'ANON - ANON',
  //   network: Networks.anon,
  //   type: 220
  // },
  boli: {
    name: 'BOLI - Bolivarcoin',
    network: Networks.bolivarcoin,
    type: 278
  },
  bca: {
    name: 'BCA - Bitcoin Atom',
    network: Networks.atom,
    type: 185
  },
  bch: {
    name: 'BCH - Bitcoin Cash',
    network: Networks.bitcoin,
    type: 145,
    api: bitcoinCashPayments
  },
  beet: {
    name: 'BEET - Beetlecoin',
    network: Networks.beetlecoin,
    type: 800
  },
  bela: {
    name: 'BELA - Belacoin',
    network: Networks.belacoin,
    type: 73
  },
  blk: {
    name: 'BLK - BlackCoin',
    network: Networks.blackcoin,
    type: 10
  },
  bnd: {
    name: 'BND - Blocknode',
    network: Networks.blocknode,
    type: 2941
  },
  tbnd: {
    name: 'tBND - Blocknode Testnet',
    network: Networks.blocknode_testnet,
    type: 1
  },
  brit: {
    name: 'BRIT - Britcoin',
    network: Networks.britcoin,
    type: 70,
  },
  bsd: {
    name: 'BSD - Bitsend',
    network: Networks.bitsend,
    type: 91
  },
  bst: {
    name: 'BST - BlockStamp',
    network: Networks.blockstamp,
    type: 254
  },
  bta: {
    name: 'BTA - Bata',
    network: Networks.bata,
    type: 89
  },
  btc: {
    name: 'BTC - Bitcoin',
    network: Networks.bitcoin,
    type: 0,
    segwitAvailable: true,
    api: segwitPayments
  },
  btctestnet: {
    name: 'BTC - Bitcoin Testnet',
    network: Networks.testnet,
    type: 1
  },
  bitg: {
    name: 'BITG - Bitcoin Green',
    network: Networks.bitcoingreen,
    type: 222
  },
  // btcp: {
  //   name: 'BTCP - Bitcoin Private',
  //   network: Networks.bitcoinprivate,
  //   type: 183
  // },
  // btcz: {
  //   name: 'BTCZ - Bitcoinz',
  //   network: Networks.bitcoinz,
  //   type: 177
  // },
  btdx: {
    name: 'BTDX - BitCloud',
    network: Networks.bitcloud,
    type: 218
  },
  // btg: {
  //   name: 'BTG - Bitcoin Gold',
  //   network: Networks.bgold,
  //   type: 156
  // },
  btx: {
    name: 'BTX - Bitcore',
    network: Networks.bitcore,
    type: 160
  },
  ccn: {
    name: 'CCN - Cannacoin',
    network: Networks.cannacoin,
    type: 19
  },
  cesc: {
    name: 'CESC - Cryptoescudo',
    network: Networks.cannacoin,
    type: 111
  },
  cdn: {
    name: 'CDN - Canadaecoin',
    network: Networks.canadaecoin,
    type: 34
  },
  clam: {
    name: 'CLAM - Clams',
    network: Networks.clam,
    type: 23,
  },
  clo: {
    name: 'CLO - Callisto',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 820
  },
  club: {
    name: 'CLUB - Clubcoin',
    network: Networks.clubcoin,
    type: 79,
  },
  cmp: {
    name: 'CMP - Compcoin',
    network: Networks.compcoin,
    type: 71,
  },
  crave: {
    name: 'CRAVE - Crave',
    network: Networks.crave,
    type: 186
  },
  // crwLegacy: {
  //   name: 'CRW - Crown (Legacy)',
  //   network: Networks.crown,
  //   type: 72
  // },
  crw: {
    name: 'CRW - Crown',
    network: Networks.crown,
    type: 72,
  },
  dash: {
    name: 'DASH - Dash',
    network: Networks.dash,
    type: 5
  },
  dashtestnet: {
    name: 'DASH - Dash Testnet',
    network: Networks.dashtn,
    type: 1
  },
  dfc: {
    name: 'DFC - Defcoin',
    network: Networks.defcoin,
    type: 1337
  },
  dgb: {
    name: 'DGB - Digibyte',
    network: Networks.digibyte,
    type: 20
  },
  dgc: {
    name: 'DGC - Digitalcoin',
    network: Networks.digitalcoin,
    type: 18
  },
  dmd: {
    name: 'DMD - Diamond',
    network: Networks.diamond,
    type: 152
  },
  dnr: {
    name: 'DNR - Denarius',
    network: Networks.denarius,
    type: 116
  },
  doge: {
    name: 'DOGE - Dogecoin',
    network: Networks.dogecoin,
    type: 3
  },
  dxn: {
    name: 'DXN - DEXON',
    network: Networks.bitcoin,
    type: 237
  },
  ecn: {
    name: 'ECN - Ecoin',
    network: Networks.ecoin,
    type: 115
  },
  edrc: {
    name: 'EDRC - Edrcoin',
    network: Networks.edrcoin,
    type: 56
  },
  efl: {
    name: 'EFL - Egulden',
    network: Networks.egulden,
    type: 78
  },
  ella: {
    name: 'ELLA - Ellaism',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 163
  },
  emc2: {
    name: 'EMC2 - Einsteinium',
    network: Networks.einsteinium,
    type: 41
  },
  erc: {
    name: 'ERC - Europecoin',
    network: Networks.europecoin,
    type: 151
  },
  esn: {
    name: 'ESN - Ethersocial Network',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 31102
  },
  etc: {
    name: 'ETC - Ethereum Classic',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 61
  },
  eth: {
    name: 'ETH - Ethereum',
    network: Networks.bitcoin,
    type: 60,
    api: web3Payments
  },
  excl: {
    name: 'EXCL - Exclusivecoin',
    network: Networks.exclusivecoin,
    type: 190
  },
  // excc: {
  //   name: 'EXCC - ExchangeCoin',
  //   network: Networks.exchangecoin,
  //   type: 0
  // },
  exp: {
    name: 'EXP - Expanse',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 40
  },
  fjc: {
    name: 'FJC - Fujicoin',
    network: Networks.fujicoin,
    type: 75
  },
  flash: {
    name: 'FLASH - Flashcoin',
    network: Networks.flashcoin,
    type: 120
  },
  frst: {
    name: 'FRST - Firstcoin',
    network: Networks.firstcoin,
    type: 167
  },
  ftc: {
    name: 'FTC - Feathercoin',
    network: Networks.feathercoin,
    type: 8
  },
  game: {
    name: 'GAME - GameCredits',
    network: Networks.game,
    type: 101
  },
  gbx: {
    name: 'GBX - Gobyte',
    network: Networks.gobyte,
    type: 176
  },
  gcr: {
    name: 'GCR - GCRCoin',
    network: Networks.gcr,
    type: 79
  },
  grc: {
    name: 'GRC - Gridcoin',
    network: Networks.gridcoin,
    type: 84
  },
  hnc: {
    name: 'HNC - Helleniccoin',
    network: Networks.helleniccoin,
    type: 168
  },
  // hush: {
  //   name: 'HUSH - Hush',
  //   network: Networks.hush,
  //   type: 197,
  // },
  insn: {
    name: 'INSN - Insane',
    network: Networks.insane,
    type: 68,
  },
  iop: {
    name: 'IOP - Iop',
    network: Networks.iop,
    type: 66
  },
  ixc: {
    name: 'IXC - Ixcoin',
    network: Networks.ixcoin,
    type: 86
  },
  jbs: {
    name: 'JBS - Jumbucks',
    network: Networks.jumbucks,
    type: 26
  },
  kmd: {
    name: 'KMD - Komodo',
    bip49available: false,
    network: Networks.komodo,
    type: 141,
  },
  kobo: {
    name: 'KOBO - Kobocoin',
    bip49available: false,
    network: Networks.kobocoin,
    type: 196,
  },
  lbc: {
    name: 'LBC - Library Credits',
    network: Networks.lbry,
    type: 140,
  },
  lcc: {
    name: 'LCC - Litecoincash',
    network: Networks.litecoincash,
    type: 192,
  },
  ldcn: {
    name: 'LDCN - Landcoin',
    network: Networks.landcoin,
    type: 63,
  },
  linx: {
    name: 'LINX - Linx',
    network: Networks.linx,
    type: 114,
  },
  lkr: {
    name: 'LKR - Lkrcoin',
    segwitAvailable: false,
    network: Networks.lkrcoin,
    type: 557
  },
  ltc: {
    name: 'LTC - Litecoin',
    network: Networks.litecoin,
    type: 2,
    segwitAvailable: true,
    purpose: 49,
    api: litecoinSegwitPayments
  },
  // ltz: {
  //   name: 'LTZ - LitecoinZ',
  //   network: Networks.litecoinz,
  //   type: 221,
  // },
  lynx: {
    name: 'LYNX - Lynx',
    network: Networks.lynx,
    type: 191,
  },
  maza: {
    name: 'MAZA - Maza',
    network: Networks.maza,
    type: 13,
  },
  mec: {
    name: 'MEC - Megacoin',
    network: Networks.megacoin,
    type: 217,
  },
  mix: {
    name: 'MIX - MIX',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 76
  },
  mnx: {
    name: 'MNX - Minexcoin',
    network: Networks.minexcoin,
    type: 182,
  },
  mona: {
    name: 'MONA - Monacoin',
    network: Networks.monacoin,
    type: 22
  },
  music: {
    name: 'MUSIC - Musicoin',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 184
  },
  nav: {
    name: 'NAV - Navcoin',
    network: Networks.navcoin,
    type: 130,
  },
  // nas: {
  //   name: 'NAS - Nebulas',
  //   network: Networks.bitcoin,
  //   type: 2718
  // },
  nebl: {
    name: 'NEBL - Neblio',
    network: Networks.neblio,
    type: 146
  },
  neos: {
    name: 'NEOS - Neoscoin',
    network: Networks.neoscoin,
    type: 25
  },
  nix: {
    name: 'NIX - NIX Platform',
    network: Networks.nix,
    type: 400
  },
  nlg: {
    name: 'NLG - Gulden',
    network: Networks.gulden,
    type: 87
  },
  nmc: {
    name: 'NMC - Namecoin',
    network: Networks.namecoin,
    type: 7
  },
  nrg: {
    name: 'NRG - Energi',
    network: Networks.energi,
    type: 204
  },
  nro: {
    name: 'NRO - Neurocoin',
    network: Networks.neurocoin,
    type: 110
  },
  nsr: {
    name: 'NSR - Nushares',
    network: Networks.nushares,
    type: 11
  },
  nyc: {
    name: 'NYC - Newyorkc',
    network: Networks.newyorkc,
    type: 179
  },
  nvc: {
    name: 'NVC - Novacoin',
    network: Networks.novacoin,
    type: 50
  },
  ok: {
    name: 'OK - Okcash',
    network: Networks.okcash,
    type: 69,
  },
  omni: {
    name: 'OMNI - Omnicore',
    network: Networks.omnicore,
    type: 200
  },
  onx: {
    name: 'ONX - Onixcoin',
    network: Networks.onixcoin,
    type: 174
  },
  phr: {
    name: 'PHR - Phore',
    network: Networks.phore,
    type: 444
  },
  pink: {
    name: 'PINK - Pinkcoin',
    network: Networks.pinkcoin,
    type: 117
  },
  pirl: {
    name: 'PIRL - Pirl',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 164
  },
  pivx: {
    name: 'PIVX - PIVX',
    network: Networks.pivx,
    type: 119
  },
  pivxtestnet: {
    name: 'PIVX - PIVX Testnet',
    network: Networks.pivxtestnet,
    type: 1
  },
  poa: {
    name: 'POA - Poa',
    segwitAvailable: false,
    network: Networks.bitcoin,
    type: 178
  },
  posw: {
    name: 'POSW - POSWcoin',
    network: Networks.poswcoin,
    type: 47
  },
  pot: {
    name: 'POT - Potcoin',
    network: Networks.potcoin,
    type: 81
  },
  ppc: {
    name: 'PPC - Peercoin',
    network: Networks.peercoin,
    type: 6
  },
  prj: {
    name: 'PRJ - ProjectCoin',
    network: Networks.projectcoin,
    type: 533
  },
  psb: {
    name: 'PSB - Pesobit',
    network: Networks.pesobit,
    type: 62
  },
  put: {
    name: 'PUT - Putincoin',
    network: Networks.putincoin,
    type: 122
  },
  rvn: {
    name: 'RVN - Ravencoin',
    network: Networks.ravencoin,
    type: 175
  },
  rby: {
    name: 'RBY - Rubycoin',
    network: Networks.rubycoin,
    type: 16
  },
  rdd: {
    name: 'RDD - Reddcoin',
    network: Networks.reddcoin,
    type: 4
  },
  rvr: {
    name: 'RVR - RevolutionVR',
    network: Networks.revolutionvr,
    type: 129
  },
  safe: {
    name: 'SAFE - Safecoin',
    network: Networks.safecoin,
    type: 19165
  },
  sls: {
    name: 'SLS - Salus',
    network: Networks.salus,
    type: 63
  },
  sdc: {
    name: 'SDC - ShadowCash',
    network: Networks.shadow,
    type: 35
  },
  sdctestnet: {
    name: 'SDC - ShadowCash Testnet',
    network: Networks.shadowtn,
    type: 1
  },
  slm: {
    name: 'SLM - Slimcoin',
    network: Networks.slimcoin,
    type: 63
  },
  slmtestnest: {
    name: 'SLM - Slimcoin Testnet',
    network: Networks.slimcointn,
    type: 111
  },
  // slp: {
  //   name: 'SLP - Simple Ledger Protocol',
  //   type: 245
  // },
  slr: {
    name: 'SLR - Solarcoin',
    network: Networks.solarcoin,
    type: 58
  },
  smly: {
    name: 'SMLY - Smileycoin',
    network: Networks.smileycoin,
    type: 59
  },
  stash: {
    name: 'STASH - Stash',
    network: Networks.stash,
    type: 0xC0C0
  },
  stashtestnet: {
    name: 'STASH - Stash Testnet',
    network: Networks.stashtn,
    type: 0xCAFE
  },
  strat: {
    name: 'STRAT - Stratis',
    network: Networks.stratis,
    type: 105
  },
  strattestnet: {
    name: 'TSTRAT - Stratis Testnet',
    network: Networks.stratistest,
    type: 105
  },
  sys: {
    name: 'SYS - Syscoin',
    network: Networks.syscoin,
    type: 57
  },
  thc: {
    name: 'THC - Hempcoin',
    network: Networks.hempcoin,
    type: 113
  },
  toa: {
    name: 'TOA - Toa',
    network: Networks.toa,
    type: 159
  },
  usc: {
    name: 'USC - Ultimatesecurecash',
    network: Networks.ultimatesecurecash,
    type: 112
  },
  usnbt: {
    name: 'USNBT - NuBits',
    network: Networks.nubits,
    type: 12
  },
  uno: {
    name: 'UNO - Unobtanium',
    network: Networks.unobtanium,
    type: 92
  },
  vash: {
    name: 'VASH - Vpncoin',
    network: Networks.vpncoin,
    type: 33
  },
  via: {
    name: 'VIA - Viacoin',
    network: Networks.viacoin,
    type: 14
  },
  viatestnet: {
    name: 'VIA - Viacoin Testnet',
    network: Networks.viacointestnet,
    type: 1
  },
  vivo: {
    name: 'VIVO - Vivo',
    network: Networks.vivo,
    type: 166
  },
  vtc: {
    name: 'VTC - Vertcoin',
    network: Networks.vertcoin,
    type: 28
  },
  wc: {
    name: 'WC - Wincoin',
    network: Networks.wincoin,
    type: 181
  },
  xax: {
    name: 'XAX - Artax',
    network: Networks.artax,
    type: 219
  },
  xbc: {
    name: 'XBC - Bitcoinplus',
    network: Networks.bitcoinplus,
    type: 65
  },
  xmy: {
    name: 'XMY - Myriadcoin',
    network: Networks.myriadcoin,
    type: 90
  },
  xrp: {
    name: 'XRP - Ripple',
    network: Networks.bitcoin,
    type: 144
  },
  xvc: {
    name: 'XVC - Vcash',
    network: Networks.vcash,
    type: 127
  },
  xvg: {
    name: 'XVG - Verge',
    network: Networks.verge,
    type: 77
  },
  xuez: {
    name: 'XUEZ - Xuez',
    segwitAvailable: false,
    network: Networks.xuez,
    type: 225
  },
  xwc: {
    name: 'XWC - Whitecoin',
    network: Networks.whitecoin,
    type: 155
  },
  xzc: {
    name: 'XZC - Zcoin',
    network: Networks.zcoin,
    type: 136
  },
  // zcl: {
  //   name: 'ZCL - Zclassic',
  //   network: Networks.zclassic,
  //   type: 147
  // },
  // zec: {
  //   name: 'ZEC - Zcash',
  //   network: Networks.zcash,
  //   type: 133,
  // },
  // zen: {
  //   name: 'ZEN - Zencash',
  //   network: Networks.zencash,
  //   type: 121
  // }
}