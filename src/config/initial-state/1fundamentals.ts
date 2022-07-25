export const lecture1StateConfig = {
  step1And2: {},
  defaultSetup: {
    system: "default",
    parties: [
      {
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
          },
          {
            customer: "customer2",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
          },
          {
            customer: "customer2",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 40 }],
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer1", amount: 20 }],
          },
        ],
        reserves: 500,
      },
    ],
  },
};