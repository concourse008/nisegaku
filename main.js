'use strict';
const game0Divided = document.getElementById('game-area0');
const game1Divided = document.getElementById('game-area1');
let op = true;
let result = false;
//ブーメラン位置
let bumex = 215;
let bumey = 70;
let bumez = 0;
let point = 0;

let time = 30;
let timecount = 0;
let baloon00 = [400, 400, 400, 400, 400, 400, 400]//X値
let baloon01 = [-30, -30, -30, -30, -30, -30, -30]//X値
let baloon02 = [400, 400, 400, 400, 400, 400, 400]//X値
let baloon03 = [-30, -30, -30, -30, -30, -30, -30]//X値
let baloon04 = [400, 400, 400, 400, 400, 400, 400]//X値
let baloontuy = [400, 400, 410, 410, 410, 410, 410]//X値
let baloonnise = [-30, -30, -30, -30, -30, -30, -30]//X値
let baloongold = [400, 400, 400, 400, 400, 400, 400]//X値

//画像読み込み
const canvas = {
  0: document.getElementById("canvas1"),
  1: document.getElementById("canvas2"),
  2: document.getElementById("canvas0")//入力用
};
let flip = 0;
canvas[1 - flip].style.visibility = 'hidden';
canvas[flip].style.visibility = 'visible';
canvas[2].style.visibility = 'visible';
flip = 1 - flip;
let ctx = canvas[flip].getContext('2d');
const ctx0 = canvas[2].getContext('2d');
const srcs = [//画像一覧
  ['back.png', 0, 0],
  ['gaku.png', 155, 40],
  ['bume.png', bumex, bumey],
  ['front.png', 0, 0],
  ['baloon0.png', 155, 250],
  ['baloontuy.png', 155, 250],
  ['baloonnisetuy.png', 155, 250],
  ['gold.png', 155, 250],
  ['reset.png', 0, 0],
  ['op.png', 0, 0]
];
let images = [];
for (let i in srcs) {
  images[i] = new Image();
  images[i].src = srcs[i][0];
}
let loadedCount = 1;
for (let i in images) {
  images[i].addEventListener('load', function () {
    if (loadedCount == images.length) {
      for (let j in images) {
        ctx0.drawImage(images[j], srcs[j][1], srcs[j][2]);
      }
    }
    loadedCount++;
  }, false);
}
//画像読み込み

//画面の描写
function step() {
  window.requestAnimationFrame(step);
  canvas[1 - flip].style.visibility = 'hidden';
  canvas[flip].style.visibility = 'visible';
  flip = 1 - flip;
  ctx = canvas[flip].getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
  ctx0.clearRect(0, 0, 400, 400);
  ctx.drawImage(images[0], srcs[0][1], srcs[0][2]);
  ctx.drawImage(images[1], srcs[1][1], srcs[1][2]);
  ctx0.save();
  ctx0.translate(parseInt(bumex), parseInt(bumey));
  ctx0.rotate((bumez * Math.PI) / 180);
  ctx0.drawImage(images[2], -13, -30);
  ctx0.restore();
  for (let i = 0; i < baloon00.length; i++) {
    ctx.drawImage(images[4], baloon00[i], 220);//風船０
    ctx.drawImage(images[4], baloon01[i], 250);//風船０
    ctx.drawImage(images[4], baloon02[i], 280);//風船０
    ctx.drawImage(images[4], baloon03[i], 310);//風船０
    ctx.drawImage(images[4], baloon04[i], 340);//風船０
    ctx.drawImage(images[5], baloontuy[i], 280);//風船刀也
    ctx.drawImage(images[6], baloonnise[i], 310);//風船ニセ
    ctx.drawImage(images[7], baloongold[i], 340);//金風船
  }
  ctx.drawImage(images[3], srcs[3][1], srcs[3][2]);
  //スコア表示
  ctx.lineWidth = 0.5;
  ctx.fillStyle = "#900";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(`point: ${point}`, 250, 395);
  ctx.strokeStyle = "#fff";
  ctx.strokeText(`point: ${point}`, 250, 395);
  //時間表示
  ctx.lineWidth = 1;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px sans-serif";
  ctx.fillText("残り: " + time + " 秒", 5, 30);
  ctx.strokeStyle = "#000";
  ctx.strokeText("残り: " + time + " 秒", 5, 30);
  if (result) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "#900";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText("GAME OVER", 70, 150);
    ctx.strokeStyle = "#fff";
    ctx.strokeText("GAME OVER", 70, 150);
    ctx.drawImage(images[8], 125, 180);
  }
}
//画面の描写

//クリック
let clickok = true;
let clickpoint = 0;
canvas[2].addEventListener('click', e => {
  //マウスの座標をカンバス内の座標と合わせる
  const rect = canvas[2].getBoundingClientRect();
  clickpoint = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  if (op) {
    start();
  } else if (result && clickpoint.x >= 125 && clickpoint.x <= 275 && clickpoint.y >= 180 && clickpoint.y <= 260) {
    restart();
  } else if (clickok) {
    clickok = false;
    rolestart();
  } else { }
})
let back = false;
function role() {
  if (back) {
    bumex = bumex - 0;
    bumey = bumey - 7;
    bumez = bumez + 32;
  } else {
    bumex = bumex + 0;
    bumey = bumey + 7;
    bumez = bumez + 32;
  }
  if (bumey > 380) {
    back = true;
  } else if (bumey == 70) {
    back = false;
    bumez = 0;
    clearInterval(moveing);
    if (time <= 0) {
    } else {
      clickok = true;
    }
  }
}
function lrole() {
  if (back) {
    bumex = bumex + 3;
    bumey = bumey - 7;
    bumez = bumez + 32;
  } else {
    bumex = bumex - 3;
    bumey = bumey + 7;
    bumez = bumez + 32;
  }
  if (bumey > 380) {
    back = true;
  } else if (bumey == 70) {
    back = false;
    bumez = 0;
    clearInterval(moveing);
    if (time <= 0) {
    } else {
      clickok = true;
    }
  }
}
function rrole() {
  if (back) {
    bumex = bumex - 3;
    bumey = bumey - 7;
    bumez = bumez + 32;
  } else {
    bumex = bumex + 3;
    bumey = bumey + 7;
    bumez = bumez + 32;
  }
  if (bumey > 380) {
    back = true;
  } else if (bumey == 70) {
    back = false;
    bumez = 0;
    clearInterval(moveing);
    if (time <= 0) {
    } else {
      clickok = true;
    }
  }
}
let moveing = 0;
function rolestart() {
  if(clickpoint.x < 130){
    function lroleng() {
      moveing = setInterval(lrole, 1000 / 30);
    }
    lroleng();
  }else if (clickpoint.x <270){
    function roleng() {
      moveing = setInterval(role, 1000 / 30);
    }
    roleng();
  }else{
    function rroleng() {
      moveing = setInterval(rrole, 1000 / 30);
    }
    rroleng();
  }
}

//風船の移動
let lastgo = 0;
let lastgold = 0;
let goldspace = 2000;
let tuy = 0;
function bal0() {
  for (let i in baloon00) {
    /*if (baloon00[i] == 410){

    } else */if (baloon00[i] == 400) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 150) {
        baloon00[i] = baloon00[i] - 10;
        lastgo = 0;
      }
    } else if (baloon00[i] <= 0) {
      baloon00[i] = 400;
    } else {
      baloon00[i] = baloon00[i] - 3;
    }
    if ((bumex - baloon00[i] - 17) ** 2 + (220 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloon00[i] = 400;
      point++
    }
    lastgo++;
  }
}
function bal1() {
  for (let i in baloon01) {
    /*if (baloon01[i] == -40){

    } else */if (baloon01[i] == -30) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 150) {
        baloon01[i] = baloon01[i] + 10;
        lastgo = 0;
      }
    } else if (baloon01[i] >= 400) {
      baloon01[i] = -30;
    } else {
      baloon01[i] = baloon01[i] + 3;
    }
    if ((bumex - baloon01[i] - 17) ** 2 + (250 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloon01[i] = -30;
      point++
    }
    lastgo++;
  }
}
function bal2() {
  for (let i in baloon02) {
    /*if (baloon02[i] == 410){

    } else */if (baloon02[i] == 400) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 150) {
        baloon02[i] = baloon02[i] - 10;
        lastgo = 0;
      }
    } else if (baloon02[i] <= -20) {
      baloon02[i] = 400;
    } else {
      baloon02[i] = baloon02[i] - 2;
    }
    if ((bumex - baloon02[i] - 17) ** 2 + (280 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloon02[i] = 400;
      point++
    }
    lastgo++;
  }
}
function bal3() {
  for (let i in baloon03) {
    /*if (baloon03[i] == -40){

    } else */if (baloon03[i] == -30) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 150) {
        baloon03[i] = baloon03[i] + 10;
        lastgo = 0;
      }
    } else if (baloon03[i] >= 400) {
      baloon03[i] = -30;
    } else {
      baloon03[i] = baloon03[i] + 2;
    }
    if ((bumex - baloon03[i] - 17) ** 2 + (310 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloon03[i] = -30;
      point++
    }
    lastgo++;
  }
}
function bal4() {
  for (let i in baloon04) {
    /*if (baloon04[i] == 410){

    } else */if (baloon04[i] == 400) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 300) {
        baloon04[i] = baloon04[i] - 10;
        lastgo = 0;
      }
    } else if (baloon04[i] <= -20) {
      baloon04[i] = 400;
    } else {
      baloon04[i] = baloon04[i] - 2;
    }
    if ((bumex - baloon04[i] - 17) ** 2 + (340 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloon04[i] = 400;
      point++
    }
    lastgo++;
  }
}
function baltuy() {
  for (let i in baloontuy) {
    if (baloontuy[i] == 410) {
    } else if (baloontuy[i] == 400) {
      if (Math.floor(Math.random() * 30) === 0 && lastgo >= 300) {
        baloontuy[i] = baloontuy[i] - 10;
        lastgo = 0;
      }
    } else if (baloontuy[i] <= -20) {
      baloontuy[i] = 400;
    } else {
      baloontuy[i] = baloontuy[i] - 2;
    }
    if ((bumex - baloontuy[i] - 17) ** 2 + (280 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloontuy[i] = 400;
      time = time - 4;
      tuy++
      if (tuy == 3) {
        goldspace = 210;
      }
    }
    lastgo++;
  }
}
function balnise() {
  for (let i in baloonnise) {
    /*if (baloon04[i] == 410){

    } else */if (baloonnise[i] == -30) {
      if (Math.floor(Math.random() * 20) === 0 && lastgo >= 300) {
        baloonnise[i] = baloonnise[i] + 10;
        lastgo = 0;
      }
    } else if (baloonnise[i] >= 400) {
      baloonnise[i] = -30;
    } else {
      baloonnise[i] = baloonnise[i] + 2;
    }
    if ((bumex - baloonnise[i] - 17) ** 2 + (310 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloonnise[i] = -30;
      time = time + 2;
    }
    lastgo++;
  }
}
function balgold() {
  for (let i in baloongold) {
    if (baloongold[i] == 410) {
    } else if (baloongold[i] == 400) {
      if (/*Math.floor(Math.random() * 30) === 0 && */lastgold >= goldspace) {
        baloongold[i] = baloongold[i] - 10;
        lastgold = 0;
      }
    } else if (baloongold[i] <= -20) {
      baloongold[i] = 400;
    } else {
      baloongold[i] = baloongold[i] - 1;
    }
    if ((bumex - baloongold[i] - 17) ** 2 + (340 + 12 - bumey) ** 2 <= 1400) {//命中範囲
      baloongold[i] = 400;
      point = point + 10;
    }
    lastgold++;
  }
}
function times() {
  timecount++
  if (timecount == 30) {
    time = time - 1;
    timecount = 0;
    if (time <= 0) {
      time = 0;
      if (bumey == 70 && !result) {
        end();
      }
    }
  }
}
let balmoveing = 0;
function baloonstart() {
  function balmove() {
    balmoveing = setInterval(bal0, 1000 / 30);
    balmoveing = setInterval(bal1, 1000 / 30);
    balmoveing = setInterval(bal2, 1000 / 30);
    balmoveing = setInterval(bal3, 1000 / 30);
    balmoveing = setInterval(bal4, 1000 / 30);
    balmoveing = setInterval(baltuy, 1000 / 30);
    balmoveing = setInterval(balnise, 1000 / 30);
    balmoveing = setInterval(balgold, 1000 / 30);
    balmoveing = setInterval(times, 1000 / 30);
  }
  balmove();
}
function start() {
  op = false;
  step();
  baloonstart();
}
function end() {
  clickok = false;
  result = true;
  //tweet();
}
function restart() {
  result = false;
  clickok = true;
  bumey = 70;
  bumez = 0;
  point = 0;
  time = 30;
  timecount = 0;
  baloon00 = [400, 400, 400, 400, 400, 400, 400]//X値
  baloon01 = [-30, -30, -30, -30, -30, -30, -30]//X値
  baloon02 = [400, 400, 400, 400, 400, 400, 400]//X値
  baloon03 = [-30, -30, -30, -30, -30, -30, -30]//X値
  baloon04 = [400, 400, 400, 400, 400, 400, 400]//X値
  baloontuy = [400, 400, 410, 410, 410, 410, 410]//X値
  baloonnise = [-30, -30, -30, -30, -30, -30, -30]//X値
  baloongold = [400, 400, 400, 400, 400, 400, 400]//
  lastgo = 0;
  lastgold = 0;
  goldspace = 2000;
  tuy = 0;
}

//ツイートボタン
const tweetDivided = document.getElementById('tweet-area');
function tweet() {
  while (tweetDivided.firstChild) {
    tweetDivided.removeChild(tweetDivided.firstChild);
  }
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('にせガクブーメラン') + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('herf', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', 'ブーメランを使い、' + point + 'ポイントの風船を撃墜した。悪い心を持つが仲間思いの一面も。髪の毛は銅板でできているらしい。');
  anchor.setAttribute('data-size', "large");
  anchor.setAttribute('data-url', "https://concourse008.github.io/nisegaku/index.html");
  anchor.innerText = 'Tweet #にせガクのブーメラン';
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
  tweetDivided.appendChild(anchor);
}
