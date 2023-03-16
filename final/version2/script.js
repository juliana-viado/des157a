(function() {
    'use strict';
    console.log('reading js');

    const startGame = document.getElementById('startgame');
    const timer = document.getElementById('timer');
    const quitBtn = document.getElementById('quitBtn');

    const p1Score = document.getElementById('p1Score');
    const p2Score = document.getElementById('p2Score');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const buttons = document.getElementById('buttons');

    let timeLeft = 60; // 1 minute
    const blueArrows = ['images/blueleft.png', 'images/bluedown.png', 'images/blueright.png', 'images/bluedown.png'];
    const pinkArrows = ['images/pinkleft.png', 'images/pinkdown.png', 'images/pinkright.png', 'images/pinkdown.png'];
    let currentArrowIndex = -1;
    let currentArrowElement;
    let animationId;

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
        document.getElementById("intro").className = "hidden";
    });

    //Game Screen.. Score is 0 and Timer starts here
    startGame.addEventListener("click", function() {
        gameData.index === 0;
        console.log(gameData.index);

        quitBtn.className = "showing";
        startGame.className = "hidden";

        score1.innerHTML = 'Player 1: 0';
        score2.innerHTML = 'Player 2: 0';


        const countdown = setInterval(function(){
            if (timeLeft <= 0) {
              clearInterval(countdown);
              timer.innerHTML = 'Time is up! Click the logo to restart game.';
            } else {
              timer.innerHTML = `Time left: ${timeLeft--} seconds`;
              dance();
            }
        }, 1000);


    });

    //Button to Restart the game
    quitBtn.addEventListener("click", function() {
        location.reload();
    });

    function dance() {
          chooseRandomArrow();
          moveArrow();
      
          document.addEventListener('keydown', function(event) {
            if (event.code === 'ArrowUp') {
              cancelAnimationFrame(animationId);
              currentArrowElement.style.display = 'none';
               chooseRandomArrow();
               moveArrow();
            }
          });
    }

    function chooseRandomArrow() {
        if (currentArrowElement) {
            currentArrowElement.style.display = 'none';
        }

        setInterval(function() {
            currentArrowIndex = Math.floor(Math.random() * blueArrows.length);
            const arrow = createImage(blueArrows[currentArrowIndex]);
            moveArrow(arrow);
        }, 1000);
    }
  
    function moveArrow(arrow) {
        const interval = setInterval(function() {
        const currentTop = parseInt(arrow.style.top);
        if (currentTop >= 300) {
            clearInterval(interval);
            arrow.parentNode.removeChild(arrow);
        } else {
            arrow.style.top = (currentTop + 5) + 'px';
        }
        }, Math.floor(Math.random() * 200) + 100);
    }

    function createImage(imgObj) {
        const img = new Image();
        img.src = imgObj.src;
        img.style.width = imgObj.width + 'px';
        img.style.height = imgObj.height + 'px';
        img.style.position = 'absolute';
        img.style.top = '-20px';
        img.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
        document.body.appendChild(img);
        return img;
    }
  
    // function that prints what each player's score is
    function showCurrentScore() {
        score1.innerHTML = `Player 1: ${gameData.score[0]}`
        score2.innerHTML = `Player 2: ${gameData.score[1]}`
    }

}());
