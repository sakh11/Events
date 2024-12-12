

//Character Objects
let playerCharacter = {Name: "Adventurer", Health: 100, Defense: 0, Initiative: 0}
let monsterCharacter = {Name: "Rabbit", Health: 50, Defense: 0, Initiative: 0}


// Die Roll Mechanic
function rollDie(sides = 6) {
    return Math.floor(Math.random() * sides) +1;
  }


//Initiative roll mechanic
function rollInitiative(player, monster) {
    player.Initiative += rollDie()
    monster.Initiative += rollDie()

    if (playerCharacter.Initiative > monsterCharacter.Initiative) {
        return `${playerCharacter.Name} rolled ${playerCharacter.Initiative} and ${monsterCharacter.Name} rolled ${monsterCharacter.Initiative}, ${playerCharacter.Name} begins.`
    } else if (monsterCharacter.Initiative > playerCharacter.Initiative) {
        return `${monsterCharacter.Name} rolled ${monsterCharacter.Initiative} and ${playerCharacter.Name} rolled ${playerCharacter.Initiative}, ${monsterCharacter.Name} begins.`
    } else {
        return `The rolls resulted in a tie, roll again.`
    }
}


/* 
    Previous version

    function rollForInitiative() { 
    let playerInitiativeRoll = rollDie()
    let monsterInitiativeRoll = rollDie()

    if (playerInitiativeRoll > monsterInitiativeRoll) {
        return `${playerCharacter.Name} rolled highest and will start first!`
    
    } else if (monsterInitiativeRoll > playerInitiativeRoll) {
        return `${monsterCharacter.Name} rolled highest and will start first!`
    
    } else {
        return `The rolls resulted in a tie, roll again!`
    }
} */




//Player Attack Function
function playerActionAttack() {
    const playerAttackRoll = rollDie();
    const playerAttackResult = Math.max(0, playerAttackRoll - monsterCharacter.Defense);
    damageReceived(monsterCharacter, playerAttackResult)
    return `${playerCharacter.Name} attacks ${monsterCharacter.Name} and deals ${playerAttackResult} damage!`;
   };


//Monster Attack Function
function monsterActionAttack() {
   const monsterAttackRoll = rollDie();
   const monsterAttackResult = Math.max(0, monsterAttackRoll - playerCharacter.Defense);
   damageReceived(playerCharacter, monsterAttackResult)
   return `${monsterCharacter.Name} attacks ${playerCharacter.Name} and deals ${monsterAttackResult} damage!`;
   };

 
//Damage Received Mechanic
   function damageReceived(character, damage) {
    character.Health -= damage;
    if (character.Health < 0) {
        character.Health = 0;
    }
}

// Character action: Defend
function characterActionDefend(character, defense) {
    character.Defense += defense;
    if (character.Defense > 6) {
        character.Defense = 6;
    }
}

//Character action: Defend eventlistener
document.getElementById("player-defend-button").addEventListener("click", () => {
    characterActionDefend(playerCharacter, rollDie(3));
    })


//Start/End Game button functionality
const startGameButton = document.getElementById("start-game-button")
const endGameButton = document.getElementById("end-game-button")
const characterContainer = document.getElementsByClassName("character-container")

startGameButton.addEventListener("click", () => {
    toggleGameStateClasses(true)
    startGame()
})

endGameButton.addEventListener("click", () => {
    toggleGameStateClasses(false)
    endGame()
})

function toggleGameStateClasses(gameStateStart) {
    Array.from(characterContainer).forEach(parameter => {
        if (gameStateStart) {
            parameter.classList.remove("gameStateOff")
            parameter.classList.add("gameStateStart")
        } else {
            parameter.classList.remove("gameStateStart")
            parameter.classList.add("gameStateOff")
        }
    })
}



let gameState = "notStarted"
let roundCounter = 1

function startGame() {
    gameState = "inProgress"
    
    rollInitiative(playerCharacter, monsterCharacter)

    if (playerCharacter.Initiative > monsterCharacter.Initiative) {
        /* playerTurn() */
        return "Player turn"        
    } else if (monsterCharacter.Initiative > playerCharacter.Initiative) {
        /* monsterTurn() */
        return "Monster turn"
    } else {
        return "Tie"
        /* resetGame() */ //Work in progress
        /* startGame() */
    }
}

function playerTurn() {

}




