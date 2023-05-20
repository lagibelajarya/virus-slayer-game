let sectionStart = document.querySelector('.section-start');
let sectionGame = document.querySelector('.section-game');
let sectionPause = document.querySelector('.section-pause');
let sectionOver = document.querySelector('.section-over');
let fieldName = document.querySelector('.field-name');
let btnStart = document.querySelector('.btn-start');
let timerEl = document.querySelector('.field-timer');
let scoreEl = document.querySelector('.field-score');
let failEl = document.querySelector('.field-fail');
let nameEl = document.querySelector('.field-name');

let board1 = document.querySelector('.board-1');
let board2 = document.querySelector('.board-2');
let board3 = document.querySelector('.board-3');
let board4 = document.querySelector('.board-4');

let second = 0;
let centiSecond = 0;
let toggleSetGame = false;

let allVirus = [];

let score = 0;
let fail = 0;
let intervalTimer;
let finalTimer;
let timer = () => {
  intervalTimer = setInterval(() => {
    centiSecond++;
    finalTimer = `Timer : ${second} : ${centiSecond}`;
    timerEl.innerHTML = finalTimer;
    if (centiSecond > 100) {
      second++;
      centiSecond = 0;
    }
  }, 10);
  if (allIntervals.includes) {
  }
};

let allBoard = document.querySelectorAll('.board');
let keyDown = (e) => {
  if (fieldName.value == '') {
    btnStart.classList.add('d-none');
  } else {
    btnStart.classList.remove('d-none');
  }

  if (e.key == 'd') {
    detectVirus(board1);
    onClickBoard(board1);
  }

  if (e.key == 'f') {
    detectVirus(board2);
    onClickBoard(board2);
  }

  if (e.key == 'j') {
    detectVirus(board3);
    onClickBoard(board3);
  }

  if (e.key == 'k') {
    detectVirus(board4);
    onClickBoard(board4);
  }
};

function onClickBoard(board) {
  let btn = board.querySelector('.btn');
  btn.classList.add('bg-active');
  setTimeout(() => {
    btn.classList.remove('bg-active');
  }, 100);
}

function detectVirus(board) {
  let virus = board.querySelector('.virus');
  if (virus) {
    if (parseInt(virus.style.top) > 700 - 100 - 100 - 50) {
      virus.remove();
      scoreEl.innerHTML = `Score : ${score}`;
      setVirusArr(virus, 'score');

      let dangerArea = document.querySelector('.danger-area');
      dangerArea.classList.add('bg-area-active');
      setTimeout(() => {
        dangerArea.classList.remove('bg-area-active');
      }, 100);
    }
  }
}

function toSectionStart() {
  sectionStart.classList.remove('d-none');
  sectionGame.classList.add('d-none');
  sectionPause.classList.add('d-none');
  sectionOver.classList.add('d-none');
}
function toSectionGame() {
  sectionStart.classList.add('d-none');
  sectionGame.classList.remove('d-none');
  sectionPause.classList.add('d-none');
  sectionOver.classList.add('d-none');
}
function toPauseGame() {
  sectionStart.classList.add('d-none');
  sectionGame.classList.add('d-none');
  sectionPause.classList.remove('d-none');
  sectionOver.classList.add('d-none');
}

function toOverGame() {
  sectionStart.classList.add('d-none');
  sectionGame.classList.add('d-none');
  sectionPause.classList.add('d-none');
  sectionOver.classList.remove('d-none');
}

let nameVirus = 0;
let intervalMakeVirus;
let intervalMoveVirus;
let moveVirus = (virus) => {
  let yPos = parseInt(window.getComputedStyle(virus).getPropertyValue('top'));
  intervalMoveVirus = setInterval(() => {
    yPos++;
    virus.style.top = `${yPos}px`;
    if (yPos > 700 - 100 - 50) {
      virus.remove();
      failEl.innerHTML = `Fail : ${fail}/3`;
      setVirusArr(virus, 'fail');
      if (fail == 3) {
        gameOver();
      }
    }
  }, 10);
};

let makeVirus = () => {
  intervalMakeVirus = setInterval(() => {
    nameVirus++;
    let newVirus = document.createElement('img');
    newVirus.src = 'images/virus.png';
    newVirus.classList.add('virus');
    newVirus.classList.add(`virus-${nameVirus}`);
    allBoard[Math.floor(Math.random() * allBoard.length)].appendChild(newVirus);
    moveVirus(newVirus);
    allVirus.push(Array.from(newVirus.classList)[1]);
    console.log(allVirus);
  }, 2000);
};

function setVirusArr(virus, action) {
  if (allVirus.includes(Array.from(virus.classList)[1])) {
    allVirus.splice(allVirus.indexOf(Array.from(virus.classList)[1]), 1);
    console.log(allVirus);
    if (action == 'score') {
      score++;
    } else if (action == 'fail') {
      fail++;
    }
  }
}

let allIntervals = [];
let allVirusOnPause = [];

let startGame = async () => {
  makeVirus();
  timer();
  toSectionGame();
  console.log(allIntervals);
};
let pauseTheGame = () => {
  toPauseGame();
  clearInterval(intervalTimer);
  clearInterval(intervalMoveVirus);
  clearInterval(intervalMakeVirus);
  allVirus.map((virus) => {
    let virusOnBoard = document.querySelector(`.virus.${virus}`);
    if (virusOnBoard) {
      let xPos = virusOnBoard.style.top;
      let className = virusOnBoard.className;
      allVirusOnPause = [];
      allVirusOnPause.push({ class: className, top: xPos });
      allVirusOnPause.map((item) => {});
    }
  });
};

let continueGame = () => {
  makeVirus();
  toSectionGame();
};
let gameOver = () => {
  toOverGame();
  clearInterval(intervalTimer);
  clearInterval(intervalMoveVirus);
  clearInterval(intervalMakeVirus);
  document.querySelector('.final-score').innerHTML = 'Score : ' + score;
  document.querySelector('.final-timer').innerHTML = finalTimer;
  document.querySelector('.final-name').innerHTML = 'Name : ' + fieldName.value;
  second = 0;
  centiSecond = 0;
  timerEl.innerHTML = '00 : 00';
  fail = 0;
  failEl.innerHTML = `Fail : 0`;
  document.querySelectorAll('.virus').forEach((item) => {
    item.remove();
  });
};
let restartGame = () => {
  document.querySelectorAll('.virus').forEach((item) => {
    item.remove();
  });
  toSectionStart();
  fail = 0;
  second = 0;
  centiSecond = 0;
  timerEl.innerHTML = '00 : 00';
  failEl.innerHTML = `Fail : 0`;
  fieldName.value = '';
};
window.addEventListener('keydown', keyDown, false);
