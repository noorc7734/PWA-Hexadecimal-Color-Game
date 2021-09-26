let colorSample = null; // the color sample element
let answers = []; // array of answer elements
let correctColorCode = null; // color code of actual color sample
let score = 0; // number of correct answers
let total = 0; // total number of questions

//load the service worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
} 

//intialize page
window.onload = function() {
  colorSample = document.getElementById("colorSample");

  //initialize array of elements with all posible answers
  answers.push(document.getElementById("a"));
  answers.push(document.getElementById("b"));
  answers.push(document.getElementById("c"));
  answers.push(document.getElementById("d"));
  answers.push(document.getElementById("e"));
  answers.push(document.getElementById("f"));
  answers.push(document.getElementById("g"));
  answers.push(document.getElementById("h"));

document.getElementById("d").addEventListener('click', function() {
      markIt(this);
    });
  // add onclick events to all possible answers
  for (let i=0; i < answers.length; i++) {
    answers[i].addEventListener('click', function() {
      markIt(this);
    });
  }
  // Load a new question
  loadNewQuestion();
};



function levelOne() {
  document.getElementById("a").style.visibility ="visible";
  document.getElementById("b").style.visibility ="visible";
  document.getElementById("c").style.visibility ="hidden";
  document.getElementById("d").style.visibility ="hidden";
  document.getElementById("e").style.visibility ="hidden";
  document.getElementById("f").style.visibility ="hidden";
  document.getElementById("g").style.visibility ="hidden";
  document.getElementById("h").style.visibility ="hidden"; 
}

function levelTwo() {
  document.getElementById("a").style.visibility ="visible";
  document.getElementById("b").style.visibility ="visible";
  document.getElementById("c").style.visibility ="visible";
  document.getElementById("d").style.visibility ="visible";
  document.getElementById("e").style.visibility ="hidden";
  document.getElementById("f").style.visibility ="hidden";
  document.getElementById("g").style.visibility ="hidden";
  document.getElementById("h").style.visibility ="hidden"; 
}

function levelThree() {
  document.getElementById("a").style.visibility ="visible";
  document.getElementById("b").style.visibility ="visible";
  document.getElementById("c").style.visibility ="visible";
  document.getElementById("d").style.visibility ="visible";
  document.getElementById("e").style.visibility ="visible";
  document.getElementById("f").style.visibility ="visible";
  document.getElementById("g").style.visibility ="visible";
  document.getElementById("h").style.visibility ="visible";
}



// Load a new question
function loadNewQuestion() {
  //set color of colorsample
  let colorCode = getRandomHexCode();
  colorSample.innerHTML = "";
  colorSample.style.backgroundColor = colorCode;

  // pick a random Location for correct answer
  let solution = Math.floor(Math.random() * 2);
  for (let i = 0; i < answers.length; i++) {
    if (i == solution) {
      answers[i].innerHTML = colorCode;
    } else {
      answers[i].innerHTML = getRandomHexCode();
    }
  }

  //store correct answer to this question
  correctColorCode = colorCode;
  
  
  
  // check for last question
     let message = "";
     if (total == 10) {
         message = "GAME OVER! <br> Your final score is " +  score + " / 10. <br> Click anywhere to retry.";
         // show the lightbox with feedback
        document.getElementById("lightbox").style.visibility ="visible";
       document.getElementById("lightbox").style.zIndex = "2";
        document.getElementById("message").innerHTML = message; 
        total = 0;
     }
  
function refreshPage(){
    window.location.reload();
}
  
  
} //LoadNewQuestion

//create random hex code
function getRandomHexCode() {
  let result = []; //final code
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];
  result.push("#");

  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join(''); // #rrggbb
} // getRandomhexCode



// marks current question
function markIt(elem) {
  let gotItRight = false;
    total++;
  console.log("Comparing " + elem.innerHTML + " to " + correctColorCode);

  // record if it is correct
  if (elem.innerHTML == correctColorCode) {
    score++;
    gotItRight = true;
  }

  document.getElementById('score').innerHTML = score + "/ 10";

  
  window.setTimeout(function() {
    if (gotItRight) {
      colorSample.innerHTML = "Correct!"
    } else {
      colorSample.innerHTML = "Incorrect!"
    }    
  }, 100);

  window.setTimeout(function () {
    loadNewQuestion();
  }, 1300);
  
} //markIt

