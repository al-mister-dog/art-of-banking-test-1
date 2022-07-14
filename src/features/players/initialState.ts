import {Quotes, Rates, Currencies} from "../../types";

export const certaintyQuotes: Quotes = {
  florence: false,
  lyons: true,
};

export const exchangeRates: Rates = {
  florence: 65.5,
  lyons: 64,
};

export const currencies: Currencies = {
  florence: "ecus",
  lyons: "marcs",
};

// export const salviati = {
//   id: "salviati",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     marcs: 1,
//   },
//   goods: 10,
// };

// export const me = {
//   id: "me",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//   },
//   goods: 10,
// };

// export const federigo = {
//   id: "federigo",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//   },
//   goods: 10,
// };

// export const piero = {
//   id: "piero",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     marcs: 1,
//   },
//   goods: 10,
// };

// export const you = {
//   id: "you",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//     marcs: 10,
//   },
// };

// export const tomasso = {
//   id: "tomasso",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//     marcs: 10,
//   },
// };

// export const state = {
//   certaintyQuotes,
//   exchangeRates,  
//   currencies,
//   me,
//   salviati,
//   federigo,
//   piero,
//   you,
//   tomasso
// }
export const salviati = {
  id: "salviati",
  city: "lyons",
  type: "importer",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
  coinAsset: [],
  coinLiability: [],
  records: []
};
export const me = {
  id: "me",
  city: "florence",
  type: "exporter",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
  coinAsset: [],
  coinLiability: [],
  records: []
};
export const federigo = {
  id: "federigo",
  city: "florence",
  type: "importer",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
  coinAsset: [],
  coinLiability: [],
  records: []
};
export const piero = {
  id: "piero",
  city: "lyons",
  type: "exporter",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
  coinAsset: [],
  coinLiability: [],
  records: []
};
export const you = {
  id: "you",
  city: "florence",
  type: "banker",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
  goods: 0,
  coinAsset: [],
  coinLiability: [],
  records: []
};
export const tomasso = {
  id: "tomasso",
  city: "lyons",
  type: "banker",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
  goods: 0,
  coinAsset: [],
  coinLiability: [],
  records: []
};