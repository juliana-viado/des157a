(function() {
    'use strict';
    console.log('reading js');

    const startGame = document.getElementById('startgame');
    const timer = document.getElementById('timer');
    const quitBtn = document.getElementById('quitBtn');

    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');

    const blue = document.getElementById('blue');
    const pink = document.getElementById('pink');

    let timeLeft = 60; // 1 minute
    const blueArrows = ['images/blueleft.png', 'images/bluedown.png', 'images/blueright.png', 'images/bluedown.png'];
    const pinkArrows = ['images/pinkleft.png', 'images/pinkdown.png', 'images/pinkright.png', 'images/pinkdown.png'];
    let currentArrowIndex = -1;
    let pinkcurrentArrowIndex = -1;

    const soundtrack = new Audio('media/upbeat-summer-pop-113447.mp3');
    // const winSound = new Audio('media/win.mp3');
    
    const gameData = {
        dice:['images/die1.png','images/die2.png','images/die3.png','images/die4.png','images/die5.png','images/die6.png','images/die7.png','images/die8.png','images/die9.png','images/die10.png','images/die11.png','images/die12.png','images/die13.png','images/die14.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        gameEnd: 29
    };

    //Start Screen
    document.querySelector("#startgame").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("intro").className = "hidden";
    });

    //Game Screen.. Score is 0 and Timer starts here
    startGame.addEventListener("click", function() {
        quitBtn.className = "showing";
        startGame.className = "hidden";

        score1.innerHTML = 'Player 1: 0';
        score2.innerHTML = 'Player 2: 0';

        dice.innerHTML = `<img src="${gameData.dice[4]}">`;
        dice2.innerHTML = `<img src="${gameData.dice[11]}">`;

        const countdown = setInterval(function(){
            if (timeLeft <= 0) {
                soundtrack.pause();
                clearInterval(countdown);
                timer.innerHTML = 'Time is up! Click the logo to restart game.';
            } else {
                soundtrack.play();
                timer.innerHTML = `Time left: ${timeLeft--} seconds`;
            }
        }, 1000);

        const dance = setInterval(function(){
            if (timeLeft <= 0) {
              clearInterval(dance);
            } else {
                chooseRandomArrow();
                moveArrow();
            }
        }, 1000);


    });

    //Button to Restart the game
    quitBtn.addEventListener("click", function() {
        location.reload();
    });

    function chooseRandomArrow() {
        //Sets when arrow
        currentArrowIndex = Math.floor(Math.random() * blueArrows.length);
        const arrow = createImage(blueArrows[currentArrowIndex]);
        moveArrow(arrow);

        pinkcurrentArrowIndex = Math.floor(Math.random() * pinkArrows.length);
        const p2arrow = createpinkImage(pinkArrows[pinkcurrentArrowIndex]);
        moveArrow(p2arrow);

        
        document.addEventListener('keydown', function(event) {
            if (event.code === 'ArrowUp' && currentArrowIndex === 1) {
                arrow.parentNode.removeChild(arrow);
                gameData.score[0] = gameData.score[0] + 1;
                dice.innerHTML = `<img src="${gameData.dice[1]}">`;
            } else if (event.code === 'ArrowDown' && currentArrowIndex === 3) {
                arrow.parentNode.removeChild(arrow);
                gameData.score[0] = gameData.score[0] + 1;
                dice.innerHTML = `<img src="${gameData.dice[0]}">`;
            } else if (event.code === 'ArrowLeft' && currentArrowIndex === 0) {
                arrow.parentNode.removeChild(arrow);
                gameData.score[0] = gameData.score[0] + 1;
                dice.innerHTML = `<img src="${gameData.dice[2]}">`;
            } else if (event.code === 'ArrowRight' && currentArrowIndex === 2) {
                arrow.parentNode.removeChild(arrow);
                gameData.score[0] = gameData.score[0] + 1;
                dice.innerHTML = `<img src="${gameData.dice[3]}">`;
                } //else{
            //     gameData.score[gameData.index] = 0;
            //     dice.innerHTML = `<img src="${gameData.dice[6]}">`;
            // }
        });
       
        document.addEventListener('keydown', function(event) {
            if (event.key === 'w' && pinkcurrentArrowIndex === 1) {
                p2arrow.parentNode.removeChild(p2arrow);
                gameData.score[1] = gameData.score[1] + 1;
                dice2.innerHTML = `<img src="${gameData.dice[7]}">`;
            } else if (event.key === 's' && pinkcurrentArrowIndex === 3) {
                p2arrow.parentNode.removeChild(p2arrow);
                gameData.score[1] = gameData.score[1] + 1;
                dice2.innerHTML = `<img src="${gameData.dice[8]}">`;
            } else if (event.key === 'a' && pinkcurrentArrowIndex === 0) {
                p2arrow.parentNode.removeChild(p2arrow);
                gameData.score[1] = gameData.score[1] + 1;
                dice2.innerHTML = `<img src="${gameData.dice[9]}">`;
            } else if (event.key === 'd' && pinkcurrentArrowIndex === 2) {
                p2arrow.parentNode.removeChild(p2arrow);
                gameData.score[1] = gameData.score[1] + 1;
                dice2.innerHTML = `<img src="${gameData.dice[10]}">`;
            } //else{
            //     gameData.score[gameData.index] = 0;
            //     dice.innerHTML += `<img src="${gameData.dice[13]}">`;
            // }
        });
        
        showCurrentScore();
        
    }
  
    //Creates animation in CSS
    function moveArrow(arrow) {
        arrow.style.animation = 'moveArrow 2s linear forwards';
  
        arrow.addEventListener('animationend', function() {
          arrow.parentNode.removeChild(arrow);
        });
    }

    //Creates an image: Sets location and size
    function createImage(imgObj) {
        const img = new Image();
        img.src = `${imgObj}`;
        img.style.position = 'absolute';
        // img.style.top = '-20px';
        // img.style.left = -200 + 'px';
        img.style.marginLeft = -200 + 'px';
        blue.appendChild(img);
        return img;
    }

    function createpinkImage(imgObj) {
        const img = new Image();
        img.src = `${imgObj}`;
        img.style.position = 'absolute';
        // img.style.top = '-20px';
        // img.style.left = 200 + 'px';
        img.style.marginLeft = 200 + 'px';
        pink.appendChild(img);
        return img;
    }
  
    // function that prints what each player's score is
    function showCurrentScore() {
        score1.innerHTML = `Player 1: ${gameData.score[0]}`
        score2.innerHTML = `Player 2: ${gameData.score[1]}`
    }

}());
