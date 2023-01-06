

document.getElementById("btnSubmit").addEventListener("click", getValues);

function getValues() {

  let valuesObj = {};
  let loanAmount = document.getElementById("loanAmount").value;
  let payments = document.getElementById("payments").value;
  let rate = document.getElementById("rate").value;

  // Html elements
  valuesObj.totalPrincipalTag = document.getElementById("totalPrincipal");
  valuesObj.totalInterestTag = document.getElementById("totalInterest");
  valuesObj.totalCostTag = document.getElementById("totalCost");

  // Change the values of the number fields to integers.
  valuesObj.loanAmount = Math.round(parseInt(loanAmount));
  valuesObj.payments = Math.round(parseInt(payments));
  valuesObj.rate = Math.round(parseInt(rate));

  let results = generateResults(valuesObj);

  displayResults(results);
}


function generateResults(valuesObj) {
  let results = [];
  let mPay = (valuesObj.loanAmount) * (valuesObj.rate / 1200) / (1 - Math.pow((1 + valuesObj.rate / 1200), -valuesObj.payments));
  let previousBalance = valuesObj.loanAmount;
  let rate = valuesObj.rate;
  let payments = valuesObj.payments;
  let monthlyPayment = valuesObj.monthlyPayment;

  for(let i = 1; i <= payments; i++){
    let intPayment = previousBalance * rate/1200;
    let princPayment = monthlyPayment - intPayment;
    let remBalance = previousBalance - princPayment;

    // interestPayment: loanAmount or balance[i - 1] * rate/1200,

    // if(i = 1){
    //   previousBalance = valuesObj.loanAmount;
    // } else {
    //   previousBalance = previousBalance + 1;
    // }


    results.push({
      month: i,
      monthlyPayment: mPay.toFixed(2),
      interestPayment: intPayment.toFixed(2),
      principalPayment: princPayment.toFixed(2),
      remainingBalance: remBalance.toFixed(2)
    });
    // decrement princpayment or previousbalance?
    // previousBalance = remBalance


    //previous balance = 100
    // interest payment = 100 * 1%/1200
    // principal payment = 12.23 - (100 * 1%/1200)
    // remaining balance = 100 - (12.23 - (100 * 1%/1200))
    // previous balance reset to equals remaining balance = 100 - (12.23 - (100 * 1%/1200))

    // set nex remaining balance here? =  Previous Remaining Balance - principal payments;

    // valuesObj['month'] = i;
    // valuesObj['monthlyPayment'] = (valuesObj.loanAmount) * (valuesObj.rate / 1200) / (1 - Math.pow((1 + valuesObj.rate / 1200), -valuesObj.payments))
    // results.push(valuesObj);
   
    // valuesObj.interestPayment =  Previous Remaining Balance * rate/1200;
    // valuesObj.principal =  valuesObj.monthlyPayment - Interest Payment;
    // valuesObj.accruedInterest = last month interest + this months;
    // valuesObj.remainingBalance =  Previous Remaining Balance - principal payments;
  }

  return results;
}



function displayResults(results) {
  let templateRows = "";


  for (let i = 0; i <= results.length-1; i++) {
    let month = results[i].month;
    let monthlyPayment = results[i].monthlyPayment;
    let interestPayment = results[i].interestPayment;
    let principalPayment = results[i].principalPayment;
    let remainingBalance = results[i].remainingBalance;


  templateRows = templateRows + 
  `<tr>
    <td>${month}</td>
    <td>${monthlyPayment}</td>
    <td>${principalPayment}</td>
    <td>${interestPayment}</td>
    <td>xx</td>
    <td>${remainingBalance}</td>
  </tr>`;
  }

  document.getElementById("results").innerHTML = templateRows;

  // this is for the header, not the table
  monthlyPaymentTag = document.getElementById("monthlyPayment");
  monthlyPaymentTag.innerHTML = results[0].monthlyPayment;

  // see the code link
  let codeLink = document.getElementById("codeLink");
  codeLink.innerHTML = '<a href="code.html">See The Code</a>'
}
