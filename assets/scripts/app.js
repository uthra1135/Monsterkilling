let maxLife=100 ;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const HEAL_VALUE = 8;

let currentMonsterMaxLife = maxLife;
let currentPlayerMaxLife = maxLife;

const MODE_ATTACK = "ATTACK"; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battlelog = [];
adjustHealthBars(maxLife);

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum life for you and the monster.", "100");
  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number!" };
  }
  return parsedValue;
}

try{
   getMaxLifeValues();
 
}catch(e){
  alert("By default the value is 80");
  maxLife =80;
  
}


function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
   };

  switch (ev){
    case "LOG_EVENT_PLAYER_STRONG_ATTACK" :
      logEntry.target = "MONSTER";
      break;
  
  case "PLAYER_HEAL" :
      logEntry.target = "PLAYER";
      break;

  case "LOG_EVENT_PLAYER_STRONG_ATTACK" :
      logEntry.target = "MONSTER";
      break;

  case "LOG_EVENT_GAME_OVER" :
      logEntry.target = "MONSTER";
      break;
      
  }
        
  battlelog.push(logEntry);
}

function attackMonster(mode) {
  let maxDamage;
  if (mode == "ATTACK") {
    maxDamage = PLAYER_ATTACK_VALUE;
  } else if (mode == "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const playerDamage = dealMonsterDamage(maxDamage);
  currentMonsterMaxLife -= playerDamage;
  toDisplayTheResultAfterHeal();
}

function toDisplayTheResultAfterHeal() {

  const damage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerMaxLife -= damage;
  if (currentMonsterMaxLife <= 0 && currentPlayerMaxLife > 0) {
    alert("you won the game");
  } else if (currentPlayerMaxLife <= 0 && currentMonsterMaxLife > 0) {
    alert("you lose the game");
  } else if (currentMonsterMaxLife <= 0 && currentPlayerMaxLife <= 0) {
    alert("Its a draw ");
  }
  if (currentMonsterMaxLife <= 0 || currentPlayerMaxLife <= 0) {
    reset();
  }
}
function attackMosnterAndPlayerHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healHandler() {
  let healValue;
  if (currentPlayerMaxLife >= maxLife - HEAL_VALUE) {
    alert(`You can't heal to more than your max intial health `);
    healValue = maxLife - currentPlayerMaxLife;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerMaxLife += healValue;
  attackMonster("ATTACK");
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterMaxLife,
    currentPlayerMaxLife
  );
}

function reset() {
  currentMonsterMaxLife = maxLife;
  currentPlayerMaxLife = maxLife;
  resetGame(maxLife);
}

function printLogHandler(){
console.log(battlelog);

}

attackBtn.addEventListener("click", attackMosnterAndPlayerHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", printLogHandler);
