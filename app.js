const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
  Gyümölcsök: ["Alma","Banán","Mandarin","Ananász","Görögdinnye","Vérnarancs","Sárgabarack","Avokádó","Sárkánygyümölcs","Paradicsom","Durián", "Grapefruit","Szilva","Fügekaktusz","Csipkebogyó","Vörösáfonya","Maracuja","Mangusztán","Rambután",],
  Állatok: ["Sündisznó", "Rinocérosz", "Mókus", "Oroszlán", "Zebra", "Albatrosz","Aligátor","Elefánt","Éticsiga","Jaguár","	Jegesmedve","Jávorszarvas","Nyílméregbéka","Poszméh","Tapír","Tengerimalac","Tukán","Túzok","Tücsök","Sakál","Dámszarvas","Dingo","Díszfácán",		"Disznó","Dongó","Dögkeselyű",],
  Országok: ["India","Ciprus","Ausztria","Andorra","Zimbabwe","Chile", "Afganisztán", "Albánia","Barbados",
  "Belgium","Bhután","Brunei","Bolívia","Botswana","Amerikai Egyesült Államok","Üzbegisztán","Ukrajna","Uruguay", "Szenegál","Szerbia","Szingapúr","Spanyolország","Svédország","Románia","Peru","Portugália", "Olaszország",
  "Omán","Oroszország","Németország","Kazahsztán","Jamaica",
  "Japán","Írország","Izland","Izrael","Hollandia","Honduras","Horvátország","Ghána","Görögország","Finnország","Franciaország","Egyiptom",
  "Elefántcsontpart","Csád","Csehország"]
};

let winCount = 0;
let count = 0;

let chosenWord = "";

//Választási lehetőségek
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Válasszon egy opciót!</h3>`;
  let buttonCon = document.createElement("div");
  const  letters = "AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
  
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });
  
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
  
    let optionArray = options[optionValue];
  
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
  
    let displayItem = "";
  
    for (let i = 0; i < chosenWord.length; i++) {
      displayItem += chosenWord[i] === " " ? "&nbsp;" : `<span class="dashes">_</span>&nbsp;`;
    }
  
    userInputSection.innerHTML = displayItem;
  };

  const initializer = () => {
    winCount = 0;
    count = 0;
  
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
  
    const allowedLetters = "AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";
    for (let i = 0; i < allowedLetters.length; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      button.innerText = allowedLetters[i];
      button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            if (char === button.innerText) {
              dashes[index].innerText = char;
              winCount += 1;
              if (winCount == charArray.length) {
                resultText.innerHTML = `<h2 class='win-msg'>Nyertél!!</h2><p>A szó: <span>${chosenWord}</span> volt.</p>`;
                blocker();
              }
            }
          });
        } else {
          count += 1;
          drawMan(count);
          if (count == 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>Ön veszett!</h2><p>A szó: <span>${chosenWord}</span> volt</p>`;
            blocker();
          }
        }
        button.disabled = true;
      });
      letterContainer.append(button);
    }
  
    displayOptions();
    let { initialDrawing } = canvasCreator();
    initialDrawing();
  };
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;