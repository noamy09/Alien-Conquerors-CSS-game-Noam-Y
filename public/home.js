const solarSystem = document.getElementById('solarSystem');
const board = document.getElementById('board');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('sendBtn');
const levelIndicator = document.getElementById('levelIndicator');
const levelNumberElement = levelIndicator.querySelector('.level-number');

// listen to button click
submitButton.addEventListener('click', UserSubmit);

// use Enter key in input field
userInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    UserSubmit();
  }
});  

// helper function as part of setting up the levels
function loadBoard(levelNumber) {
  const backgroundPath = `/levels/level${levelNumber}.jpg`;
  board.style.backgroundImage = `url('${backgroundPath}')`;
};

// loads the board of the current level, resets the flex, loops through each alien and resets its animations before adding it in
function LoadLevel(levelNumber, aliensArr){
    if (levelNumberElement) levelNumberElement.textContent = levelNumber;
    loadBoard(levelNumber);
    solarSystem.style.justifyContent = "";
    solarSystem.style.alignItems = "";
    alienNum = aliensArr.length;
    for(let i = 0; i<alienNum; i++){
        if(aliensArr[i].classList.contains('celebrating')){
            aliensArr[i].classList.remove('celebrating');
        }
        solarSystem.append(aliensArr[i]);
    };
};

// if we reached a new level, raise our unlocked level cap, then for each alien add the celebration animation,
// then time according to the animation the removal of each alien. After which we move on to next level. 
function LevelUp(currAliensArr, nextAliensArr){
    if(currLevel == unlockedLevel)
        unlockedLevel += 1;

    aliensNum = currAliensArr.length;
    for(let i = 0; i<aliensNum; i++){
        currAliensArr[i].classList.add('celebrating');
    }
    
    setTimeout(() => {
        aliensNum = currAliensArr.length;
        for(let i = 0; i<aliensNum; i++){
            solarSystem.removeChild(currAliensArr[i]);
        }
        currLevel += 1;
        LoadLevel(currLevel, nextAliensArr);
    }, 2000);
};

// set up Aliens: green, red and yellow.

const green_alien = document.createElement('img');
green_alien.src = '/objects/green alien.png';
green_alien.alt = 'green alien';
green_alien.className = 'alien';

const red_alien = document.createElement('img');
red_alien.src = '/objects/red alien.png';
red_alien.alt = 'red alien';
red_alien.className = 'alien';

const yellow_alien = document.createElement('img');
yellow_alien.src = '/objects/yellow alien.png';
yellow_alien.alt = 'yellow alien';
yellow_alien.className = 'alien';

// set up the aliens for each level
const level1Arr = [green_alien];
const level2Arr = [green_alien];
const level3Arr = [green_alien, red_alien];
const level4Arr = [green_alien, red_alien];
const level5Arr = [green_alien, red_alien, yellow_alien];
const level6Arr = [green_alien, red_alien, yellow_alien];

// Load level 1 on startup
let currLevel = 1;
let unlockedLevel = 1;
LoadLevel(currLevel, level1Arr);

// the logic for advancing throuhg levels. According to the current level and the input,
// if correct, the user advances to the next level
function UserSubmit() {
  const userInputValue = userInput.value.trim();
  if (userInputValue) {
    if(currLevel == 1 && userInput.value == "justify-content: flex-end;"){
        solarSystem.style.justifyContent = "flex-end";
        LevelUp(level1Arr, level2Arr);
    }
    else if (currLevel == 2 && userInput.value == "justify-content: center;"){
        solarSystem.style.justifyContent = "center";
        LevelUp(level2Arr, level3Arr);
    }

    userInput.value = ''; // Clear input after submission
  }
}