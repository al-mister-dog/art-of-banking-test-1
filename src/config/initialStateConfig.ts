export const lecture1StateConfig = {
  step1And2: {},
  defaultSetup: {
    system: "default",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
          },
          {
            id: "customer2",
            reserves: 100,
          },
        ],
        reserves: 500,
      },
    ],
  },

  creditSetup: {
    system: "default",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 500,
      },
    ],
  },

  overdraft: {
    system: "default",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer2", amount: 40 }],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer1", amount: 20 }],
          },
        ],
        reserves: 500,
      },
    ],
  },
};
export const lecture2StateConfig = {
  oneBigBank: {
    system: "default",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 0,
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 0,
          },
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 50,
          },
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
    ],
  },
  multipleBanks: {
    system: "interbank",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer4", amount: 40 }],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer2", amount: 20 }],
          },
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
    ],
  },
  correspondentBanking: {
    system: "correspondent",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer4", amount: 40 }],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer2", amount: 20 }],
          },
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
    ],
  },
  clearinghouse: {
    system: "clearinghouse",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer4", amount: 50 }],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer2", amount: 30 }],
          },
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
    ],
  },
  clearinghouseLoans: {
    system: "clearinghouse",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer4", amount: 50 }],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer2", amount: 30 }],
          },
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank3",
        customers: [
          {
            id: "customer5",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer2", amount: 30 }],
          },
          {
            id: "customer6",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
      },
      {
        id: "bank4",
        customers: [
          {
            id: "customer7",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer4", amount: 30 }],
          },
          {
            id: "customer8",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
      },
    ],
  },
};

export const lecture3StateConfig = {
  daylightOverdraft: {
    system: "centralbank",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ id: "customer2", amount: 100 }],
          },
        ],
        initialDeposit: 0,
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
      {
        id: "bank3",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
    ],
  },
  fedFundsMarket: {
    system: "centralbank",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        initialDeposit: 100,
        reserves: 0,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
      {
        id: "bank3",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
    ],
  },
  mortgages: {
    system: "centralbank",
    parties: [
      {
        id: "bank1",
        name: "Citibank",
        customers: [
          {
            id: "customer1",
            name: "me",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        initialDeposit: 100,
        reserves: 0,
      },
      {
        id: "bank2",
        name: "HSBC",
        initialDeposit: 100,
        reserves: 100,
      },
      {
        id: "bank3",
        name: "Chase",
        customers: [
          {
            id: "customer3",
            name: "you",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
    ],
  },
};
