

// don't go less than zero, factor last payment to bring to zero
// fix chart over 36 months display years
// check math

document.getElementById("monthly").addEventListener("change", getYearly);
document.getElementById("yearly").addEventListener("change", getMonthly);
document.getElementById("loanAmount").addEventListener("blur", formatAmount);
document.getElementById("loanAmount").addEventListener("change", formatAmount);
document.getElementById("btnSubmit").addEventListener("click", getValues);
document.getElementById("btnReset").addEventListener("click", reset);

// set numbers to currancy format
let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function reset(){
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  })
  window.location.reload();
};

function getMonthly() {
  let monthly = document.getElementById("monthly");
  let yearly = document.getElementById("yearly");
  yearly.focus();
  monthly.value = yearly.value * 12;
}

function getYearly() {
  let monthly = document.getElementById("monthly");
  let yearly = document.getElementById("yearly");
  monthly.focus();
  yearly.value = (monthly.value / 12).toFixed(2);
}

function formatAmount() {
  let fSpan = document.getElementById("fAmount");
  fSpan.focus();
  let amountInput = document.getElementById("loanAmount");
  let fAmount = parseFloat(amountInput.value).toLocaleString("en-US");
  fSpan.innerHTML = "($" + fAmount + ")";
}

function getValues() {
  let valuesObj = {};
  let loanAmount = document.getElementById("loanAmount").value;
  let payments = document.getElementById("monthly").value;
  let rate = document.getElementById("rate").value;
  let extraPayment = document.getElementById("extraPayment").value;

  // validate user input
  document.querySelectorAll("input").forEach((input) => {
    switch(input.id){
      case "extraPayment":
        if(extraPayment == "" || extraPayment < 0){extraPayment = 0; document.getElementById("extraPayment").value = 0;}
        break;
      default:
        if (input.value < 1 || Math.sign(input.value) === -1) {
          alert( 'Please enter a valid number in the "' + input.getAttribute("aria-label") + '" field');
        }
        break;
    }
  });

  // Change the values of the number fields to integers.
  valuesObj.loanAmount = Math.round(parseInt(loanAmount));
  valuesObj.payments = Math.round(parseInt(payments));
  valuesObj.rate = Math.round(parseInt(rate));
  valuesObj.extraPayment = Math.round(parseInt(extraPayment));

  let results = generateResults(valuesObj);

  displayResults(results);
}

function generateResults(valuesObj) {
  let results = [];
  let mPay =(valuesObj.loanAmount * (valuesObj.rate / 1200)) /(1 - Math.pow(1 + valuesObj.rate / 1200, -valuesObj.payments));
  let previousBalance = valuesObj.loanAmount;
  let rate = valuesObj.rate;
  let payments = valuesObj.payments;
  let monthlyPayment = mPay;
  let extraPayment = valuesObj.extraPayment;

  for (let i = 1; i <= payments; i++) {
    let intPayment = (previousBalance * rate) / 1200;
    let princPayment = monthlyPayment - intPayment;
    let remBalance = Math.abs(previousBalance - princPayment - extraPayment);

    results.push({
      month: i,
      monthlyPayment: mPay,
      interestPayment: intPayment,
      principalPayment: princPayment,
      remainingBalance: remBalance,
    });

    previousBalance = remBalance;
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

  let chartData = {
    balanceData: [],
    monthData: []
  };


// test for 36 months +
// you have to do every 12th for the rembalance as well
// if(results.length > 36){
//     for (let i = 0; i <= results.length; i++) {
//         if(i % 12 === 0){
//           chartData.monthData.push(i);
//         }
//     }
//       console.log(chartData.monthData);
//   }else{
//     for (let i = 0; i <= results.length; i++) {
//       chartData.monthData.push(i);
//     }



  for (let i = 0; i <= results.length - 1; i++) {
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

    // format numbers
    monPayment = USDollar.format(monthlyPayment);
    princPayment = USDollar.format(principalPayment);
    intPayment = USDollar.format(interestPayment);
    accruedInt = USDollar.format(accruedInterest);
    remBalance = USDollar.format(remainingBalance);


    chartData.balanceData.push(remBalance);
    // chartData.monthData.push(month);

    templateRows =
      templateRows +
      `<tr>
      <td class="ps-4">${month}</td>
      <td class="text-end">${monPayment}</td>
      <td class="text-end">${princPayment}</td>
      <td class="text-end">${intPayment}</td>
      <td class="text-end">${accruedInt}</td>
      <td class="text-end">${remBalance}</td>
    </tr>`;
  }

  document.getElementById("results").innerHTML = templateRows;

  // this is for the header, not the table
  let monthlyPaymentTag = document.getElementById("monthlyPayment");
  let mPayment = results[0].monthlyPayment.toFixed(2);
  monthlyPaymentTag.innerHTML = USDollar.format(mPayment);

  let totalPrincipalTag = document.getElementById("totalPrincipal");
  let loanAmount = document.getElementById("loanAmount").value;
  let lAmount =  USDollar.format(loanAmount);
  totalPrincipalTag.innerHTML =lAmount;

  let totalInterestTag = document.getElementById("totalInterest");
  let tInterest =  USDollar.format(totalInterest);
  totalInterestTag.innerHTML = tInterest;

  let totalCostTag = document.getElementById("totalCost");
  let tCost = USDollar.format(totalCost);
  totalCostTag.innerHTML = tCost;

  // see the code link
  let codeLink = document.getElementById("codeLink");
  codeLink.innerHTML = '<a href="code.html">See The Code</a>';

  // displayChart(chartData);
}
