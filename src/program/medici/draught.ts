//THE SYSTEMATIC ENRICHMENT OF EXCHANGE BANKERS
type Rates = {
  [index: string]: number;
};
type Quotes = {
  [index: string]: boolean;
};
type Currency = "ecus" | "marcs";
type Currencies = {
  [index: string]: Currency;
};
type Bill = {
  id: string;
  dueTo: string;
  dueFrom: string;
  city: string;
  amount: number;
};

//
export const certaintyQuotes: Quotes = {
  florence: false,
  lyons: true,
};

export const exchangeRates: Rates = {
  florence: 66,
  lyons: 64,
};



const currencies: Currencies = {
  florence: "ecus",
  lyons: "marcs",
};

export const salviati = {
  id: "salviati",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
};
export const me = {
  id: "me",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
};
export const federigo = {
  id: "federigo",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
};
export const piero = {
  id: "piero",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
};
export const you = {
  id: "you",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
};
export const tomasso = {
  id: "tomasso",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
};

///LOGIC
export function trade(importer: any, exporter: any, amount: any) {
  const bill = {
    id: new Date().toISOString(),
    dueTo: exporter.id,
    dueFrom: importer.id,
    city: importer.city,
    amount: amount,
  };
  importer.goods += amount;
  exporter.goods -= amount;  
  importer.liabilities = [...importer.liabilities, bill];
  exporter.assets = [...exporter.assets, bill];
}

function exchangeBill(holder: any, recipient: any, presentedBill: any) {
  const bill = holder.assets.find(
    (b: { id: any }) => b.id === presentedBill.id
  );
  recipient.assets = [...recipient.assets, bill];
  holder.assets = recipient.assets.filter(
    (b: { id: any }) => b.id !== presentedBill.id
  );
}
export function exchangeMoney(payee: any, drawee: any, bill: any) {
  const unitOfAccount = bill.amount;
  const localCurrency = bill.amount * exchangeRates[bill.city];
  const cityQuotesCertain = certaintyQuotes[drawee.city];
  if (cityQuotesCertain) {
    drawee.coins[currencies[drawee.city]] -= unitOfAccount;
    payee.coins[currencies[drawee.city]] += unitOfAccount;
  } else {
    drawee.coins[currencies[drawee.city]] -= localCurrency;
    payee.coins[currencies[drawee.city]] += localCurrency;
  }
}

export function drawBill(payee: any, drawee: any, presentedBill: any) {
  exchangeBill(payee, drawee, presentedBill);
  exchangeMoney(payee, drawee, presentedBill);
}

export function remitBill(presenter: any, presentee: any, presentedBill: Bill) {
  const bill = presenter.assets.find(
    (b: { id: any }) => b.id === presentedBill.id
  );
  presenter.assets = presenter.assets.filter(
    (b: { id: any }) => b.id !== presentedBill.id
  );
  presentee.assets = [...presentee.assets, bill];
}

//Exchange and return exchange
trade(salviati, me, 1);
console.log(me.coins);
console.log(you.coins);
drawBill(me, you, me.assets[0]);
console.log(me.coins);
console.log(you.coins);
remitBill(you, tomasso, you.assets[0]);
drawBill(tomasso, salviati, tomasso.assets[0]);
console.log(salviati.coins);
console.log(tomasso.coins);
trade(federigo, piero, 1);
drawBill(piero, tomasso, piero.assets[0]);
console.log(tomasso.coins);
console.log(piero.coins);
remitBill(tomasso, you, tomasso.assets[0]);
drawBill(you, federigo, you.assets[0]);
console.log(federigo.coins);
console.log(you.coins);
