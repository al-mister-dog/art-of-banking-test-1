export const defaultSetup = {
  system: "correspondent",
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
    {
      bank: "bank2",
      customers: [
        {
          customer: "customer3",
          reserves: 100,
        },
      ],
      reserves: 500,
    },
  ],
};

export const creditSetup = {
  system: "correspondent",
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
};

export const setupAll = {
  system: "correspondent",
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
    {
      bank: "bank2",
      customers: [
        {
          customer: "customer3",
          reserves: 100,
          initialDeposit: 50,
          transfers: [{ customer: "customer4", amount: 40 }],
        },
        {
          customer: "customer4",
          reserves: 100,
          initialDeposit: 50,
          transfers: [
            { customer: "customer3", amount: 50 },
            { customer: "customer2", amount: 50 },
          ],
        },
      ],
      reserves: 500,
    },
  ],
};

export const oneBigBank = {
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
};

export const module2 = {
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
};
