

document.getElementById("btnSubmit").addEventListener("click", getValues);

function getValues() {

  let valuesObj = {};
  let loanAmount = document.getElementById("loanAmount").value;
  let payments = document.getElementById("payments").value;
  let rate = document.getElementById("rate").value;

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
  let monthlyPayment = mPay;
  let loanAmount = valuesObj.loanAmount;
  
  for(let i = 1; i <= payments; i++){
    let intPayment = previousBalance * rate/1200;
    let princPayment = monthlyPayment - intPayment;
    let remBalance = previousBalance - princPayment;

    results.push({
      month: i,
      monthlyPayment: mPay.toFixed(2),
      interestPayment: intPayment.toFixed(2),
      principalPayment: princPayment.toFixed(2),
      remainingBalance: remBalance.toFixed(2),
    });

    previousBalance = remBalance
  }
  // results.push({loanAmount: loanAmount});
  return results;
}



function displayResults(results) {
  let templateRows = "";

  let accInterest = 0;
  let totalInterest = 0;
  let totalCost = 0;

  for (let i = 0; i <= results.length-1; i++) {
    let month = results[i].month;
    let monthlyPayment = results[i].monthlyPayment;
    let interestPayment = results[i].interestPayment;
    let principalPayment = results[i].principalPayment;
    let remainingBalance = results[i].remainingBalance;
    accInterest += +interestPayment;
    accruedInterest = accInterest.toFixed(2);
    totalInterest += parseFloat(interestPayment);
    totalCost += parseFloat(monthlyPayment);

  templateRows = templateRows + 
  `<tr>
    <td>${month}</td>
    <td>${monthlyPayment}</td>
    <td>${principalPayment}</td>
    <td>${interestPayment}</td>
    <td>${accruedInterest}</td>
    <td>${remainingBalance}</td>
  </tr>`;
  }

  document.getElementById("results").innerHTML = templateRows;

  // this is for the header, not the table
  let monthlyPaymentTag = document.getElementById("monthlyPayment");
  monthlyPaymentTag.innerHTML = results[0].monthlyPayment;

  let totalPrincipalTag = document.getElementById("totalPrincipal");
  let loanAmount = document.getElementById("loanAmount").value;
  totalPrincipalTag.innerHTML = loanAmount;

  let totalInterestTag = document.getElementById("totalInterest");
  totalInterestTag.innerHTML = totalInterest.toFixed(2);

  let totalCostTag = document.getElementById("totalCost");
  totalCostTag.innerHTML = totalCost.toFixed(2);

  // see the code link
  let codeLink = document.getElementById("codeLink");
  codeLink.innerHTML = '<a href="code.html">See The Code</a>'
}
