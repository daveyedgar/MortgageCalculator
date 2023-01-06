

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

  for(let i = 1; i <= valuesObj.payments; i++){

    // interestPayment: loanAmount or balance[i - 1] * rate/1200,
    // if(i = 1){
    //   previousBalance = valuesObj.loanAmount;
    // } else {
    //   previousBalance = previousBalance[i - 1];
    // }


    results.push({
      month: i,
      monthlyPayment: mPay.toFixed(2),
      interestPayment: previousBalance
      
    });
    // valuesObj['month'] = i;
    // valuesObj['monthlyPayment'] = (valuesObj.loanAmount) * (valuesObj.rate / 1200) / (1 - Math.pow((1 + valuesObj.rate / 1200), -valuesObj.payments))
    // results.push(valuesObj);
   
    // valuesObj.interestPayment =  Previous Remaining Balance * rate/1200;
    // valuesObj.principal =  valuesObj.monthlyPayment - Interest Payment;
    // valuesObj.accruedInterest = last month interest + this months;
    // valuesObj.remainingBalance =  Previous Remaining Balance - principal payments;
  }
  console.log(results);
  return results;
}



function displayResults(results) {
  let templateRows = "";


  for (let i = 0; i <= results.length-1; i++) {
    let month = results[i].month;
    let monthlyPayment = results[i].monthlyPayment;
    let interestPayment = results[i].interestPayment;


  templateRows = templateRows + 
  `<tr>
    <td>${month}</td>
    <td>${monthlyPayment}</td>
    <td>xx</td>
    <td>${interestPayment}</td>
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
