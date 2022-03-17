// -----------------------------------  theme toggle  ------------------------------------ //

let theme1Area = document.querySelector(".theme-1-area");
let theme2Area = document.querySelector(".theme-2-area");
let theme3Area = document.querySelector(".theme-3-area");
let theme_1 = document.getElementById("theme-1");
let theme_2 = document.getElementById("theme-2");
let theme_3 = document.getElementById("theme-3");
let themeBtn = document.querySelector(".theme-btn");


// -----------------  theme 1  --------------------- //
theme1Area.addEventListener("click", theme1Func);
theme_1.addEventListener("click", theme1Func);

function theme1Func(){
  themeBtn.classList.add("theme-btn-1");
  themeBtn.classList.remove("theme-btn-2", "theme-btn-3");
  document.body.setAttribute('data-theme', 'theme-1') 
}

// ------------------  theme 2  --------------------- //
theme2Area.addEventListener("click", theme2Func);
theme_2.addEventListener("click", theme2Func);

function theme2Func(){
  themeBtn.classList.add("theme-btn-2");
  themeBtn.classList.remove("theme-btn-1", "theme-btn-3");
  document.body.setAttribute('data-theme', 'theme-2') 
}

// --------------------  theme 3  --------------------- ///
theme3Area.addEventListener("click", theme3Func);
theme_3.addEventListener("click", theme3Func);

function theme3Func(){
  themeBtn.classList.add("theme-btn-3");
  themeBtn.classList.remove("theme-btn-1", "theme-btn-2");
  document.body.setAttribute('data-theme', 'theme-3') 
}


// ------------------------------  calculator  ------------------------------- //

let numberBtn = document.querySelectorAll(".number-btn");
let decimalBtn = document.querySelector('.decimal-btn');
let operatorBtn = document.querySelectorAll(".operand-btn");
let resultBtn = document.querySelector(".result-btn");
let deleteBtn = document.querySelector(".delete-btn");
let resetBtn = document.querySelector(".reset-btn");

let prevOperand = document.querySelector(".previous-operand-screen");
let currentOperand = document.querySelector(".current-operand-screen");


// ---------------------- number btn ---------------------- //

numberBtn.forEach(number => {
  number.addEventListener("click", (e) => {
    if (currentOperand.innerText == "0"){
      currentOperand.innerText = "";
    }
    currentOperand.innerText += number.innerText;
  })
})


// ------------------- decimal btn -------------------- //

decimalBtn.addEventListener('click', () => {
  if (currentOperand.innerText.includes('.')) return;
  currentOperand.innerText += decimalBtn.innerText;
})

// ----------------------- operator btn ----------------------- //

operatorBtn.forEach(operator => {
  operator.addEventListener('click', () => {
    if (currentOperand.innerText == '0') return;

    // currentOperand.innerText += operator.innerText;
    prevOperand.innerText += currentOperand.innerText + " " + operator.innerText;
    currentOperand.innerText ="0";
  })
})


// ------------------------------  delete btn  ---------------------------  //

deleteBtn.addEventListener("click", () => {
  currentOperand.innerText = currentOperand.innerText.slice(0, -1);
  if (currentOperand.innerText == "") {
    currentOperand.innerText = "0";
  }
  if (currentOperand.innerText == "0") {
    prevOperand.innerText = prevOperand.innerText.slice(0, -1);
  }
})

// --------------------------  reset btn  -------------------------- //

resetBtn.addEventListener("click", () => {
  prevOperand.innerText = "";
  currentOperand.innerText = "0";
})


// --------------------------  calculating the result  ------------------------- //

resultBtn.addEventListener('click', resultFun);


function resultFun(){
  if (prevOperand.innerText == '' || currentOperand.innerText == 0) {
    return;
  };

  let prev = prevOperand.innerText;
  let current = currentOperand.innerText;
  let x = prev + current
  let result = eval(x);

  prevOperand.innerText = "";  
  if (result % 1 !== 0) {
    currentOperand.innerText = result.toFixed(3);
  } else {
    currentOperand.innerText = result;
  }
}


// ---------------- controlling with keyboard ---------------- //

window.addEventListener('keydown', e => {
  
  // numbers key
  if (currentOperand.innerText == '0') {
    currentOperand.innerText = "";
  }
  if ((e.keyCode <=57 && e.keyCode >= 48) || (e.keyCode <= 105 && e.keyCode >= 97)) {
    currentOperand.innerText += e.key;
  }
  if (e.keyCode == 190 || e.keyCode == 110) {
    if (currentOperand.innerText == ''){
      currentOperand.innerText = '0' + '.';
    }
    if (currentOperand.innerText.includes('.')) return;
    currentOperand.innerText += '.'
  }

  // operators
  if (e.keyCode == 106 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 111 || e.key == '+' || e.keyCode == 189 || e.keyCode == 191 || e.keyCode == 88) {
      if (currentOperand.innerText == 0) {
        currentOperand.innerText = '0';
        return;
      }
          
      if (e.keyCode == 189) {
        prevOperand.innerText += currentOperand.innerText + " " + '-' + "";
        currentOperand.innerText = "0";
      } else if (e.keyCode == 88) {
        prevOperand.innerText += currentOperand.innerText + " " + '*' + "";
        currentOperand.innerText = "0";
      } else {  
        prevOperand.innerText += currentOperand.innerText + " " + e.key + "";
        currentOperand.innerText = "0";
      }
  }

  // delete btn
  if (e.keyCode == 8) {
    currentOperand.innerText = currentOperand.innerText.slice(0, -1);
    if (currentOperand.innerText == "") {
      currentOperand.innerText = "0";
    }
    if (currentOperand.innerText == "0") {
      prevOperand.innerText = prevOperand.innerText.slice(0, -1);
    }
  }

  // result
  if (e.keyCode == 13) {
    if (currentOperand.innerText == 0) {
      currentOperand.innerText = '0';
      return;
    }
    resultFun();
  }

  // reset
  if (e.keyCode == 46 && e.shiftKey) {
    prevOperand.innerText = '';
    currentOperand.innerText = '0';
  }
});


// --------- pop-up -------- //
const popUp = document.querySelector('.pop-up');

window.onload = (() => {
  setTimeout (() => {
    popUp.classList.add('active')
  }, 2000);
  setTimeout(() => {
    popUp.classList.remove('active');
  }, 8500);
})