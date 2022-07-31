export const fundamentalsText = {
  step1: {
    lectureTitle: `fundamentals`,
    title: `Banking Fundamentals: Balance Sheets`,
    paragraphs: [
      `For someone unfamiliar to the world of banking and finance, the whole thing can seem 
      very confusing. Not only is banking and economics seemingly very complex (the Financial 
      Times is full of special jargon, charts and graphs), but most people base their understanding
      of this world from polemical news articles, social media, or the general public without 
      ever having wondered how bankers themselves see it.`,
      `To think like a banker is simply to think in terms of balance sheets, and making sure 
      the numbers on both sides amount to the same number. The banker is primarily concerned 
      with making sure that their ingoings match their outgoings. These balance sheets will 
      belong not only to banks, but businesses, governments, customers etc. Everyone is bank 
      and everyone has a balance sheet.`,
    ],
    assignment: `Sources: Allyn Young - The Mystery of Money
    Clearinghouse loan certificates as interbank loans in the United States, 1860–1913 - Christopher Hoag,
    Money and Banking - Perry Mehrling`,
  },

  step2: {
    lectureTitle: `fundamentals`,
    title: `Balance Sheets and Bank Deposits`,
    paragraphs: [
      `A balance sheet is a T shaped graph that has two sides. One side consists
      of assets, and the other side consists of liabilities. Assets are things that
      you own, like money or a car, and liabilities are things that you
      owe to someone else, which could also be money or a mortgages etc.
      Please note that in this example the bank's liabilities are 'deposits' and
      the customer's assets are also 'deposits'. Both the bank and the customer have
      cash as an assets, which counts towards their reserves, but the customer's cash 
      is not shown here (maybe its in their back pocket).But what is the difference between cash 
      and deposits? `,
      `It seems like common sense to assume when we deposit cash at the bank, the money 
      is waiting in a vault inside the bank for us somewhere as cash to withdraw. 
      The truth is a little more complicated, but not too much. When a customer puts their 
      money in a bank, they receive a deposit in return. A deposit is actually different 
      to the cash that the customer puts in the bank. A deposit means money that the bank 
      owes to its customer, and which the customer can demand at any point to be redeemed in cash.
      In fact there are much more deposits than there is cash money. According to the 
      Bank of England, only 4% of the money in the UK is cash; 96% is deposits. The same is true
      in many countries in the world. The money is digital.`,
      `In your local bank branch it is certain that there is more money in deposits (which are just 
      numbers in a database) than there is cash in the vaults. Fortunately not everyone is going 
      to go the bank to withdraw their money all at once, otherwise the bank would not be able 
      to follow on their promise to redeem the customer's deposits on demand. During times of 
      financial uncertainty there may be large queues outside banks, 
      with people trying to withdraw their deposits as cash (try googling 'Northern Rock').
      This illustrates the fact that there is in fact some uncertainty as to the status of deposits 
      compared to cash. You could say that one money is better than the other. As will become clearer as you go
      through each module in the course, there are many types of money, and they line up in a hierarchy!
      Hopefuly this serves as a simple illustration of that fact.`,
    ],
    assignment: `Get Customer 1 to deposit and withdraw cash into and from their bank, and take notice 
    of the difference in the customer's and the bank's balance sheets. Then click next `,
  },
  step3: {
    lectureTitle: `fundamentals`,
    title: `Deposit Transfers`,
    paragraphs: [
      `We have seen how a bank takes a customer's money and exchanges them for deposits. On the bank's balance sheet, the deposits are counted as liabilities and the cash is part of the reserves on the assets side of the balance sheet.
      We will now look at bank transfers. We transfer money when we want or have to give someone money in payment.
      Outside of the banking system we could do this by simply handing the other person cash. But inside of
      the banking system this is done by online transfer, or by check. And in this case we are not transfering cash but instead
      we are transfering the deposits from our account into their account.`,
      `So what happens in the balance sheets when customers make transfers? If a bank has two customers, both depositing £100, the bank would have £200 in reserves and £200 of deposits, which the bank owes to its customers. If Customer One transfered some of their deposits to Customer Two, no change would occur in the bank's total assets or liabilities, even though a change between the accounts of customer One and customer Two has occured.
      As we will see later, it is a different situation when customers transfer deposits to customers with a different bank account to their own.`,
    ],
    assignment: `Here we have a bank with two customers, who have 100 pounds in cash ready to be deposited at the bank. Watch what happens to the bank’s balance sheet and the customers' accounts when they transfer their money to eachother.`,
  },
  step4: {
    lectureTitle: `fundamentals`,
    title: `Credit and Overdrafts`,
    paragraphs: [
      `Credit is simply a promise to pay at a future date. I could write you an IOU on a piece
      of paper in exchange for goods or services and that would count as credit. For banks, 
      deposits are a form of credit. They are promises to pay cash on demand at a future date.
      This is often forgotten as deposit transfers are the main form of retail purchase and 
      most people are happy with receiving deposits in their accounts as payment. Cash and 
      deposits are almost interchangeable`,
      `If a customer at a bank withdraws more money than is in their account, or if they transfer
      more than is in their account to someone else, they run a negative balance. This negative
      balance is called an overdraft. In this case the customer now owes the bank. Because of this
      a customer overdraft is an liability of the customer and an asset of the bank. For the bank,
      an overdraft represents money that they will receive from the customer in the future. This 
      can be paid back either in cash or through someone else transfering deposits into their account.`,
      `Overdrafts are simply deposits, a promise to pay, except this time by the customer to the bank.
      This means that overdrafts are also a form of credit. A promise to pay at a future date.
      Because credit is just a promise to pay and not the final means of settlement, the amount 
      of credit in a system expands much quicker than cash can (cash needs to be printed etc). 
      It is up to the bank issuing the overdraft for how long credit can expand before the money
      needs calling in.`,
      `We now introduce a line chart below that represents the amount of credit is in a bank at 
      any given moment. Lets say the bank starts with zero money. If a customer deposits $100 in 
      the bank, the bank owes $100 in deposits and therefore the amount of credit in the system is
      $100. If the customer withdraws $50, there is $50 of credit in the system. If a customer deposits
      $100 in the bank and transfers it to another customer of the same bank, the credit stays at $100.
      However if a customer transfers more money than is in their account, the credit expands further.
      The only way to contract the amount of credit is for the customer to pay back their overdraft. 
      We will be thinking about the expansion and contraction of credit much more as we go along, but
      this is a good starting point.
      `,
    ],
    assignment: `Assignment: There are two customers with the same bank, each with $100 in an account.
    Expand the credit in the system by $50 and then contract it to $0`,
  },
  step5: {
    lectureTitle: `fundamentals`,
    title: `Constraint`,
    paragraphs: [
      `Because cash is many ways seen as the final form of settlement, a bank must ensure that
      it can redeem its customers on a day to day basis. The surest way of doing this would be
      to keep all the cash deposited in a vault, in case all the customers decide to all take out
      their money at the same time. Of course, this is unlikely and the bank would like to use 
      these funds for investments elsewhere. But bank runs (the scenario illustrated in the previous
      sentence) can and do happen.`,
      `This then is one of many constraints a bank faces. Traditionally banks are required to keep
      a fraction of total customer deposits as reserves. For example if total customer deposits were
      $10000, a bank may be required by law to keep $2500 in reserve to meet its daily demands. This 
      is called fractional reserve banking.`,
      `We have seen by playing with overdrafts how credit can expand and contract. Credit expansion 
      means there is lots of investment going on, and lots of payments being made. However this 
      is a precarious position for a bank if suddenly everyone gets spooked and wants to redeem their
      deposits as cash. On the other hand, if credit doesn't expand, growth becomes much slower or 
      even impossible. The art of banking requires striking a balance between constraint and elasticity.`,
    ],
    assignment: `Change the reserve requirement and see how it effects the elasticity of the system.`,
  },
  step6: {
    lectureTitle: `fundamentals`,
    title: `Conclusion`,
    paragraphs: [
      `Because cash is many ways seen as the final form of settlement, a bank must ensure that
      it can redeem its customers on a day to day basis. The surest way of doing this would be
      to keep all the cash deposited in a vault, in case all the customers decide to all take out
      their money at the same time. Of course, this is unlikely and the bank would like to use 
      these funds for investments elsewhere. But bank runs (the scenario illustrated in the previous
      sentence) can and do happen.`,
      `This then is one of many constraints a bank faces. Traditionally banks are required to keep
      a fraction of total customer deposits as reserves. For example if total customer deposits were
      $10000, a bank may be required by law to keep $2500 in reserve to meet its daily demands. This 
      is called fractional reserve banking.`,
      `We have seen by playing with overdrafts how credit can expand and contract. Credit expansion 
      means there is lots of investment going on, and lots of payments being made. However this 
      is a precarious position for a bank if suddenly everyone gets spooked and wants to redeem their
      deposits as cash. On the other hand, if credit doesn't expand, growth becomes much slower or 
      even impossible. The art of banking requires striking a balance between constraint and elasticity.`,
    ],
    assignment: `Change the reserve requirement and see how it effects the elasticity of the system.`,
  },
};