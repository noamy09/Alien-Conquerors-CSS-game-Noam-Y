const solarSystem = document.getElementById('solarSystem');
const board = document.getElementById('board');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('sendBtn');
const feedbackBubble = document.getElementById('feedbackBubble');
const levelIndicator = document.getElementById('levelIndicator');
const levelNumberElement = levelIndicator.querySelector('.level-number');
const PreviousLevelArrow = document.getElementById('arrowLeft')
const NextLevelArrow = document.getElementById('arrowRight')

//set up Aliens: green, red and yellow and the fleet

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

//definig the fleet for level 3
const fleet1 = document.createElement('img');
fleet1.src = '/objects/green alien.png';
fleet1.alt = 'green alien';
fleet1.className = 'alien';

const fleet2 = document.createElement('img');
fleet2.src = '/objects/green alien.png';
fleet2.alt = 'green alien';
fleet2.className = 'alien';

const fleet3 = document.createElement('img');
fleet3.src = '/objects/green alien.png';
fleet3.alt = 'green alien';
fleet3.className = 'alien';

const fleet4 = document.createElement('img');
fleet4.src = '/objects/green alien.png';
fleet4.alt = 'green alien';
fleet4.className = 'alien';

const fleet5 = document.createElement('img');
fleet5.src = '/objects/green alien.png';
fleet5.alt = 'green alien';
fleet5.className = 'alien';

const fleet6 = document.createElement('img');
fleet6.src = '/objects/green alien.png';
fleet6.alt = 'green alien';
fleet6.className = 'alien';

const fleet7 = document.createElement('img');
fleet7.src = '/objects/green alien.png';
fleet7.alt = 'green alien';
fleet7.className = 'alien';

const fleet8 = document.createElement('img');
fleet8.src = '/objects/green alien.png';
fleet8.alt = 'green alien';
fleet8.className = 'alien';

const fleet9 = document.createElement('img');
fleet9.src = '/objects/green alien.png';
fleet9.alt = 'green alien';
fleet9.className = 'alien';

const fleet10 = document.createElement('img');
fleet10.src = '/objects/green alien.png';
fleet10.alt = 'green alien';
fleet10.className = 'alien';

//set up the aliens for each level
const level1Arr = [green_alien];
const level2Arr = [green_alien, red_alien];
const level3Arr = [fleet1, fleet2, fleet3, fleet4, fleet5, fleet6, fleet7, fleet8, fleet9, fleet10];
const level4Arr = [green_alien, red_alien];
const level5Arr = [green_alien, red_alien, yellow_alien];
const level6Arr = [green_alien, red_alien, yellow_alien];

//track all levels for future use
const levelsArr = [level1Arr, level2Arr, level3Arr, level4Arr, level5Arr, level6Arr]

//listen to button click
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    UserSubmit();
});

//use Enter key in input field
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !(currLevel == 4 || currLevel == 5 || currLevel == 6)) {
    event.preventDefault();
    UserSubmit();
  }
});

//Meant for the level indicator bar. Allows the user to navigate levels they've unlocked.
PreviousLevelArrow.addEventListener('click', () => ChangeLevel(currLevel-1));
    
NextLevelArrow.addEventListener('click', () => ChangeLevel(currLevel+1));


//helper function as part of setting up the levels
function loadBoard(levelNumber) {
  const backgroundPath = `/levels/level${levelNumber}.png`;
  board.style.backgroundImage = `url('${backgroundPath}')`;
};

//loads the board of the current level, resets the flex,
//loops through each alien and resets its animations before adding it in
function LoadLevel(levelNumber, aliensArr){
    console.log(`Loading galaxy No. ${levelNumber}`);
    //loads the next level's board
    if (levelNumberElement) levelNumberElement.textContent = levelNumber;
    loadBoard(levelNumber);
    
    solarSystem.style.justifyContent = "flex-start";
    solarSystem.style.alignItems = "stretch";
    solarSystem.style.flexDirection = "row";
    solarSystem.style.flexWrap = "nowrap";

    if (levelNumber == 4 || levelNumber == 5 || levelNumber == 6) {
        userInput.classList.add('two-line-input');
        userInput.rows = 2;
    } else {
        userInput.classList.remove('two-line-input');
        userInput.rows = 1;
    }
    //Remove existing aliens if they exist prior to loading next level
    const childrenToRemove = Array.from(solarSystem.children).filter(child => child.classList.contains('alien'));
    for(let i = 0; i < childrenToRemove.length; i++){
        if(solarSystem.contains(childrenToRemove[i])){
            solarSystem.removeChild(childrenToRemove[i]);
        }
    }
    //check if our current alien CSS's have animations. If they do we remove them.
    alienNum = aliensArr.length;
    for(let i = 0; i<alienNum; i++){
        if(aliensArr[i].classList.contains('celebrating')){
            aliensArr[i].classList.remove('celebrating');
        }
        solarSystem.append(aliensArr[i]);
    };
};

//if we reached a new level, raise our unlocked level cap, then for each alien add the celebration animation,
//then time according to the animation moving on to next level.
//If the user beat the final level, they will get a congratulatory message for their completion of the game! 
function LevelUp(currAliensArr, nextAliensArr){
    if(currLevel == unlockedLevel && currLevel < 6)
        unlockedLevel += 1;
    console.log(`congratulations! You've conquered galaxy No. ${currLevel}!`);
    
    // Set the next level's class immediately so sizing rules apply during animation
    let nextLevel = currLevel + 1;
    if (nextLevel <= 6) {
        solarSystem.classList.remove('level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6');
        if(nextLevel == 3 || nextLevel == 4)
            solarSystem.classList.add(`level-${nextLevel}`);
    }
    
    aliensNum = currAliensArr.length;
    for(let i = 0; i<aliensNum; i++){
        currAliensArr[i].classList.add('celebrating');
    }
    
    if (currLevel < 6){
        setTimeout(() => {
            currLevel += 1;
            LoadLevel(currLevel, nextAliensArr);
        }, 2000);
    }
    else{
        setTimeout(() => {
            LoadLevel(currLevel, nextAliensArr);
            showFeedback("congratulations! You have successfuly conquored all of the known solar systems in the galaxy! Perhaps we will discover more for you to conquor in the future...");
        }, 2000);
    }
};

//the function that enables moving back and forth between unlocked levels.
  function ChangeLevel(targetLevel){
    if((0 < targetLevel) && (targetLevel <= unlockedLevel)){
        currLevel = targetLevel;
        LoadLevel(targetLevel, levelsArr[targetLevel-1]);
    }
    else if(0 >= targetLevel)
        console.log('The lowest level is level 1.');

    else if(targetLevel > unlockedLevel && targetLevel <= 6)
        console.log("You haven't unlocked this level yet.");
    else if(targetLevel > 6)
        console.log("You've reached the final frontier. There's no more to conquor...");
  };

function showFeedback(message) {
  feedbackBubble.textContent = message + ' [X]';
  feedbackBubble.classList.remove('hidden');
  feedbackBubble.setAttribute('tabindex', '0');
  feedbackBubble.focus();
}

feedbackBubble.addEventListener('click', () => {
  feedbackBubble.classList.add('hidden');
});

feedbackBubble.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    feedbackBubble.classList.add('hidden');
  }
});

//set up universal variables for level management
let currLevel = 1;
let unlockedLevel = 1;
//Load level 1 on startup
LoadLevel(currLevel, level1Arr);

//the logic for advancing throuhg levels. According to the current level and the input,
//if correct, the user advances to the next level
function UserSubmit() {
  const userInputValue = userInput.value.trim();
  if (userInputValue) {
    if(currLevel == 1 && (userInput.value == "justify-content: flex-end;" || userInput.value == "justify-content: end;")){
        solarSystem.style.justifyContent = "flex-end";
        LevelUp(level1Arr, level2Arr);
    }
    else if (currLevel == 2 && userInput.value == "justify-content: space-between;"){
        solarSystem.style.justifyContent = "space-between";
        LevelUp(level2Arr, level3Arr);
    }
    else if (currLevel == 3 && userInput.value == "flex-wrap: wrap;"){
        solarSystem.style.flexWrap = "wrap";
        LevelUp(level3Arr, level4Arr);
    }
    else if (currLevel == 4 && (userInputValue == "justify-content: center;\nalign-items: center;"
        || userInputValue == "align-items: center;\njustify-content: center;")){
        solarSystem.style.justifyContent = "center";
        solarSystem.style.alignItems = "center";
        LevelUp(level4Arr, level5Arr);
    }
    else if (currLevel == 5 && (userInputValue == "justify-content: space-around;\nalign-items: flex-end;"
        || userInputValue == "align-items: flex-end;\njustify-content: space-around;")){
        solarSystem.style.justifyContent = "space-around";
        solarSystem.style.alignItems = "flex-end";
        LevelUp(level5Arr, level6Arr);
    }
    else if (currLevel == 6 && (userInputValue == "justify-content: start;\nflex-direction: row-reverse;"
        || userInputValue === "flex-direction: row-reverse;\njustify-content: start;")){
        solarSystem.style.justifyContent = "start";
        solarSystem.style.flexDirection = "row-reverse";
        LevelUp(level6Arr, level6Arr)
    }
    else
        showFeedback('Wrong alignment... Make sure the CSS you designate lands your spaceships on a planet with the same color precisely.')
    
    userInput.value = ''; // Clear input after submission
  }
}