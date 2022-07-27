import "@testing-library/jest-dom";

import { Customer, CommercialBank } from "../instances";
import { System, systemCheck } from "../systems";
import { CustomerService, BankService } from "../services";

function createBanksAndCustomers() {
  System.setSystem("correspondent");
  const bank1 = new CommercialBank("Bank 1");
  const bank2 = new CommercialBank("Bank 2");
  const bank3 = new CommercialBank("Bank 3");
  const bank4 = new CommercialBank("Bank 4");
  const customer1 = new Customer("CUSTOMER 1");
  const customer2 = new Customer("CUSTOMER 2");
  const customer3 = new Customer("CUSTOMER 3");
  const customer4 = new Customer("CUSTOMER 4");
  return {
    bank1,
    bank2,
    bank3,
    bank4,
    customer1,
    customer2,
    customer3,
    customer4,
  };
}
function multipleBanksAndCustomers() {
  System.setSystem("correspondent");
  const bank1 = new CommercialBank("Bank1");
  const bank2 = new CommercialBank("Bank2");
  const bank3 = new CommercialBank("Bank3");
  const bank4 = new CommercialBank("Bank4");
  const customer1 = new Customer("CUSTOMER1");
  const customer2 = new Customer("CUSTOMER2");
  const customer3 = new Customer("CUSTOMER3");
  const customer4 = new Customer("CUSTOMER4");
  const banks = [bank1, bank2, bank3, bank4];
  const customers = [customer1, customer2, customer3, customer4];
  for (let i = 0; i < banks.length - 1; i += 1) {
    for (let j = i + 1; j < banks.length; j += 1) {
      BankService.openAccount(banks[i], banks[j]);
    }
  }
  customers.forEach((c) => {
    for (let i = 0; i < banks.length; i++) {
      CustomerService.openAccount(c, banks[i]);
    }
  });
  return {
    customer1,
    customer2,
    customer3,
    customer4,
    bank1,
    bank2,
    bank3,
    bank4,
  };
}

describe("set up correspondent system", () => {
  it("sets system to correspondent banking", () => {
    createBanksAndCustomers();
    expect(systemCheck).toBe("correspondent");
  });
});
describe("balance sheet accounting", () => {
  describe("each customer has different bank", () => {
    it("creates an account accessible to both customer and bank on openAccount", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      expect(customer1.balances.customerDeposits.length).toBe(1);
      expect(customer2.balances.customerDeposits.length).toBe(1);
      expect(bank1.balances.customerDeposits.length).toBe(1);
      expect(bank2.balances.customerDeposits.length).toBe(1);
      expect(bank1.balances.bankDeposits.length).toBe(2);
      expect(bank2.balances.bankDeposits.length).toBe(2);
    });
    it("increase bank1 liabilities dues to customer1 on transfer", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank1.liabilities.dues[0]).toEqual({
        id: bank2.id,
        type: "dues",
        amount: 50,
      });
    });
  });
  describe("default parameters", () => {
    function transferSameBank(
      customer1: Customer,
      customer2: Customer,
      bank1: CommercialBank
    ) {
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.transfer(customer1, customer2, 50);
    }
    it("opens multiple banks for customers", () => {
      const { customer1, customer2, customer3, customer4 } =
        multipleBanksAndCustomers();
      const allBalances = [
        [...customer1.balances.customerDeposits],
        [...customer2.balances.customerDeposits],
        [...customer3.balances.customerDeposits],
        [...customer4.balances.customerDeposits],
      ];
      allBalances.forEach((balance) => {
        for (let i = 0; i < balance.length; i++) {
          expect(balance[i].id.split("-")[1]).toBe(`Bank${i + 1}`);
        }
      });
    });
    it("has no dues on transfers between members of same bank", () => {
      const { customer1, customer2, bank1 } = createBanksAndCustomers();
      transferSameBank(customer1, customer2, bank1);
      expect(bank1.liabilities.dues[0]).toEqual(undefined);
    });
    it("transfers from the first bank if no bank specified and all balances are the same", () => {
      const { customer1, customer2, bank1 } =
        multipleBanksAndCustomers();
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank1.assets.customerOverdrafts[0].amount).toBe(50);
    });
    it("transfers FROM the bank with most deposit if no bank specified", () => {
      const { customer1, customer2, bank1, bank2, bank3, bank4 } =
        multipleBanksAndCustomers();
      CustomerService.deposit(customer1, bank2, 100);
      CustomerService.deposit(customer1, bank1, 90);
      CustomerService.deposit(customer1, bank3, 80);
      CustomerService.deposit(customer1, bank4, 70);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank2.liabilities.customerDeposits[0].amount).toBe(50);
    });
    it("transfers TO the bank with least deposit if no bank specified", () => {
      const { customer1, customer2, bank1, bank2, bank3, bank4 } =
        multipleBanksAndCustomers();
      CustomerService.deposit(customer2, bank2, 70);
      CustomerService.deposit(customer2, bank1, 80);
      CustomerService.deposit(customer2, bank3, 90);
      CustomerService.deposit(customer2, bank4, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank2.liabilities.customerDeposits[1].amount).toBe(120);
    });
    it("transfers FROM the bank specified", () => {
      const { customer1, customer2, bank2 } = multipleBanksAndCustomers();
      CustomerService.transfer(customer1, customer2, 50, bank2);
      expect(bank2.assets.customerOverdrafts[0].amount).toBe(50);
    });
    it("transfers TO the bank specified", () => {
      const { customer1, customer2, bank2, bank3 } =
        multipleBanksAndCustomers();
      CustomerService.transfer(customer1, customer2, 50, bank2, bank3);
      expect(bank3.liabilities.customerDeposits[1].amount).toBe(50);
    });
    it("has no dues on transfers between members of same bank!", () => {
      const { customer1, customer2, bank1 } = createBanksAndCustomers();
      transferSameBank(customer1, customer2, bank1);
      expect(bank1.liabilities.dues[0]).toEqual(undefined);
    });
    it("has dues between c1 bank with most deposits and first c2 bank if no bank specified", () => {
      const { customer1, customer2, bank1, bank2, bank3, bank4 } =
        multipleBanksAndCustomers();
      CustomerService.deposit(customer1, bank2, 100);
      CustomerService.deposit(customer1, bank1, 90);
      CustomerService.deposit(customer1, bank3, 80);
      CustomerService.deposit(customer1, bank4, 70);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank1.assets.dues[0]).toEqual({
        id: "Bank2",
        type: "dues",
        amount: 50,
      });
      expect(bank2.liabilities.dues[0]).toEqual({
        id: "Bank1",
        type: "dues",
        amount: 50,
      });
    });
    it("has dues between first c1 bank and c2 bank with least deposits if no bank specified", () => {
      const { customer1, customer2, bank1, bank2, bank3, bank4 } =
        multipleBanksAndCustomers();
      CustomerService.deposit(customer2, bank2, 70);
      CustomerService.deposit(customer2, bank1, 80);
      CustomerService.deposit(customer2, bank3, 90);
      CustomerService.deposit(customer2, bank4, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank1.liabilities.dues[0]).toEqual({
        id: "Bank2",
        type: "dues",
        amount: 50,
      });
      expect(bank2.assets.dues[0]).toEqual({
        id: "Bank1",
        type: "dues",
        amount: 50,
      });
    });
    it("has dues between the bank specified and first c2 bank", () => {
      const { customer1, customer2, bank1, bank3 } =
        multipleBanksAndCustomers();
      CustomerService.transfer(customer1, customer2, 50, bank3);
      expect(bank1.assets.dues[0]).toEqual({
        id: "Bank3",
        type: "dues",
        amount: 50,
      });
      expect(bank3.liabilities.dues[0]).toEqual({
        id: "Bank1",
        type: "dues",
        amount: 50,
      });
    });
    it("has dues between banks specified", () => {
      const { customer1, customer2, bank2, bank3 } =
        multipleBanksAndCustomers();
      CustomerService.transfer(customer1, customer2, 50, bank2, bank3);
      expect(bank3.assets.dues[0]).toEqual({
        id: "Bank2",
        type: "dues",
        amount: 50,
      });
      expect(bank2.liabilities.dues[0]).toEqual({
        id: "Bank3",
        type: "dues",
        amount: 50,
      });
    });
  });
});
