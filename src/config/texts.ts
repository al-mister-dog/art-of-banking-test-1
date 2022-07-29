export const fundamentals = {
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
      owe to someone else, which could also be money or a mortgage etc.
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

export const clearinghouse = {
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

export const centralbank = {
  step1: {
    lectureTitle: `The Fed`,
    title: `The Fed: Final Settlement`,
    paragraphs: [
      `The following lecture is under construction. Feel free to carry on reading it in its less
      than final form!`,
      `We have begun to understand how the banking system consists of many banks that try to act as
      if they were all part of one big bank. The reason behind this is that a healthy bank is a bank
      that can meet its daily requirements, and in order to facilitate this it is crucial that all
      other banks can meet their daily requirements. The Clearing House system was a step towards
      guaranteeing banks meet their daily requirements by creating a system in which all debts with 
      the Clearing House and not any individual bank. This system can be easily broken however because
      at the end of the day the Clearing House is liable to its members with a scarce resource.`,
      `The Federal Reserve however has the legal right to create its own liabilities, which means
      theoretically it can not run out of money. This greatly eases the facilitation of the nationwide
      interbank payment system. However, this is not to say discipline does not play a factor. 
      The Fed does not simply give away money for free. Banks can run overdrafts with the Fed but this
      comes with consequences such as fees etc. To avoid overdrafts at the Fed, a bank will go to
      the Fed Funds Market in search of loans to allow that bank to carry on with its day to day 
      activities.`,
      `The Fed Funds Market consists of loans and payments made to and from all the other banks in the federal 
      banking system. These loans are reserves and involve promises to pay in return yet more Fed Funds reserves. 
      The entire Fed Funds Market is effectively an expansion of credit based on the existing money
      that is on the balance sheet of the Fed. It is important now to follow the money from balance
      sheet to balance sheet as we explore further how exactly banking works.`,
    ],
    assignment: `Sources: Marcia Stigum - Stigum's Money Market, The Federal Funds Market since the Financial Crisis - Ben Craig`,
  },

  step2: {
    lectureTitle: `The Fed`,
    title: `Daylight Overdrafts`,
    paragraphs: [
      `It is worth being reminding once more that in the federal reserve system, that money transfers
      happen between the banks and the Fed, and not between the banks themselves. Lets say a customer
      from Bank A transfers money to a customer of Bank B. Bank B does not need to know whether this
      payment caused Bank A to go into their overdraft. Bank B is happy because their money came
      directly from the Fed.`,
      `In todays banking world, the majority of bank reserves in America are deposit accounts 
      at the Fed. The survival constraint says that cash inflows must be at least as large as cash outflows.
      For a bank, this constraint involves settling with the Fed by the end of the day (having a non-negative balance).
      However to avoid stifling banks from being able to make payments, the Fed allows an overdraft in the day.
      This allows to smooth out payments between banks without bouncing checks etc. At the end
      of the day this overdraft must be paid back, otherwise the Fed charges an extra fee (usually
      100 basis points over the interest rate).
      `,
      `To avoid this, banks will try to get loans from other banks to pay off their overdrafts.
      In order for a bank to lend to another bank, the lender bank must have an excess of reserves in 
      their own account. These loans still accrue interest, but they are below the interest rate, 
      (otherwise known as the Fed Funds Rate). This is beneficial for both banks, as the borrower bank is able to settle their accounts without
      incurring overdraft fees, and the lender bank has used idle reserves in order to make a profit by 
      lending them out.`,
    ],
    assignment: `Bank 1 has gone into its daylight overdraft with the Fed. Find a bank with an excess
    reserve position and get a loan in order to settle.`,
  },
  step3: {
    lectureTitle: `Fed Funds`,
    title: `The Fed Funds Market`,
    paragraphs: [
      `We have seen how a bank that has gone into its daylight overdraft with the Fed can 
      get a loan from another bank in order to settle this overdraft. But what does this loan
      consist of?`,
      `A bank that looks for loans in the Federal Reserve system goes into the 'Fed Funds Market'
      to do so. In this market are other banks looking to loan out reserves or looking to borrow 
      reserves. These reserves are accepted as payment to settle overdrafts with the Fed. They can
      be used as payment 'right now'. When Bank B lends to Bank A, Bank B is lending reserves. However,
      the loan that appears on Bank B's assets and Bank A's liabilities is called 'Fed Funds'. Fed
      Funds are credit, money that Bank A promises to pay the next day. Fed Funds is the money with
      which banks settle payments with other banks. They are not the liability or the asset of the 
      Fed.
      `,
      `In the previous example we saw that Bank 1 went into its daylight overdraft in order to make a payment.
      Then Bank 1 took out a loan with another bank to pay it off. In the credit chart you may have noticed
      that the credit at the Fed expanded when the bank went into its overdraft, and then the credit
      contracted when the bank took a loan to pay it off. However the credit between the lender and 
      loanee bank remained. This is called the expansion of private credit. Private credit allows banks
      flexibility in investments and payments, but private credit can sometimes expand so high that
      a financial crisis or even a crash may follow. `,
      `The Fed tries to anticipate and adjust for this using the Fed Funds Rate (in the UK the equivelent
        is the interest rate or bank rate). The federal funds rate 
      is the interest rate that banks charge each other to borrow or lend excess reserves overnight. 
      This rate is set by the Federal Open Market Committee (FOMC) and is adjusted to either encourage
      or discourage lending. The rate may be increased if the Fed wish to see less banks making risky
      investments. If the Fed Funds Rate is high then a bank may think twice about doing that 
      requires them to take a loan with another bank, as the interest on that loan will be much higher.
      Conversely the rate may be decreased during recessions to allow banks the freedom to make more
      investments and payments in order to kick start the economy.`
    ],
    assignment: `Get banks to take out loans, get into overdrafts and settle payments. This may need
    to be preceeded by customer transfers. Also increase or decrease the Fed Funds Rate. Would you 
    take a loan out if that was the rate?`,
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
};
