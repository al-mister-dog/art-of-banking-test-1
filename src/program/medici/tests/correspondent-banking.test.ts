import "@testing-library/jest-dom";

import { Customer, CommercialBank } from "../instances";
import { System, systemCheck } from "../systems";
import { CustomerService, BankService } from "../services";

function createBanksAndCustomers() {
  System.setSystem("correspondent");
  const bank1 = new CommercialBank("Bank1");
  const bank2 = new CommercialBank("Bank2");
  const customer1 = new Customer("CUSTOMER1");
  const customer2 = new Customer("CUSTOMER2");
  return { bank1, bank2, customer1, customer2 };
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
    it("increase bank2 assets dues to customer2 on transfer", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank2.assets.dues[0]).toEqual({
        id: bank1.id,
        type: "dues",
        amount: 50,
      });
    });
    it("accumulates dues", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.deposit(customer2, bank2, 100);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      expect(bank1.liabilities.dues[0].amount).toBe(30);
      expect(bank2.liabilities.dues[0].amount).toBe(70);
      expect(bank1.assets.dues[0].amount).toBe(70);
      expect(bank2.assets.dues[0].amount).toBe(30);
    });
    it("nets dues", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.deposit(customer2, bank2, 100);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      BankService.netDues(bank1);
      BankService.netDues(bank2);
      expect(bank1.liabilities.dues[0].amount).toBe(0);
      expect(bank1.assets.dues[0].amount).toBe(40);
      expect(bank2.liabilities.dues[0].amount).toBe(40);
      expect(bank2.assets.dues[0].amount).toBe(0);
    });
    it("settles dues", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.deposit(customer2, bank2, 100);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      BankService.netDues(bank1);
      BankService.netDues(bank2);
      BankService.settleDues();
      expect(bank1.assets.dues[0].amount).toBe(0);
      expect(bank1.liabilities.dues[0].amount).toBe(0);
      expect(bank2.assets.dues[0].amount).toBe(0);
      expect(bank2.liabilities.dues[0].amount).toBe(0);
    });
    it("increases bank1 assets and balance in account with bank2", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.deposit(customer2, bank2, 100);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      BankService.netDues(bank1);
      BankService.netDues(bank2);
      BankService.settleDues();
      expect(bank1.assets.bankDeposits[0].amount).toBe(40);
      expect(bank1.balances.bankDeposits[0].amount).toBe(40);
    });
    it("increases bank2 assets and balance in account with bank1", () => {
      const { bank1, bank2, customer1, customer2 } = createBanksAndCustomers();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.deposit(customer2, bank2, 100);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      BankService.netDues(bank1);
      BankService.netDues(bank2);
      BankService.settleDues();
      expect(bank2.liabilities.bankDeposits[0].amount).toBe(40);
      expect(bank2.balances.bankDeposits[0].amount).toBe(40);
    });
  });
});
