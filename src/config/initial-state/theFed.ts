export const theFedState = {
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
            transfers: [{ id: "customer2", amount: 100 }],
          },
        ],
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
            initialDeposit: 0,
            reserves: 0,
            mortgages: 500000,
          },
        ],
        initialDeposit: 250000,
        reserves: 0,
      },
      {
        id: "bank2",
        name: "HSBC",
        initialDeposit: 250000,
        reserves: 250000,
      },
      {
        id: "bank3",
        name: "Chase",
        customers: [
          {
            id: "customer2",
            name: "you",
            reserves: 0,
            initialDeposit: 0,
          },
        ],
        initialDeposit: 250000,
        reserves: 250000,
      },
    ],
  },
};
