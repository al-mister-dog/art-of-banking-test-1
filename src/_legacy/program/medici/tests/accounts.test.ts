import "@testing-library/jest-dom";
import { Customer, CommercialBank, ClearingHouse } from "../instances";
import { PaymentMethods } from "../methods";
import { System, systemCheck } from "../systems";
import {
  CustomerService,
  BankService,
  ClearingHouseService,
} from "../services";

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
function clearinghouseNoCertificates() {
  System.setSystem("clearinghouse");
  const clearinghouse = new ClearingHouse("clearinghouse");
  const bank1 = new CommercialBank("Bank1");
  const bank2 = new CommercialBank("Bank2");
  const customer1 = new Customer("CUSTOMER1");
  const customer2 = new Customer("CUSTOMER2");
  ClearingHouseService.openAccount(bank1, clearinghouse);
  ClearingHouseService.openAccount(bank2, clearinghouse);
  return { clearinghouse, bank1, bank2, customer1, customer2 };
}

describe("set up clearing house system", () => {
  it("sets system to clearing house banking", () => {
    clearinghousePlusCertificates();
    expect(systemCheck).toBe("clearinghouse");
  });
});
describe("balance sheet accounting", () => {
  describe("each customer has different bank", () => {
    it("creates an account accessible to both customer and bank on openAccount", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      expect(customer1.balances.customerDeposits.length).toBe(1);
      expect(customer2.balances.customerDeposits.length).toBe(1);
      expect(bank1.balances.chCertificates.length).toBe(1);
      expect(bank2.balances.chCertificates.length).toBe(1);
      expect(Object.keys(bank1.balances)).toEqual([
        "bankDeposits",
        "customerDeposits",
        "chCertificates",
      ]);
    });
    it("increases bank1 liabilities dues to customer1 on transfer", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank1.liabilities.dues[0]).toEqual({
        id: clearinghouse.id,
        type: "dues",
        amount: 50,
      });
    });
    it("increase bank2 assets dues to customer2 on transfer", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
      CustomerService.openAccount(customer1, bank1);
      CustomerService.openAccount(customer2, bank2);
      BankService.openAccount(bank1, bank2);
      BankService.openAccount(bank2, bank1);
      CustomerService.deposit(customer1, bank1, 100);
      CustomerService.transfer(customer1, customer2, 50);
      expect(bank2.assets.dues[0]).toEqual({
        id: clearinghouse.id,
        type: "dues",
        amount: 50,
      });
    });
    it("accumulates dues", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      expect(bank1.liabilities.dues[0].amount).toBe(30);
      expect(bank2.liabilities.dues[0].amount).toBe(70);
      expect(bank1.assets.dues[0].amount).toBe(70);
      expect(bank2.assets.dues[0].amount).toBe(30);
    });
    it("nets banks' dues", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      expect(bank1.liabilities.dues[0].amount).toBe(0);
      expect(bank1.assets.dues[0].amount).toBe(40);
      expect(bank2.liabilities.dues[0].amount).toBe(40);
      expect(bank2.assets.dues[0].amount).toBe(0);
    });
    it("nets clearinghouse's dues", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      expect(clearinghouse.liabilities.dues[0]).toEqual({
        id: bank2.id,
        type: "dues",
        amount: 0,
      });
      expect(clearinghouse.liabilities.dues[1]).toEqual({
        id: bank1.id,
        type: "dues",
        amount: 40,
      });
      expect(clearinghouse.assets.dues[0]).toEqual({
        id: bank1.id,
        type: "dues",
        amount: 0,
      });
      expect(clearinghouse.assets.dues[1]).toEqual({
        id: bank2.id,
        type: "dues",
        amount: 40,
      });
    });
    it("nets dues in banking service", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
    });
  });
  describe("in credit", () => {
    it("increases bank1 assets and balance in account with clearinghouse", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
      expect(bank1.assets.chCertificates[0].amount).toBe(1040);
      expect(bank1.balances.chCertificates[0].amount).toBe(1040);
    });
    it("decreases bank2 assets and balance in account with clearinghouse", () => {
      const { bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
      expect(bank2.assets.chCertificates[0].amount).toBe(960);
      expect(bank2.balances.chCertificates[0].amount).toBe(960);
    });
    it("increases clearinghouse liabilities and balance in account with bank1", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
      expect(clearinghouse.liabilities.chCertificates[0].amount).toBe(1040);
      expect(clearinghouse.balances.chCertificates[0].amount).toBe(1040);
    });
    it("increases clearinghouse assets and balance in account with bank2", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
      expect(clearinghouse.liabilities.chCertificates[1].amount).toBe(960);
      expect(clearinghouse.balances.chCertificates[1].amount).toBe(960);
    });
    it("continuously increases clearinghouse assets and balance in account with bank2", () => {
      const { clearinghouse, bank1, bank2, customer1, customer2 } =
        clearinghousePlusCertificates();
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
      PaymentMethods.settleDues();
      expect(clearinghouse.liabilities.chCertificates[1].amount).toBe(960);
      expect(clearinghouse.balances.chCertificates[1].amount).toBe(960);
      CustomerService.transfer(customer1, customer2, 10);
      CustomerService.transfer(customer1, customer2, 20);
      CustomerService.transfer(customer2, customer1, 30);
      CustomerService.transfer(customer2, customer1, 40);
      BankService.netDues(bank1);
      BankService.netDues(bank2);
      PaymentMethods.settleDues();
      expect(clearinghouse.liabilities.chCertificates[1].amount).toBe(920);
      expect(clearinghouse.balances.chCertificates[1].amount).toBe(920);
    });
  });
});
describe("overdrafts", () => {
  it("increases bank1 assets and balance in account with clearinghouse", () => {
    const { bank1, bank2, customer1, customer2 } =
      clearinghouseNoCertificates();
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
    PaymentMethods.settleDues();
    expect(bank1.assets.chCertificates[0].amount).toBe(40);
    expect(bank1.balances.chCertificates[0].amount).toBe(40);
  });
  it("increases bank2 liabilities and balance in account with clearinghouse", () => {
    const { bank1, bank2, customer1, customer2 } =
      clearinghouseNoCertificates();
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
    PaymentMethods.settleDues();
    expect(bank2.liabilities.chOverdrafts[0].amount).toBe(40);
    expect(bank2.balances.chCertificates[0].amount).toBe(-40);
  });
  it("increases clearinghouse liabilities and balance in account with bank1", () => {
    const { clearinghouse, bank1, bank2, customer1, customer2 } =
      clearinghouseNoCertificates();
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
    PaymentMethods.settleDues();
    expect(clearinghouse.liabilities.chCertificates[0].amount).toBe(40);
    expect(clearinghouse.balances.chCertificates[0].amount).toBe(40);
  });
  it("increases clearinghouse assets and balance in account with bank2", () => {
    const { clearinghouse, bank1, bank2, customer1, customer2 } =
      clearinghouseNoCertificates();
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
    PaymentMethods.settleDues();
    expect(clearinghouse.assets.chOverdrafts[1].amount).toBe(40);
    expect(clearinghouse.balances.chCertificates[1].amount).toBe(-40);
  });
  it("aincreases clearinghouse assets and balance in account with bank2", () => {
    const { clearinghouse, bank1, bank2, customer1, customer2 } =
      clearinghouseNoCertificates();
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
    PaymentMethods.settleDues();
    expect(clearinghouse.assets.chOverdrafts[1].amount).toBe(40);
    expect(clearinghouse.balances.chCertificates[1].amount).toBe(-40);
    CustomerService.transfer(customer1, customer2, 10);
    CustomerService.transfer(customer1, customer2, 20);
    CustomerService.transfer(customer2, customer1, 30);
    CustomerService.transfer(customer2, customer1, 40);
    BankService.netDues(bank1);
    BankService.netDues(bank2);
    PaymentMethods.settleDues();
    expect(clearinghouse.assets.chOverdrafts[1].amount).toBe(80);
    expect(clearinghouse.balances.chCertificates[1].amount).toBe(-80);
  });
});
describe("settlement", () => {
  it("should have 1000 chCertificates in each bank", () => {
    const clearinghouse = new ClearingHouse("clearinghouse");
    const bank1 = new CommercialBank("Bank1");
    const bank2 = new CommercialBank("Bank2");
    ClearingHouseService.openAccount(bank1, clearinghouse, 1000);
    ClearingHouseService.openAccount(bank2, clearinghouse, 1000);
    expect(bank1.assets.chCertificates[0].amount).toBe(1000);
    expect(bank2.assets.chCertificates[0].amount).toBe(1000);
  });
  it("should decrease debtor bank chCertificates on settlement", () => {
    System.setSystem("clearinghouse");
    const { bank1, bank2, customer1, customer2 } =
      clearinghousePlusCertificates();

    CustomerService.openAccount(customer1, bank1);
    CustomerService.openAccount(customer2, bank2);
    CustomerService.deposit(customer1, bank1, 100);
    CustomerService.deposit(customer2, bank2, 100);
    CustomerService.transfer(customer1, customer2, 50);
    BankService.netDues(bank1);
    BankService.netDues(bank2);
    ClearingHouseService.settleDues();
    expect(bank1.assets.chCertificates[0].amount).toBe(950);
  });
});
