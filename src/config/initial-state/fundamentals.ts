export const fundamentalsState = {
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