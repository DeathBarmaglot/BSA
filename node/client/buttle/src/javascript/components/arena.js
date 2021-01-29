import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import { showWinnerModal } from './modal/winner';
import { setControls } from './modal/controls';

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);
  let buttleResult = fight(...selectedFighters);

  buttleResult.then(
    result => {
      let loser;
      if (result == selectedFighters[0]) loser = selectedFighters[1]
      else loser = selectedFighters[0];
      let data = JSON.stringify({fighter1: result.id, fighter2: loser.id, log: [sessionStorage.getItem("userId"), new Date(), result.pushes, loser.pushes, Math.round(result.health), Math.round(loser.health)]});
      let req = new XMLHttpRequest();
      req.open("post", "/api/fights/", true);   
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data); 
      showWinnerModal(result);
    }
  );

  // todo:
  // - start the fight
  // - when fight is finished show winner
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'button', className: 'arena___versus-sign' });
  versusSign.innerText = 'Controls';
  versusSign.addEventListener('click', setControls, false);
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });
  fighterElement.append(imgElement);
  return fighterElement;
}
