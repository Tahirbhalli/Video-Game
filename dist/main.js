!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=3)}([function(e,t){const i=(()=>{const e=e=>{const t=document.getElementById("results");document.getElementById("1").innerHTML="You",document.getElementById("2").innerHTML=localStorage.getItem("score"),e.result.forEach(e=>{const i=document.createElement("tr"),n=document.createElement("td"),s=document.createElement("td");n.innerHTML=e.user,s.innerHTML=e.score,i.appendChild(n),i.appendChild(s),t.appendChild(i)})};return{updatescore:e=>{localStorage.setItem("score",e)},set:()=>{fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/").then(e=>e.json()).then(t=>e(t)).catch(e=>console.log(e))},datatable:e}})();e.exports=i},function(e,t,i){e.exports=i.p+"1dd096f39a988e52ecb2e88395c6f078.png"},function(e,t,i){e.exports=i.p+"d7c8a43aea16f5528374512be7c603c8.png"},function(e,t,i){"use strict";i.r(t);var n={start:()=>{const e=document.createElement("div"),t=document.createElement("button");return t.id="btnrestart",t.innerText="Restart Game",t.addEventListener("click",()=>{window.location.reload()}),e.appendChild(t),e}},s=i(0),o=i.n(s);const r=i(1),a=i(2);let c,h,d;class l extends Phaser.Scene{constructor(){super("start game"),this.score=0,this.isover=0}preload(){this.load.image("food",r),this.load.image("body",a)}create(){const e=new Phaser.Class({Extends:Phaser.GameObjects.Image,initialize:function(e,t,i){Phaser.GameObjects.Image.call(this,e),this.setTexture("food"),this.setPosition(16*t,16*i),this.setOrigin(0),this.total=0,e.children.add(this)},eat(){this.total+=1}}),t=new Phaser.Class({initialize:function(e,t,i){this.headPosition=new Phaser.Geom.Point(t,i),this.body=e.add.group(),this.head=this.body.create(16*t,16*i,"body"),this.head.setOrigin(0),this.alive=!0,this.speed=(()=>{switch(document.querySelector("input").value){case"1":return 200;case"2":return 100;case 3:return 50}})(),this.moveTime=0,this.tail=new Phaser.Geom.Point(t,i),this.heading=3,this.direction=3},update(e){if(e>=this.moveTime)return this.move(e)},faceLeft(){0!==this.direction&&1!==this.direction||(this.heading=2)},faceRight(){0!==this.direction&&1!==this.direction||(this.heading=3)},faceUp(){2!==this.direction&&3!==this.direction||(this.heading=0)},faceDown(){2!==this.direction&&3!==this.direction||(this.heading=1)},move(e){switch(this.heading){case 2:this.headPosition.x=Phaser.Math.Wrap(this.headPosition.x-1,0,40);break;case 3:this.headPosition.x=Phaser.Math.Wrap(this.headPosition.x+1,0,40);break;case 0:this.headPosition.y=Phaser.Math.Wrap(this.headPosition.y-1,0,30);break;case 1:this.headPosition.y=Phaser.Math.Wrap(this.headPosition.y+1,0,30)}this.direction=this.heading,Phaser.Actions.ShiftPosition(this.body.getChildren(),16*this.headPosition.x,16*this.headPosition.y,1,this.tail);return Phaser.Actions.GetFirst(this.body.getChildren(),{x:this.head.x,y:this.head.y},1)?(this.alive=!1,!1):(this.moveTime=e+this.speed,!0)},grow(){this.body.create(this.tail.x,this.tail.y,"body").setOrigin(0)},collideWithFood(e){return this.head.x===e.x&&this.head.y===e.y&&(this.grow(),e.eat(),this.speed>20&&e.total%5==0&&(this.speed-=5),!0)},updateGrid(e){return this.body.children.each(t=>{const i=t.x/16,n=t.y/16;e[n][i]=!1}),e}});h=new e(this,3,4),c=new t(this,8,8),d=this.input.keyboard.createCursorKeys()}update(e,t){if(c.alive)d.left.isDown?c.faceLeft():d.right.isDown?c.faceRight():d.up.isDown?c.faceUp():d.down.isDown&&c.faceDown(),c.update(e)&&c.collideWithFood(h)&&this.repositionFood();else if(0===this.isover){this.isover=-1;const e=document.querySelector("canvas");document.body.removeChild(e),document.body.appendChild(n.start())}}repositionFood(){this.score+=1,o.a.updatescore(this.score),o.a.set(),document.getElementById("score").innerHTML=this.score;const e=[];for(let t=0;t<30;t+=1){e[t]=[];for(let i=0;i<40;i+=1)e[t][i]=!0}c.updateGrid(e);const t=[];for(let i=0;i<30;i+=1)for(let n=0;n<40;n+=1)!0===e[i][n]&&t.push({x:n,y:i});if(t.length>0){const e=Phaser.Math.RND.pick(t);return h.setPosition(16*e.x,16*e.y),!0}return!1}}var u=l;const p={type:Phaser.WEBGL,width:640,height:480,backgroundColor:"#bfcc00",parent:"phaser-example",scene:[u]};var f=()=>new Phaser.Game(p);const m=document.querySelector("button");m.addEventListener("click",()=>{f(),m.style.display="none",document.querySelector("input").style.display="none",document.querySelector("span").style.display="none"}),o.a.set()}]);