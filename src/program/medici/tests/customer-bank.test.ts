import "@testing-library/jest-dom";
import { System } from "../systems";

import { Customer, CommercialBank } from "../instances";
import { CustomerService } from "../services";

function createBankAndCustomer() {
  System.setSystem()
  const bank1 = new CommercialBank(
    "Bank1",
  );
  const customer1 = new Customer(
    "CUSTOMER1"
  );
  return { bank1, customer1 };
}
describe("balance sheet accounting", () => {
  describe("account balance", () => {
    it("creates an account accessible to both customer and bank on openAccount", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      expect(customer1.balances.customerDeposits.length).toBe(1);
      expect(bank1.balances.customerDeposits.length).toBe(1);
    });
    it("creates an account in customer with an ordered id on openAccount", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      expect(customer1.balances.customerDeposits[0].id).toBe(`${customer1.id}-${bank1.id}`);
    });
    it("creates an account in bank with an ordered set id on openAccount", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      expect(bank1.balances.customerDeposits[0].id).toBe(`${customer1.id}-${bank1.id}`);
    });
    it("adds to customer account balance on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(customer1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: 100,
      });
    });
    it("adds to bank account balance on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(bank1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: 100,
      });
    });
    it("accumulates a balance", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      const depositAmount = 100;
      const depositActions = 5;
      for (let i = 0; i < depositActions; i++) {
        CustomerService.deposit(customer1, bank1, depositAmount);
      }
      expect(bank1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: depositAmount * depositActions,
      });
      expect(customer1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: depositAmount * depositActions,
      });
    });
    it("subtracts from customer account on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(customer1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: -100,
      });
    });
    it("subtract from bank account on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(bank1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: -100,
      });
    });
    it("decreases a balance", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      const depositAmount = 100;
      const depositActions = 5;
      for (let i = 0; i < depositActions; i++) {
        CustomerService.withdraw(customer1, bank1, depositAmount);
      }
      expect(bank1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: -(depositAmount * depositActions),
      });
      expect(customer1.balances.customerDeposits[0]).toEqual({
        id: `${customer1.id}-${bank1.id}`,
        type: "customerDeposits",
        amount: -(depositAmount * depositActions),
      });
    });
  });
  describe("assets and liabilities", () => {
    it("adds to bank customerDeposit liabilities on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(bank1.liabilities.customerDeposits[0]).toEqual({
        id: customer1.id,
        type: "customerDeposits",
        amount: 100,
      });
    });
    it("adds to customer customerDeposit assets on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(customer1.assets.customerDeposits[0]).toEqual({
        id: bank1.id,
        type: "customerDeposits",
        amount: 100,
      });
    });
    it("does not add to bank customerDeposit overdrafts on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(bank1.assets.customerOverdrafts[0]).toEqual({
        id: customer1.id,
        type: "customerOverdrafts",
        amount: 0,
      });
    });
    it("does not add to customer customerDeposit overdrafts on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(customer1.liabilities.customerOverdrafts[0]).toEqual({
        id: bank1.id,
        type: "customerOverdrafts",
        amount: 0,
      });
    });
    it("adds to bank customerOverdraft assets on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(bank1.assets.customerOverdrafts[0]).toEqual({
        id: customer1.id,
        type: "customerOverdrafts",
        amount: 100,
      });
    });
    it("adds to customer customerOverdraft liabilities on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(customer1.liabilities.customerOverdrafts[0]).toEqual({
        id: bank1.id,
        type: "customerOverdrafts",
        amount: 100,
      });
    });
    it("does not add to bank customerDeposit liabilities on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(bank1.liabilities.customerDeposits[0]).toEqual({
        id: customer1.id,
        type: "customerDeposits",
        amount: 0,
      });
    });
    it("does not add to customer customerDeposit assets on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(customer1.assets.customerDeposits[0]).toEqual({
        id: bank1.id,
        type: "customerDeposits",
        amount: 0,
      });
    });
    it("can go from overdraft to credit account and map to balance", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(customer1.balances.customerDeposits[0].amount).toBe(100);
      expect(bank1.balances.customerDeposits[0].amount).toBe(100);
      expect(customer1.assets.customerDeposits[0].amount).toBe(100);
      expect(bank1.liabilities.customerDeposits[0].amount).toBe(100);
      expect(customer1.liabilities.customerOverdrafts[0].amount).toBe(0);
      expect(bank1.assets.customerOverdrafts[0].amount).toBe(0);
      CustomerService.withdraw(customer1, bank1, 200);
      expect(customer1.balances.customerDeposits[0].amount).toBe(-100);
      expect(bank1.balances.customerDeposits[0].amount).toBe(-100);
      expect(customer1.assets.customerDeposits[0].amount).toBe(0);
      expect(bank1.liabilities.customerDeposits[0].amount).toBe(0);
      expect(customer1.liabilities.customerOverdrafts[0].amount).toBe(100);
      expect(bank1.assets.customerOverdrafts[0].amount).toBe(100);
      CustomerService.deposit(customer1, bank1, 200);
      expect(customer1.balances.customerDeposits[0].amount).toBe(100);
      expect(bank1.balances.customerDeposits[0].amount).toBe(100);
      expect(customer1.assets.customerDeposits[0].amount).toBe(100);
      expect(bank1.liabilities.customerDeposits[0].amount).toBe(100);
      expect(customer1.liabilities.customerOverdrafts[0].amount).toBe(0);
      expect(bank1.assets.customerOverdrafts[0].amount).toBe(0);
    });
  });
  describe("reserves", () => {
    it("should decrease customer reserves on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      customer1.reserves = 100
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(customer1.reserves).toBe(0)
    })
    it("should increase bank reserves on customerDeposit", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      customer1.reserves = 100
      CustomerService.openAccount(customer1, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      expect(bank1.reserves).toBe(100)
    })
    it("should increase customer reserves on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      customer1.reserves = 0
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(customer1.reserves).toBe(100)
    })
    it("should decrease bank reserves on customerWithdraw", () => {
      const { bank1, customer1 } = createBankAndCustomer();
      bank1.reserves = 100
      CustomerService.openAccount(customer1, bank1);
      CustomerService.withdraw(customer1, bank1, 100);
      expect(bank1.reserves).toBe(0)
    })
  })
});

//NEXT
/**
 * RESERVES AND CONSTRAINTS ON RESERVES
 * inputs and outputs are just numbers. there should be no inherent limit 
 * on how much numbers can increase or decrease
 * this will be determined by certain rules placed on interfaces
 */