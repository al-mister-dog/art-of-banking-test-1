import "@testing-library/jest-dom";
import { Customer, CommercialBank } from "../instances";
import { CustomerService } from "../services";
import { System } from "../systems";

function createLoanSystem() {
  System.setSystem()
  const hsbc = new CommercialBank("HSBC");
  const johnDoe = new Customer("JOHN_DOE");
  CustomerService.openAccount(
    johnDoe,
    hsbc,
  );
  return { hsbc, johnDoe };
}
describe("customer loans", () => {
  it("should open a loan on account in bank assets on takeLoan with default interest added", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 1000);
    expect(johnDoe.liabilities.customerLoans[0]).toEqual({
      id: "HSBC",
      type: "customerLoans",
      amount: 1100,
    });
    expect(hsbc.assets.customerLoans[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerLoans",
      amount: 1100,
    });
  });
  it("should open a loan on account in bank assets on takeLoan with inputted interest added", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    const interestRate = Math.round(Math.random() * 100);
    const amountPlusInterest = 1000 + (1000 * interestRate) / 100;
    CustomerService.createLoan(johnDoe, hsbc, 1000, interestRate);
    expect(johnDoe.liabilities.customerLoans[0]).toEqual({
      id: "HSBC",
      type: "customerLoans",
      amount: amountPlusInterest,
    });
    expect(hsbc.assets.customerLoans[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerLoans",
      amount: amountPlusInterest,
    });
  });
  it("should increase deposit assets in customer and deposit liabilities without interest added in bank on takeLoan", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 1000);
    expect(johnDoe.assets.customerDeposits[0]).toEqual({
      id: "HSBC",
      type: "customerDeposits",
      amount: 1000,
    });
    expect(hsbc.liabilities.customerDeposits[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerDeposits",
      amount: 1000,
    });
  });
  it("should decrease loan assets in bank and  loan liabilities in customer on repayLoan", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 1000);
    CustomerService.repayLoan(johnDoe, hsbc, 500);
    expect(johnDoe.liabilities.customerLoans[0]).toEqual({
      id: "HSBC",
      type: "customerLoans",
      amount: 600,
    });
    expect(hsbc.assets.customerLoans[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerLoans",
      amount: 600,
    });
  });
  it("should decrease deposit liabilities in bank and deposit assets in customer on repayLoan", () => {
    const { johnDoe, hsbc } = createLoanSystem();

    CustomerService.createLoan(johnDoe, hsbc, 1000);
    CustomerService.repayLoan(johnDoe, hsbc, 500);
    expect(johnDoe.assets.customerDeposits[0]).toEqual({
      id: "HSBC",
      type: "customerDeposits",
      amount: 500,
    });
    expect(hsbc.liabilities.customerDeposits[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerDeposits",
      amount: 500,
    });
  });
  it("should decrease customer reserves and increase bank reserves on repayLoanReserves", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 1000);
    CustomerService.repayLoanReserves(johnDoe, hsbc, 500);
    expect(johnDoe.reserves).toBe(-400);
    expect(hsbc.reserves).toBe(500);
  });
  it("should keep deposit amounts the same on repayLoanReserves", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 1000);
    CustomerService.repayLoanReserves(johnDoe, hsbc, 500);
    expect(johnDoe.assets.customerDeposits[0]).toEqual({
      id: "HSBC",
      type: "customerDeposits",
      amount: 1000,
    });
    expect(hsbc.liabilities.customerDeposits[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerDeposits",
      amount: 1000,
    });
  });
  it("should increase overdraft on repayLoan if not enough money in customer account", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 100);
    CustomerService.withdraw(johnDoe, hsbc, 90);
    CustomerService.repayLoan(johnDoe, hsbc, 100);
    expect(johnDoe.liabilities.customerOverdrafts[0]).toEqual({
      id: "HSBC",
      type: "customerOverdrafts",
      amount: 90,
    });
    expect(hsbc.assets.customerOverdrafts[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerOverdrafts",
      amount: 90,
    });
  });
  it("should not increase overdraft on repayLoanReserves if not enough money in customer account", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 100);
    CustomerService.withdraw(johnDoe, hsbc, 100);
    CustomerService.repayLoanReserves(johnDoe, hsbc, 100);
    expect(johnDoe.liabilities.customerOverdrafts[0]).toEqual({
      id: "HSBC",
      type: "customerOverdrafts",
      amount: 0,
    });
    expect(hsbc.assets.customerOverdrafts[0]).toEqual({
      id: "JOHN_DOE",
      type: "customerOverdrafts",
      amount: 0,
    });
  });
  it("should not decrease a customers assets if more than loan amount is repaid", () => {
    const { johnDoe, hsbc } = createLoanSystem();
    CustomerService.createLoan(johnDoe, hsbc, 100);
    CustomerService.repayLoan(johnDoe, hsbc, 120);
    expect(johnDoe.assets.customerDeposits[0].amount).toBe(0);
    expect(johnDoe.liabilities.customerLoans[0].amount).toBe(0);
  });
});
