export const lecture3StateConfig = {
  daylightOverdraft: {
    system: "centralbank",
    parties: [
      {
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 100 }],
          },
        ],
        initialDeposit: 0,
        reserves: 0,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        initialDeposit: 100,
        reserves: 100,
      },
      {
        bank: "bank3",
        customers: [
          {
            customer: "customer3",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 100 }],
          },
        ],
        reserves: 0,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        reserves: 100,
      },
      {
        bank: "bank3",
        customers: [
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 0,
          },
        ],
        reserves: 100,
      },
    ],
  },
};
