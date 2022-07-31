export const clearinghouseText = {
  step1: {
    lectureTitle: `Clearing House`,
    title: `The Clearing House: Towards a Central Bank`,
    paragraphs: [
      `The United States Federal Reserve is often portrayed as a mysterious and often
      nefarious entity. However the Federal Reserve, a central bank, was created with 
      the intention of solving problems in banking that America faced from its inception. 
      This module seeks to shed some line on these basic problems in banking and how a 
      central bank could solve these problems`,
      `We will do this by examining a simple model of a network of banks; at first unconnected 
      to each other, and progressively finding ways to solve their problems through innovations 
      in accounting. These innovations occured throughout the 19th century, culminating in the 
      New York Clearing House Association: an early prototype of the Federal Reserve which came 
      to be dominated by JP Morgan, in 1853, and onwards to the Federal Reserve Act of 
      1913.`,
    ],
    assignment: `Sources: CF Dunbar - Chapters on the Theory and History of Banking, 
    Christopher Hoag - Clearinghouse loan certificates as interbank loans in the United States, 1860–1913, 
    James Graham Cannon - Clearing House Loan Certificates and Substitutes for Money Used During the Panic of 1907`,
  },

  step2: {
    lectureTitle: `Clearing House`,
    title: `One Big Bank`,
    paragraphs: [
      `Suppose there was only one bank, and everyone in the economy had an account.
      The bank would have reserves on the assets side of its balance sheet and each customer's
      deposits on the liabilities side. In this world the 'quantity of money' would consist
      of the amount of deposit accounts in the bank. Any payments made between customers would
      simply add and subtract the same amount on the the liability side of the bank's balance
      sheet. Reserves would never move.`,
      `But what if this bank were to allow overdrafts, in which negative accounts show up on
      the assets side of the bank's balance sheet. In this world, a customer with a negative
      account making a payment to a customer with a positive account would end up expanding both 
      sides of the bank's balance sheet. Likewise a customer with a positive account making a 
      payment to a customer with a negative account would end up contracting both sides of the
      balance sheet.`,
      `The use of bank credit as a means of payment thus involves a certain elasticity in the 
      quantity of money. This raises questions about how to properly measure the quantity of 
      money. There are three possibilities. 1: The sum of deposits held in positive accounts. 
      2: The sum of positive accounts subtracted by overdrafts. 3: All deposits, positive or
      negative.`,
    ],
    assignment: `Here are four customers belonging to the same bank. Make payments between customers
    with both positive and negative accounts and see which transactions expand or contract the 
    balance sheet. How many types of transactions exist in this system?`,
  },
  step3: {
    lectureTitle: `Clearing House`,
    title: `Multiple Banks`,
    paragraphs: [
      `In reality there isn't just one bank but many banks. If a customer from Bank 1 pays a
      customer from Bank 2, the liabilities of Bank 1 decreases but the liabilities of Bank2 
      increases. However Bank 2 has not received any cash in return for this increase in its
      deposit liabilities; Bank 2 is in effect owed money by Bank 1. This raises the problem
      of how to settle payments between banks.`,
      `In America during the first half of the 19th century, a cheque received by one bank 
      would have the name of the bank from which the customer belonging to some other bank 
      had made a payment. These cheques would be tallied up at the end of the day or week 
      and then a bill demanding payment from that bank would be issued. Likewise, this same 
      bank will receive bills demanding payments to other banks from which customers from 
      this bank have made transfers to customers to those other banks. Each bank would have 
      a porter who would shift reserves from bank to bank, carrying the risk of making 
      mistakes in payments, honest or dishonest.`,
      `We introduce in this step 'dues'. These dues represent money owed to or from a bank and 
      appear on both sides of a bank's balance sheet. They are not really any different to 
      deposits or overdrafts, representing payments the banks will make to eachother at a future
      date. When payments are settled these dues are wiped off the balance sheets and end up in
      each banks' reserves. In the next step we will look at an improved way of dealing with payments between banks.`,
    ],
    assignment: `Here we have a twos banks each with two customers, who have 50 dollars in their
    accounts. Make payments between customers and note how 'due tos' and 'due froms' get added to
    each bank's balance sheet. Note where this money goes once payments between banks have been
    settled.`,
  },
  step4: {
    lectureTitle: `Clearing House`,
    title: `Correspondent Banking`,
    paragraphs: [
      `Instead of transferring reserves for each order of payment, suppose that each day each
      bank collects “due tos” and “due froms” with respect to every other bank. 
      At the end of the day, each bank nets the payments to each other bank. If Bank 1 owes
      Bank 2 $50 and Bank 2 owes Bank 1 $50, the net will be zero. And if Bank 1 owes Bank 2
      $50 and Bank 2 owes Bank 1 $30, the net will be $20 owed to Bank 2.`,
      `Further, instead of settling these payments in gold or cash, each bank could simply 
      have an account with every other bank. These are called correspondent accounts, and 
      are in effect a swap of IOUs. Bank 1 owes deposits to Bank 2 and Bank 2 owes deposits
      to Bank 1. Now, if Bank 1 owes Bank 2, Bank 1 can pay Bank 2 by drawing on balances held 
      at Bank 2, or by increasing the balance held at Bank 1 to Bank 2’s credit. `,
      `Regarding settling payments via bank deposit accounts there are two options. Suppose Bank 1 owes Bank 2.
      Bank 1 can decrease Bank 2's liabilities to Bank 1, which would also decrease Bank 1's assets 
      from Bank 2. Alternatively Bank 1 can increase Bank 2's assets from Bank 1, which would also
      increase Bank 1's liabilities to Bank 2. In the first case total deposits fall (debiting) and 
      in the second case total deposits increase (crediting). Historically the bigger more central 
      bank will be credited by the smaller less central bank.`,
      `The invention of correspondent banking amounts to moving from a money payment
      system to a credit payment system between banks. Note that, since the correspondent system is a
      credit system, we are not constrained by the quantity of gold, only by the various bi-lateral credit
      limits. One can imagine an entire banking system using these book entries to clear bi-lateral net
      payments at the end of the day. But there is an even better way, which we will look at in
      the next step.
      `,
    ],
    assignment: `Assignment: There are two banks each with two customers who have made various transfers.
    One bank owes another bank. Net the payments and settle using corresponding accounts. Corresponding
    accounts contain "Bank Deposits".`,
  },
  step5: {
    lectureTitle: `Clearing House`,
    title: `The Clearing House`,
    paragraphs: [
      `The correspondent system of banking is a step forward from the older system of interbank
      payments, but it could be improved. Obviously it would advantageous 
      to devise a system where the bank only had to pay the net across all its correspondents, rather
      than pay bilaterally with every bank in the network. It would be easier if all the banks held 
      correspondent accounts with only one bank, and use those balances to clear all its payments.`,
      `In the mid nineteenth century, a group of banks of roughly the same stature set up the New York
      Clearing House Association, a bank who's reserves where made up of a subscription by every 
      member bank. Any payment due to or from one bank became a payment due to or from the Clearing
      House. These payments were made with "Clearing House Certificates" which were bank notes representing
      the dollar, in cash or gold. Each bank had a deposit account of Clearinghouse Certificates. 
      At the end of each day, all the banks would meet up at the Clearing House, net their due tos and due froms, 
      and if they were a debtor party, pay the Clearing House in certificates, or if they were the 
      creditor party, receive certificates from the Clearing House.`,
      `Because the money supply in this system is made up entirely of the deposit accounts of the 
      member banks, total due tos and due froms will always net to zero, and reserves will never 
      have to move. However this system can break if one member bank ends up systematically becoming a debtor
      and runs out of certificates in their account. Other members would be reluctant to extend an 
      overdraft to this debtor and the result would be the debtor bank defaulting and closing down. 
      To avoid this, the Clearing House set up a loan system which worked as an overdraft and will be 
      looked at in the next chapter.`,
    ],
    assignment: `Below are banks and customers who have done a day of trading and are now ready to net
    and settle dues with the clearinghouse. Net dues at the Clearing House and follow who owes who. 
    Then settle dues and see what happens to the banks' certificate accounts.`,
  },
  step6: {
    lectureTitle: `Clearing House`,
    title: `Clearing House Loans`,
    paragraphs: [
      `As we have seen in the previous example, the Clearing House offers banks the ability to
    clear their accounts by netting all their claims from and to other banks and then settling
    them at the Clearing House. This is because the sum total of each banks' reserves are held
    at one big bank. If one bank is a net debtor, its debts are covered as the sum total can never
    go beyond that of the Clearing House.`,
      `However in times of stress, for example there is a drain of funds from outside of the Clearing 
    House system (a bank run, or a drain of funds abroad), the sum total needed by all member banks 
    will exceed the reserves of the Clearing House. In this situation the members can borrow from the 
    clearinghouse itself. The clearinghouse funds the loan by issuing a clearinghouse loan certificate, 
    on the back of collateral of any debtor bank. 
    Whereas the clearinghouse certificate is directly backed by gold, the clearinghouse loan certificate is backed by the loan instead.`,
      `Clearinghouse loan certificates are like banknotes, but they're being issued against member 
    loans rather than the special 2% government bonds. Before 1907, it wasn't clear that they were legal.
    Because a loan taken by a debtor bank accrued 6% interest, so did the Clearinghouse loan certificates. Sometimes, it was hard for the clearinghouse to get the loan certificates back because they paid so well.
    Note that the Clearing House does not offer overdrafts in the same way a bank offers overdrafts
    to its customers. The Clearing House needs to make sure any expansion of credit is collateralized, 
    by its member banks. However the Clearinghouse loan certificates acted very much in the same way as
    bank money, and in this sense they were a private money existing outside the remit of the state. This
    opens interesting debates about whether money is solely a creature of the state or not. Also note that
    in this example, debts dont really accumulate daily interest as time has not played a factor in this 
    lecture series so far. In module 2 of this series, time will play a very large role...`,
    ],
    assignment: `One bank has run debts that exceed the Clearing House reserves. Can you find out who? In this
    example, any money that would have previously been considered as part of a 'clearinghouse overdraft' has been allocated between
    member banks as Clearinghouse loan certificates`,
  },
  step7: {
    lectureTitle: `Clearing House`,
    title: `Playground`,
    paragraphs: [``],
  },
};