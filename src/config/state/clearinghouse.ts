export const clearinghouseState = {
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
        member: true,
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
        member: true,
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
            transfers: [
              { id: "customer4", amount: 100 },
              { id: "customer6", amount: 100 },
            ],
          },
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 100,
            transfers: [
              { id: "customer7", amount: 100 },
              { id: "customer8", amount: 100 },
            ],
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
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
        initialDeposit: 200,
        member: true,
      },
      {
        id: "bank3",
        customers: [
          {
            id: "customer5",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer4", amount: 30 }],
          },
          {
            id: "customer6",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
      {
        id: "bank4",
        customers: [
          {
            id: "customer7",
            reserves: 100,
            initialDeposit: 100,
            transfers: [{ id: "customer5", amount: 30 }],
          },
          {
            id: "customer8",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
    ],
  },
  playground: {
    system: "clearinghouse",
    parties: [
      {
        id: "bank1",
        customers: [
          {
            id: "customer1",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
      {
        id: "bank2",
        customers: [
          {
            id: "customer2",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
      {
        id: "bank3",
        customers: [
          {
            id: "customer3",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
      {
        id: "bank4",
        customers: [
          {
            id: "customer4",
            reserves: 100,
            initialDeposit: 100,
          },
        ],
        reserves: 0,
        initialDeposit: 200,
        member: true,
      },
    ],
  },
};
