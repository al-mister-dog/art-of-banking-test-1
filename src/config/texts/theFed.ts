export const theFedText = {
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
    lectureTitle: `The Fed`,
    title: `Funding a Mortgage`,
    paragraphs: [
      `The funding of a mortgage loan involves banks going into the Fed Funds market to fund 
      its customers purchasing properties. Imagine I want to buy a house from you. I will do this
      by getting a mortgage loan from my bank (Citibank). We swap IOUs; Citibank promises deposits
      to make my purchase and I promise to pay a mortgage loan to Citibank after x number of years.
      Then I use these deposits to transfer the money to you in return for the deeds of your property.`,
      `Behind the scenes there is a lot going on. As we have seen in previous lessons, transfers 
      between customers of different banks involves those banks oweing each other money. Citibank 
      may not have enough deposits to cover your transfer. In this case Citibank will need to require a Fed
      Funds loan from another bank (let say HSBC). Once the reserves are in Citibank's account,
      I can go ahead and transfer the money to your bank account (you bank at Chase). This will all
      happen super quickly and under watchful eyes (I wouldn't just be able to cash out the mortgage
      loan and skip the country).`,
      `Now lets imagine at the beginning of the day that HSBC did not have the reserves to make a 
      loan to Citibank. Then it could aqquire reserves by taking a loan out from Chase. Strange as it
      sounds, in this scenario, my bank could have funded its payment to your bank with your own
      banks reserves! Such is the alchemy of banking.`,
      `One other thing to take note of is the role that HSBC has taken in this transaction. HSBC has
      become a facilitator of a transaction between two other banks. HSBC is buying and selling money
      in order to facilitate this payment. This role is called the Dealer Function, with HSBC being
      the Dealer between two banks. We will look more closeley at the Dealer Function in the next lesson.
      `,
    ],
    assignment: `Assignment: I have just taken out a mortgage loan to pay you for a house. Make sure 
    my bank (Citibank) has enough funds to cover this transaction, by taking a loan out with HSBC, and get me
    to transfer funds to your bank account (with Chase). For extra credit, you could start the transaction by getting HSBC to 
    acquire funds from Chase before lending to Citibank. For extra extra credit, can you find a way
    of contracting the credit after the transfer has been completed? Hint: its down to you...`,
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
    title: `Sand Box`,
    paragraphs: [
      ``,
    ],
    assignment: `Below are banks and customers who have done a day of trading and are now ready to net
    and settle dues with the clearinghouse. Net dues at the Clearing House and follow who owes who. 
    Then settle dues and see what happens to the banks' certificate accounts.`,
  },
};
