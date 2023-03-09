(function() {
    'use strict';
    console.log('reading js');

    const startGame = document.getElementById('startgame');
    const actionText = document.getElementById('actionText');
    const quitBtn = document.getElementById('quitBtn');

    const p1Score = document.getElementById('p1Score');
    const p2Score = document.getElementById('p2Score');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const buttons = document.getElementById('buttons');
    const rolling = document.querySelector("#roll");
    const passing = document.querySelector("#pass");

    // const diceSound = new Audio('media/diceRoll.mp3');
    // const winSound = new Audio('media/win.mp3');
    
    const gameData = {
        dice:['images/die1.png','images/die2.png','images/die3.png','images/die4.png','images/die5.png','images/die6.png','images/die7.png','images/die8.png','images/die9.png','images/die10.png','images/die11.png','images/die12.png','images/die13.png','images/die14.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    //Start Screen
    document.querySelector("#startgame").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("infoOverlay").className = "hidden";
    });

    startGame.addEventListener("click", function() {
        gameData.index === 0;
        console.log(gameData.index);

        quitBtn.className = "showing";
        startGame.className = "hidden";

        score1.innerHTML = 'Player 1: 0';
        score2.innerHTML = 'Player 2: 0';

        setUpTurn();

    });

    quitBtn.addEventListener("click", function() {
        location.reload();
    });

    function setUpTurn() {

        rolling.className = "showing";
        // document.querySelector("#pass").className = "showing";

        actionText.innerHTML = '';

        // sets up buttons depending on whose turn it is
        if (gameData.index === 0) {
            p1Score.style.backgroundColor = "#007AFF";
            p2Score.style.backgroundColor = "#da0166";
            rolling.className = "showing";

            rolling.addEventListener('click', function() {
                console.log('dice was rolled');
                throwDice();
            });
        } else if (gameData.index === 1) {
            p1Score.style.backgroundColor = "#0059b8";
            p2Score.style.backgroundColor = "#F91880";
            rolling.className = "showing";

            rolling.addEventListener('click', function() {
                throwDice();
            });
        }
    };

    // function that rolls the dice for the user 
    function throwDice() {
        
        actionText.innerHTML = '';
        dice.innerHTML = '';

        gameData.roll1 = Math.floor(Math.random() * 7) + 1;
        gameData.roll2 = Math.floor(Math.random() * 7) + 1;

        
        dice.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2+5]}">`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.roll1 === 7 || gameData.roll2 === 7) {
            // if snake eyes are rolled, changes turn and resets their score
            console.log("snake eyes were rolled");

            actionText.innerHTML += '<p>Oh snap! Snake Eyes!</p>';
            gameData.score[gameData.index] = 0;

            buttons.innerHTML = '';

            if (gameData.index === 0){
                gameData.index = 1;
            } else {
                gameData.index = 0;
            }

            showCurrentScore();

            setTimeout(setUpTurn, 2000);

        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            // if a player rolls 1, switches to the other player

            console.log("one of the two dice was a 1");
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            actionText.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;

            buttons.innerHTML = '';

            setTimeout(setUpTurn, 2000);

        } else {
            // game proceeds if roll is without a 1
            console.log("the game proceeds")
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;

            // changes buttons and proceeds with game depending on whose turn it is
            if (gameData.index === 0) {
                rolling.className = "showing";
                passing.className = "showing";

                document.getElementById('roll').addEventListener('click', function() {
                    throwDice();
                });

                document.getElementById('pass').addEventListener('click', function() {
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });

                checkWinningCondition();
    

            } else if (gameData.index === 1) {
                rolling.className = "showing";
                passing.className = "showing";

                document.getElementById('roll').addEventListener('click', function() {
                    throwDice();
                });

                document.getElementById('pass').addEventListener('click', function() {
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });

                checkWinningCondition();
    
            }


        }
    }

    // function that checks if player won or not and ends game if a player wins
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            winSound.play();
            
            actionText.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            buttons.innerHTML = '';

            showCurrentScore();

            actionText.innerHTML = 'Click the logo to restart game.';


        } else {
            showCurrentScore();
        }
    };

    // function that prints what each player's score is
    function showCurrentScore() {
        score1.innerHTML = `Player 1: ${gameData.score[0]}`
        score2.innerHTML = `Player 2: ${gameData.score[1]}`
    }

}());
