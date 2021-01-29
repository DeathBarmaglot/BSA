import { createElement } from '../helpers/domHelper';
import { fighters, controls } from '../helpers/apiHelper';

export async function fight(firstFighter, secondFighter) {
    let root = document.getElementById('root');
    let keys = new Set;
    let fighterImg = document.getElementsByClassName("arena___fighter");
    let fighterHelth = document.getElementsByClassName("arena___health-bar");
    let params = { 
      tagName: "img", 
      className: "fighter-shield__show", 
      attributes: { "src": "Img/shield.png", alt: "shield" }
    };     
    let shields = [createElement(params),createElement(params)];
    let curr = 0;
    shields[0].style.left = "23%";
    shields[1].style.right = "23%";    
    fighterHelth[0].parentElement.style.backgroundColor = "red";
    fighterHelth[1].parentElement.style.backgroundColor = "red";
    firstFighter = Object.assign(firstFighter,{"fighterImg":fighterImg[0],"shieldImg":shields[0],"bar":fighterHelth[0],"currHealth":firstFighter.health,"lastCombHit":0,"block":false,"pushes":0});
    secondFighter = Object.assign(secondFighter,{"fighterImg":fighterImg[1],"shieldImg":shields[1],"bar":fighterHelth[1],"currHealth":secondFighter.health,"lastCombHit":0,"block":false,"pushes":0});
    root.append(...shields);
    let bumbleA = createElement({
      tagName: "img",
      attributes: { "src": "Img/bumbleA.png", alt: "left bubble" }
    });
    let bumbleB = createElement({
      tagName: "img",
      attributes: { "src": "Img/bumbleB.png", alt: "left flash" }
    });
    let bumbleC = createElement({
      tagName: "img",
      attributes: { "src": "Img/bumbleC.png", alt: "right bubble" }
    });
    let bumbleD = createElement({
      tagName: "img",
      attributes: { "src": "Img/bumbleD.png", alt: "right flash" }
    });
    window.addEventListener('keydown',keyDownFunction);
    window.addEventListener('keyup',keyUpFunction);
    bumbleA.addEventListener("animationend",playerLeftAttackBumm,false);
    bumbleB.addEventListener("animationend",playerLeftAttackEnd,false);
    bumbleC.addEventListener("animationend",playerRightAttackBumm,false);
    bumbleD.addEventListener("animationend",playerRightAttackEnd,false);
    let loggL = false;
    let loggR = false;
    let loggCombL = false;
    let loggCombR = false;
    let audios = [];
    for (let i=1; i<=5; i++) {
      let audio = document.createElement("audio");
      audio.innerHTML = '<source src="name.mp3" type="audio/mpeg"></source>';
      audio.src = "Sounds/sound"+i+".mp3";
      audios.push(audio);
    } 

  return new Promise((resolve) => {
    root.addEventListener("winner",(event) => resolve(event.delegateTarget));
  });

  function keyDownFunction(event) {
    keys.add(event.code);
    switch(event.code) {
      case controls.PlayerOneAttack : 
        playerLeftAttack();
        break;
      case controls.PlayerTwoAttack : 
        playerRightAttack();
        break;
      case controls.PlayerOneBlock : 
        playerBlock(firstFighter,true);
        break;
      case controls.PlayerTwoBlock : 
        playerBlock(secondFighter,true);
        break;
      default :
        if (controls.PlayerOneCriticalHitCombination.indexOf(event.code) >= 0) playerLeftCombAttack()
        else 
        if (controls.PlayerTwoCriticalHitCombination.indexOf(event.code) >= 0) playerRightCombAttack()
        else ;
    }
  }
  function keyUpFunction(event) {
    keys.delete(event.code);
    if (event.code == controls.PlayerOneBlock) playerBlock(firstFighter,false)
    else 
    if (event.code == controls.PlayerTwoBlock) playerBlock(secondFighter,false)
    else ;
  }
  function playerLeftAttack() {
    if ((!loggL)&&(!firstFighter.block)) {
      firstFighter.fighterImg.style.transform = "translate(25%, 0)";
      bumbleA.className = "fighter-bumble__left";
      bumbleA.style.height = loggCombL ? "400px" : "200px";
      bumbleA.style.bottom = loggCombL ? "200px" : "350px";
      root.append(bumbleA);
      loggL = true;
      playerAttacSound();
    }
  }
  function playerLeftAttackBumm() {
    if (loggL) {
      bumbleB.className = "fighter-bumble-bumm__left";
      bumbleB.style.height = loggCombL ? "400px" : "200px";
      bumbleB.style.bottom = loggCombL ? "200px" : "350px";
      root.append(bumbleB);
    }
  }
  function playerLeftAttackEnd() {
    firstFighter.fighterImg.style.transform = "";
    root.removeChild(bumbleA);
    root.removeChild(bumbleB);
    bumbleA.className = "";
    bumbleB.className = "";
    controlDamage(firstFighter,secondFighter,loggCombL);
    loggL = false;
    loggCombL = false;
  }
  function playerRightAttack() {
    if ((!loggR)&&(!secondFighter.block)) {
      secondFighter.fighterImg.style.transform = "translate(-25%, 0)";
      bumbleC.className = "fighter-bumble__right";
      bumbleC.style.height = loggCombR ? "400px" : "200px";
      bumbleC.style.bottom = loggCombR ? "200px" : "350px";
      root.append(bumbleC);
      loggR = true;
      playerAttacSound(); 
    }
  }
  function playerRightAttackBumm() {
    if (loggR) {
      bumbleD.className = "fighter-bumble-bumm__right";
      bumbleD.style.height = loggCombR ? "400px" : "200px";
      bumbleD.style.bottom = loggCombR ? "200px" : "350px";
      root.append(bumbleD);
    } 
  }
  function playerRightAttackEnd() {
    secondFighter.fighterImg.style.transform = "";
    root.removeChild(bumbleC);
    root.removeChild(bumbleD);
    bumbleC.className = "";
    bumbleD.className = "";
    controlDamage(secondFighter,firstFighter,loggCombR);
    loggR = false;
    loggCombR = false;
  }
  function timeLimitControl(attacker) {
    const data = (new Date()).getTime();
    let result = (data - attacker.lastCombHit) > 10000;
    if (result) attacker.lastCombHit = data;
    return result;
  }
  function playerLeftCombAttack() {
    let logg = true;
    controls.PlayerOneCriticalHitCombination.forEach((item) => { if (!keys.has(item)) logg = false });
    if ((logg)&&(!loggL)&&(!fighters[0].block)&&(timeLimitControl(firstFighter))) {
      loggCombL = true;
      playerLeftAttack();
    }
  }
  function playerRightCombAttack() {
    let logg = true;
    controls.PlayerTwoCriticalHitCombination.forEach((item) => { if (!keys.has(item)) logg = false });
    if ((logg)&&(!loggR)&&(!fighters[1].block)&&(timeLimitControl(secondFighter))) {
      loggCombR = true;
      playerRightAttack();
    }
  }
  function playerBlock(fighter, mode) {
    fighter.shieldImg.style.opacity = mode ? "1" : "0";
    fighter.block = mode;
  }
  function playerAttacSound() {
    let curr = 0;
    (loggCombL)||(loggCombR) ? curr=4 : curr = Math.trunc(4 * Math.random());
    audios[curr].play();
  }
  function controlDamage(attacker, defender, loggComb) {
    attacker.pushes++;
    let damage = 0;
    if (loggComb) damage = 2 * attacker.attack
    else 
    if (defender.block) damage = 0
    else damage = getDamage(attacker,defender);
    defender.health = defender.health - damage;
    defender.bar.style.width = 100 * (defender.health / defender.currHealth) +"%";
    if (defender.health <= 0) {
      window.removeEventListener('keydown',keyDownFunction);
      window.removeEventListener('keyup',keyUpFunction);
      if (attacker.health > 0) {
        let event = new Event("winner");
        event.delegateTarget = attacker;
        root.dispatchEvent(event);
      } else {
        let event = new Event("nowinner");
        root.dispatchEvent(event);
      }
    };
  }
}

export function getDamage(attacker, defender) {
  let result = getHitPower(attacker) - getBlockPower(defender);
  if (result < 0) result = 0;
  return result;
}

export function getHitPower(fighter) {
  const criticalHitChance = 1 + Math.random(); 
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = 1 + Math.random();
  return fighter.defense * dodgeChance;
}
