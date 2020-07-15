'use strict';
const game0Divided = document.getElementById('game-area0');
const game1Divided = document.getElementById('game-area1');
//ブーメラン位置
let bumex = 230;
let bumey = 50;
let bumez = 0;

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
  ['gaku.png', 170, 20],
  ['bume.png', bumex, bumey],
  ['front.png', 0, 0]
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
        ctx.drawImage(images[j], srcs[j][1], srcs[j][2]);
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
  
  //translateメソッド前の設定を保存
  ctx0.save();
  ctx0.translate(parseInt(bumex), parseInt(bumey)); 
  ctx0.rotate((bumez * Math.PI) / 180);
  ctx0.drawImage(images[2], -13, -30);
  //translateメソッド前の設定に戻す
  ctx0.restore();
  ctx.drawImage(images[3], srcs[3][1], srcs[3][2]);
}

step();
//画面の描写

//クリック
let point = 0;
canvas[2].addEventListener('click', e => {
  //マウスの座標をカンバス内の座標と合わせる
  const rect = canvas[2].getBoundingClientRect();
  point = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  rolestart();
})
let back = false;
function role(){
  if (back){
  bumex = bumex + 0;
  bumey = bumey - 5;
  bumez = bumez + 33; 
  }else{
    bumey = bumey + 5;
    bumez = bumez + 33;
  }
  if (bumey > 400){
    back = true;
  }else if (bumey == 50){
    back = false;
    bumez = 0;
    clearInterval(moveing);
  }
}
let moveing = 0;
function rolestart(){
  function roleng(){
    moveing = setInterval(role,1000/30);
  }
  roleng();
}