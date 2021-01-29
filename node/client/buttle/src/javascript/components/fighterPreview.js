import { createElement } from '../helpers/domHelper';
import { fighters } from '../helpers/apiHelper';
import { fight } from './fight';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  let arena =  document.getElementById('root').firstChild;
  document.body.style.overflow = "hidden";
  removeFighterInfo(arena,position);
  arena.append(createFighterInfo(fighter,position));
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    title: name,
    alt: name,
    attributes,
  });

  return imgElement;
}

function createFighterInfo(fighter, position) {
  const fighterDiv = document.createElement("div");
  const mode = (position == "right")

  fighterDiv.id = `fighter-show__${position}`
  fighterDiv.className = "fighter-preview__show";
  if (fighter) {
    fighterDiv.appendChild(createFighterImage(fighter));
    if (mode) fighterDiv.firstChild.style = "transform: rotateY(180deg)";
    fighterDiv.appendChild(createFighterData("avatar","Боец",fighter.name));
    fighterDiv.appendChild(createFighterData("health","Здоровье",fighter.health));
    fighterDiv.appendChild(createFighterData("fist","Сила удара",fighter.attack));
    fighterDiv.appendChild(createFighterData("shield","Защита",fighter.defense));
  }
  return fighterDiv;
}

function createFighterData(fParam,fName,fData) {
  const dataDiv   = createElement({
    tagName: "div",
    className: "fighter-show__data"
  });
  const dataImg   = createElement({
    tagName: "img",
    className: "fighter-show__data_img",
    attributes: { "src": "Img/"+fParam.toLowerCase()+".png", alt: "info image"} 
  });
  const dataLabel = createElement({
    tagName: "label",
    className: "fighter-show__data_label"
  }); 

  dataLabel.innerText = fName+"  =>  "+fData;
  dataDiv.append(dataImg,dataLabel);
  return dataDiv;
}

function removeFighterInfo(arena,position) {
  const id = `fighter-show__${position}`;

  let oldInfo = document.getElementById(id);
  if (oldInfo) {
    arena.removeChild(oldInfo);
    oldInfo.id = "";
  }
}


