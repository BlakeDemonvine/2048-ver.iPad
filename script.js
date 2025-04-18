let k;
let l;
let score = 0;
let arr = [];

function scramble(n, m) {
  for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j < m; j++) {
      arr[i][j] = 0;
    }
  }
  for(let i = 0 ; i<2 ; i++){
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * m);
    let temp = Math.floor(Math.random() *4);
    if(arr[x][y]!=0){
      i--;
      continue;
    }
    if(temp==1){
      arr[x][y] = 4;
    }
    else{
      arr[x][y] = 2;
    }
  }
}

function loadPage(page) {
  let n = document.getElementById("ln").value;
  let m = document.getElementById("wd").value;
  score = 0;
  k = m;
  l = n;
  if(n > 17 || m > 17 || n < 3 || m < 3){
    document.getElementById('wrong').innerHTML = 'Please Enter Range Between 3~17';
  }
  else {
    scramble(n, m);

    let input = `<div id="try"><p id="timer">Score: ${score}</p>`;
    input += '<div id="gamePage" style="grid-template-columns: repeat(' + m + ', 1fr);">';

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let value = arr[i][j];
        let isEmpty = value === 0;
        let className = isEmpty ? "empty" : "";
        let displayText = isEmpty ? "" : value;
        if(value==2){
          className ='two';
        }
        else if(value==4){
          className ='four';
        }
        input += `<button class="${className}" id="m${i}m${j}">${displayText}</button>`;
      }
    }

    input += "</div><div id='forIpad'><button onclick='go(`top`)'>↑</button><button onclick='go(`down`)'>↓</button><button onclick='go(`right`)'>→</button><button onclick='go(`left`)'>←</button></div></div>";
    document.getElementById('content').innerHTML = input;
  }
}

document.addEventListener("keydown", function (event) {
  const rowCount = arr.length;
  const colCount = arr[0].length;

  // 核心處理一行往左
  function moveRowLeft(row) {
    let newRow = row.filter(v => v !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        score+=newRow[i];
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    newRow = newRow.filter(v => v !== 0);
    while (newRow.length < row.length) {
      newRow.push(0);
    }
    return newRow;
  }

  function rotateClockwise(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]).reverse());
  }

  function rotateCounterClockwise(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[row.length - 1 - colIndex]));
  }

  switch (event.key) {
    case "ArrowUp":
      arr = rotateCounterClockwise(arr);
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i]);
      }
      arr = rotateClockwise(arr);
      break;

    case "ArrowDown":
      arr = rotateCounterClockwise(arr);
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i].reverse()).reverse();
      }
      arr = rotateClockwise(arr);
      break;

    case "ArrowLeft":
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i]);
      }
      break;

    case "ArrowRight":
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i].reverse()).reverse();
      }
      break;
  }

  show(rowCount, colCount);
});


const classMap = {
  0: 'empty',
  2: 'two',
  4: 'four',
  8: 'eight',
  16: 'sixteen',
  32: 'thirtytwo',
  64: 'sixtyfour',
  128: 'onetwentyeight',
  256: 'twofiftysix',
  512: 'fivetwelve',
  1024: 'onethousandtwentyfour',
  2048: 'twothousandfortyeight',
};

function addOne(n, m) {
  for(let i = 0 ; i<1 ; i++){
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * m);
    let temp = Math.floor(Math.random() *4);
    if(arr[x][y]!=0){
      i--;
      continue;
    }
    if(temp==1){
      arr[x][y] = 4;
    }
    else{
      arr[x][y] = 2;
    }
  }
}

function show(n,m){
  addOne(n, m)
  document.getElementById('timer').innerHTML= `Score: ${score*2}`;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const val = arr[i][j];
      const el = document.getElementById(`m${i}m${j}`);
      el.className = "";
      if(val>=4096){
        el.classList.add('super');
      }
      else if (classMap[val]) {
        el.classList.add(classMap[val]);
      }
      if(val==0){
        el.innerHTML = "";
      }
      else{
        el.innerHTML = val;
      }
    }
  }
}

function go(direction){
  const rowCount = arr.length;
  const colCount = arr[0].length;

  function moveRowLeft(row) {
    let newRow = row.filter(v => v !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        score+=newRow[i];
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    newRow = newRow.filter(v => v !== 0);
    while (newRow.length < row.length) {
      newRow.push(0);
    }
    return newRow;
  }

  function rotateClockwise(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]).reverse());
  }

  function rotateCounterClockwise(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[row.length - 1 - colIndex]));
  }

  switch (direction) {
    case "top":
      arr = rotateCounterClockwise(arr);
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i]);
      }
      arr = rotateClockwise(arr);
      break;

    case "down":
      arr = rotateCounterClockwise(arr);
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i].reverse()).reverse();
      }
      arr = rotateClockwise(arr);
      break;

    case "left":
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i]);
      }
      break;

    case "right":
      for (let i = 0; i < rowCount; i++) {
        arr[i] = moveRowLeft(arr[i].reverse()).reverse();
      }
      break;
  }

  show(rowCount, colCount);
}