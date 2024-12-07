/* 
    1. Hva er en hendelse?
    Et "event" eller en hendelse i Javascript er noe som aktiverer en funksjon. Et eksempel på dette er en klikk hendelse, dette er en hendelse som aktiverer en funksjon når en bruker klikker på et spesifikt element på nettsiden som venter på at en spesifik hendelse. Det er mange flere, men det er en av de mest vanlige hendelsen på en nettside. 
*/

/* 
    2. Hvilke hendelser har vi snakket om? Jeg trenger bare kategoriene.
    User interface hendelser.
    Fokus og blur hendelser.
    Muse hendelser. 
    Tastatur hendelser.
    Skjema hendelser.
    Mutasjons hendelser og observers.
    HTML5 hendelser. 
    CSS hendelser.
*/  

/* 
    3. Lag et lite nettspill der brukeren må trykke på knapper på en nettside. Hva det skal handle om og gjøre er opp til deg, men det skal minst inneholde disse elementene:

        1. En life counter
        2. Poeng
        3. En form for interaksjon, enten vha knapper på skjermen eller tastetrykk
        4. Flere valg som må tas underveis. Hva du legger i ordet “valg” er opp til deg.
*/

/* 
    HTML Elements
*/

/* Header */
const headerElement = document.createElement("header")
headerElement.id = "headerElement"
document.body.appendChild(headerElement)

const gameTitle = document.createElement("h1")
gameTitle.id = "game-title"
gameTitle.textContent = "Adventure Game"
headerElement.appendChild(gameTitle)

const roundCounter = document.createElement("p")
roundCounter.id = "round-counter"
roundCounter.textContent = ("Round #")
headerElement.appendChild(roundCounter)
/* /Header */



/* Main */
const mainElement = document.createElement("main")
document.body.appendChild(mainElement)

const mainSection = document.createElement("section")
mainSection.id = "main-section"
mainElement.appendChild(mainSection)

const entityContainer = document.createElement("div")
entityContainer.id = "entity-container"
mainSection.appendChild(entityContainer)
/* /Main */



/* Player container */
const playerContainer = document.createElement("div")
playerContainer.id = "player-container"
playerContainer.className = "entity-container"
entityContainer.appendChild(playerContainer)

const playerStatsContainer = document.createElement("div")
playerStatsContainer.id = "player-stats"
playerStatsContainer.className = "entity-stats-container"
playerContainer.appendChild(playerStatsContainer)

const playerHealth = document.createElement("p")
playerHealth.id = "player-health"
playerHealth.className = "entity-health"
playerStatsContainer.appendChild(playerHealth)

const playerAttack = document.createElement("p")
playerAttack.id = "player-attack"
playerAttack.className = "entity-attack"
playerStatsContainer.appendChild(playerAttack)

const playerDefense = document.createElement("p")
playerDefense.id = "player-defense"
playerDefense.className = "entity-defense"
playerStatsContainer.appendChild(playerDefense)
/* /Player container */



/* Monster container */
const monsterContainer = document.createElement("div")
monsterContainer.id = "monster-container"
monsterContainer.className = "entity-container"
entityContainer.appendChild(monsterContainer)

const monsterStatsContainer = document.createElement("div")
monsterStatsContainer.id = "monster-stats"
monsterStatsContainer.className = "entity-stats-container"
monsterContainer.appendChild(monsterStatsContainer)

const monsterHealth = document.createElement("p")
monsterHealth.id = "monster-health"
monsterHealth.className = "entity-health"
monsterStatsContainer.appendChild(monsterHealth)

const monsterAttack = document.createElement("p")
monsterAttack.id = "monster-attack"
monsterAttack.className = "entity-attack"
monsterStatsContainer.appendChild(monsterAttack)

const monsterDefense = document.createElement("P")
monsterDefense.id = "monster-defense"
monsterDefense.className = "entity-defense"
monsterStatsContainer.appendChild(monsterDefense)
/* /Monster container */



/* User Interaction */
const playerUserInterfaceContainer = document.createElement("div")
playerUserInterfaceContainer.id = "player-UI-container"
mainSection.appendChild(playerUserInterfaceContainer)

const playerAttackButton = document.createElement("button")
playerAttackButton.id = "player-attack-button"
playerAttackButton.textContent = "Attack"
playerUserInterfaceContainer.appendChild(playerAttackButton)

const playerDefendButton = document.createElement("button")
playerDefendButton.id = "player-defend-button"
playerDefendButton.textContent = "Defend"
playerUserInterfaceContainer.appendChild(playerDefendButton)

const endGameButton = document.createElement("button")
endGameButton.id = "end-game-button"
endGameButton.textContent = "End game"
playerUserInterfaceContainer.appendChild(endGameButton)
/* /User Interaction */



/* Game event log */
const gameEventLogContainer = document.createElement("div")
gameEventLogContainer.id = "gameEventLogContainer"
mainSection.appendChild(gameEventLogContainer)

const gameEventLog = document.createElement("div")
gameEventLog.id = "game-event-log"
gameEventLogContainer.appendChild(gameEventLog)
/* /Game event log */

/* 
    /HTML Elements
*/


/* 
    Game
*/

/* Characters */
let playerCharacter = {Name: "Adventurer", Health: 100, Defense: 2}
let monsterCharacter = {Name: "Rabbit", Health: 50, Defense: 3}
/* /Characters */


let gameOver = false;



/* 
    Die roll function
    
    We define our die as six sided by writing (parameter = 6) in the parameter field. This is what is refered to as a default parameter. The parameter name could be anything, we decided to name ours "sides" for clarity as we are defaulting to a 6-sided die. 
    
    As this is a die we take advantage of the math object call on two of it's methods, .floor and .random.

    .random will give us a random number between 0 and 1. 
    
    And .floor rounds the number down to the nearest whole number.

    The random number we get is multiplied with the amount of sides our die has.

    And we add +1 to the result we get. This is because the numbers we will recieve is between 0 to 5. So our final result will be between 1 and 6.

*/
function rollDie(sides = 6) {
    return Math.floor(Math.random() * sides) +1;
  }

/* /Die roll function */


/* 
    Player attack and Monster attack functions
    
    With this function the player's attack is defined. It uses the rolldie() function to roll an attack number between 1-6. 

    The attack must go through the character's defensive stat before it can be applied to it's health. So we subtract the character's total defensive stat from the attack roll. And then apply the remaining number to the character's health pool. 
    
    Using Math.max we ensure that the total amount will not be negative. By adding 0, it will be the highest number among the parameters should the final attack result in a negative number.

    Once the function has calculated the final attack result, it returns a string with the attacker's name, amount of damage dealt, and the target's name.

*/
function playerActionAttack() {
     const playerAttackRoll = rollDie();
     const playerAttackResult = Math.max(0, playerAttackRoll - monsterCharacter.Defense);
     return `${playerCharacter.Name} attacks ${monsterCharacter.Name} for ${playerAttackResult} damage!`;
    };

  function monsterActionAttack() {
        const monsterAttackRoll = rollDie();
        const monsterAttackResult = Math.max(0, monsterAttackRoll - playerCharacter.Defense);
        return `${monsterCharacter.Name} attacks ${playerCharacter.Name} for ${monsterAttackResult} damage!`;
    };
/* /Player attack and Monster attack functions  */
  


/* Player defend function */

function playerActionDefend() {
    const playerDefendRoll = rollDie(3);
    const playerNewDefense = playerDefendRoll + playerCharacter.Defense;
    return playerNewDefense;
}

const playerTemporaryDefense = playerActionDefend();

/* /Player defend function */

let rollInitiative = rollDie()







/* 
    /Game
*/

















    //Saved for later in case it proves useful.
/* function monsterActionAttack() {
    const monsterAttackRoll = rollDie();
    if (playerActionDefend()) {
        const monsterAttackResult = Math.max(0, monsterAttackRoll - playerTemporaryDefense);
        return `${monsterCharacter.Name} attacks ${playerCharacter.Name} for ${monsterAttackResult} damage!`;
    } else {
        const monsterAttackResult = Math.max(0, monsterAttackRoll - playerCharacter.Defense);
        return `${monsterCharacter.Name} attacks ${playerCharacter.Name} for ${monsterAttackResult} damage!`;
    }
    
}; */