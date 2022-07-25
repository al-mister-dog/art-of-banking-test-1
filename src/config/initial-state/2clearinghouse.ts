export const clearinghouseState = {
  oneBigBank: {
    system: "default",
    parties: [
      {
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 0,
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 0,
          },
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 50,
          },
          {
            customer: "customer4",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer4", amount: 40 }],
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 20 }],
          },
          {
            customer: "customer4",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer4", amount: 40 }],
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 20 }],
          },
          {
            customer: "customer4",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer4", amount: 50 }],
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 50,
          },
        ],
        reserves: 0,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 50,
            transfers: [{ customer: "customer2", amount: 30 }],
          },
          {
            customer: "customer4",
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
        bank: "bank1",
        customers: [
          {
            customer: "customer1",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ customer: "customer4", amount: 50 }],
          },
          {
            customer: "customer2",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 300,
      },
      {
        bank: "bank2",
        customers: [
          {
            customer: "customer3",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ customer: "customer2", amount: 30 }],
          },
          {
            customer: "customer4",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 300,
      },
      {
        bank: "bank3",
        customers: [
          {
            customer: "customer5",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ customer: "customer2", amount: 30 }],
          },
          {
            customer: "customer6",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 300,
      },
      {
        bank: "bank4",
        customers: [
          {
            customer: "customer7",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ customer: "customer4", amount: 30 }],
          },
          {
            customer: "customer8",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 300,
      },
    ],
  },
};