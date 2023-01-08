
// validate user form inputs
// set numbers to comma 1,000
// extra payment field
// down payment field?
// tax, insurance, hoa, mortgage ins,
// you payed this much extra

document.getElementById("monthly").addEventListener("change", getYearly);
document.getElementById("yearly").addEventListener("change", getMonthly);
document.getElementById("btnSubmit").addEventListener("click", getValues);

function getMonthly(){
  let monthly = document.getElementById("monthly");
  let yearly = document.getElementById("yearly");
  yearly.focus();
  monthly.value = yearly.value * 12;
}

function getYearly(){
  let monthly = document.getElementById("monthly");
  let yearly = document.getElementById("yearly");
  monthly.focus();
  yearly.value = (monthly.value / 12).toFixed(2);
}

function getValues() {
  let valuesObj = {};
  let loanAmount = document.getElementById("loanAmount").value;
  let payments = document.getElementById("monthly").value;
  let rate = document.getElementById("rate").value;

  // validate user input
  document.querySelectorAll('input').forEach( input => {
    if((input.value < 1) || Math.sign(input.value) === -1){
      iName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
      alert('Please enter a valid number in the "' + iName + '" field');
      return;
    }
  });

  // Change the values of the number fields to integers.
  valuesObj.loanAmount = Math.round(parseInt(loanAmount));
  valuesObj.payments = Math.round(parseInt(payments));
  valuesObj.rate = Math.round(parseInt(rate));

  let results = generateResults(valuesObj);
console.log(valuesObj);
  displayResults(results);
}


function generateResults(valuesObj) {
  let results = [];
  let mPay = (valuesObj.loanAmount) * (valuesObj.rate / 1200) / (1 - Math.pow((1 + valuesObj.rate / 1200), -valuesObj.payments));
  let previousBalance = valuesObj.loanAmount;
  let rate = valuesObj.rate;
  let payments = valuesObj.payments;
  let monthlyPayment = mPay;
  
  for(let i = 1; i <= payments; i++){
    let intPayment = previousBalance * rate/1200;
    let princPayment = monthlyPayment - intPayment;
    let remBalance = previousBalance - princPayment;

    results.push({
      month: i,
      monthlyPayment: mPay,
      interestPayment: intPayment,
      principalPayment: princPayment,
      remainingBalance: remBalance,
    });

    previousBalance = remBalance
  }
  return results;
}



function displayResults(results) {
  let templateRows = "";

  let accInterest = 0;
  let accruedInterest = 0;
  let ttlInterest = 0;
  let totalInterest = 0;
  let ttlCost = 0;
  let totalCost = 0;

  for (let i = 0; i <= results.length-1; i++) {
    let month = results[i].month;
    let monthlyPayment = results[i].monthlyPayment.toFixed(2);
    let interestPayment = results[i].interestPayment.toFixed(2);
    let principalPayment = results[i].principalPayment.toFixed(2);
    let remainingBalance = results[i].remainingBalance.toFixed(2);

    accInterest += +interestPayment;
    accruedInterest = accInterest.toFixed(2);

    ttlInterest += +interestPayment;
    totalInterest = ttlInterest.toFixed(2);

    ttlCost += +monthlyPayment;
    totalCost = ttlCost.toFixed(2);

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
  monthlyPaymentTag.innerHTML = results[0].monthlyPayment.toFixed(2);

  let totalPrincipalTag = document.getElementById("totalPrincipal");
  let loanAmount = document.getElementById("loanAmount").value;
  totalPrincipalTag.innerHTML = loanAmount;

  let totalInterestTag = document.getElementById("totalInterest");
  totalInterestTag.innerHTML = totalInterest;

  let totalCostTag = document.getElementById("totalCost");
  totalCostTag.innerHTML = totalCost;

  // see the code link
  let codeLink = document.getElementById("codeLink");
  codeLink.innerHTML = '<a href="code.html">See The Code</a>'
}
