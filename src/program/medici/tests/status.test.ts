import "@testing-library/jest-dom";
import { System } from "../systems";

import { Customer, CommercialBank, ClearingHouse } from "../instances";
import {
  CustomerService,
  BankService,
  ClearingHouseService,
} from "../services";
import { StatusMethods } from "../methods";

function createBanksAndCustomers() {
  System.setSystem();
  const bank1 = new CommercialBank("Bank1");
  const bank2 = new CommercialBank("Bank2");
  const customer1 = new Customer("CUSTOMER1");
  const customer2 = new Customer("CUSTOMER2");
  return { bank1, bank2, customer1, customer2 };
}
function clearinghousePlusCertificates() {
  System.setSystem("clearinghouse");
  const clearinghouse = new ClearingHouse("clearinghouse");
  const bank1 = new CommercialBank("Bank1");
  const bank2 = new CommercialBank("Bank2");
  const customer1 = new Customer("CUSTOMER1");
  const customer2 = new Customer("CUSTOMER2");
  ClearingHouseService.openAccount(bank1, clearinghouse, 1000);
  ClearingHouseService.openAccount(bank2, clearinghouse, 1000);
  return { clearinghouse, bank1, bank2, customer1, customer2 };
}

describe("credit checks", () => {
  it("customer inOverdraft is false if customer is in credit", () => {
    const { bank1, customer1, customer2 } = createBanksAndCustomers();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank1);
    CustomerService.deposit(customer1, bank1, 100);
    expect(StatusMethods.inOverdraft(customer1)).toBe(false);
  });
  it("customer inOverdraft is true if customer is in overdraft", () => {
    const { bank1, customer1, customer2 } = createBanksAndCustomers();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank1);
    CustomerService.withdraw(customer1, bank1, 100);
    expect(StatusMethods.inOverdraft(customer1)).toBe(true);
  });
});
describe("records", () => {
  it("tracks record of deposit transaction", () => {
    const { bank1, customer1, customer2 } = createBanksAndCustomers();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank1);
    CustomerService.withdraw(customer1, bank1, 100);
    expect(StatusMethods.inOverdraft(customer1)).toBe(true);
  });
  function debtBasedTransaction(
    customer1: Customer,
    customer2: Customer,
    bank1: CommercialBank,
    bank2: CommercialBank
  ) {
    CustomerService.transfer(customer1, customer2, 50);
    BankService.netDues(bank1);
    BankService.netDues(bank2);
    ClearingHouseService.settleDues();
  }
  function creditBasedTransaction(
    customer1: Customer,
    customer2: Customer,
    bank1: CommercialBank,
    bank2: CommercialBank
  ) {
    CustomerService.transfer(customer2, customer1, 50);
    BankService.netDues(bank1);
    BankService.netDues(bank2);
    ClearingHouseService.settleDues();
  }
  it("continuous debtor status should be false if bank has not been a debtor continuously for number of most recent times specified", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    ClearingHouseService.settleDues();
    expect(StatusMethods.isConstantDebtor(bank1, 3)).toBe(false);
  });
  it("continuous debtor status should be true if bank has been a debtor continuously for number of most recent times specified", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    expect(StatusMethods.isConstantDebtor(bank1, 3)).toBe(true);
  });
  it("should confer general debtor status to a bank that is a debtor more than a creditor", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    expect(StatusMethods.isGeneralDebtor(bank1)).toBe(true);
  })
  it("should not confer general debtor status to a bank that is a creditor more than a debtor", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    expect(StatusMethods.isGeneralDebtor(bank1)).toBe(false);
  })
  it("should not confer general debtor status to a bank that is a creditor as much as a debtor", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    expect(StatusMethods.isGeneralDebtor(bank1)).toBe(false);
  })
  it("should confer a credit score based on percentage of credit based transactions", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();
    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    debtBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    creditBasedTransaction(customer1, customer2, bank1, bank2)
    expect(StatusMethods.creditStatus(bank1)).toBe(40);
  })
});
