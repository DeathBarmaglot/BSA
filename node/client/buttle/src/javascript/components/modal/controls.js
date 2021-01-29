import { createElement } from '../../helpers/domHelper';
import { controls } from '../../helpers/apiHelper';
import { showModal } from './modal';

const leftData = [
  { idd: 'PlayerOneAttack', caps: 'Left Palayer Attack' },
  { idd: 'PlayerOneBlock', caps: 'Left Palayer Block' },
  { idd: 'PlayerOneCriticalHitCombination', caps: 'Palayer Critical Hit' }
]
const rightData = [
  { idd: 'PlayerTwoAttack', caps: 'Right Palayer Attack' },
  { idd: 'PlayerTwoBlock', caps: 'Right Palayer Block' },
  { idd: 'PlayerTwoCriticalHitCombination', caps: 'Palayer Critical Hit' }
]
const inputs = [];
const keys = new Set;

function keyDownFunction(event) {
  if (event.code.indexOf('Key') >= 0) {
    inputs.forEach(elem => {
      if (elem.id !== event.target.id) {
        if (elem.value.indexOf(event.code) >= 0) elem.value = '';
      }
    });
    if (event.target.id.indexOf('Critical') > 0) {
      if (keys.size === 0) {
        event.target.value = event.code;
      } else {
        if (event.target.value.indexOf(event.code) < 0) {
          event.target.value += `,${event.code}`;
        }
      }
    } else {
      event.target.value = event.code;
    }
    keys.add(event.code);
  }
  if (event.code !== 'Tab') event.preventDefault();
  event.stopPropagation();
}
function keyUpFunction(event) {
  keys.delete(event.code);
}

export const setControls = () => {
  const bodyElement = createBodyElement();
  showModal({ title: 'Select controls : ', bodyElement });
}

function saveControls() {
  inputs.forEach(elem => {
    if (elem.id.indexOf('Critical') > 0) {
      controls[elem.id] = elem.value.split(',')
    } else {
      controls[elem.id] = elem.value
    }
  })
  const data = JSON.stringify(controls);
  const req = new XMLHttpRequest();
  req.open('post', '/api/controls', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(data);
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal?.remove();
}

function createBodyElement() {
  const container = createElement({ tagName: 'div', className: 'controls_container' });
  const leftBox = createElement({ tagName: 'div', className: 'controls_box' });
  createControlElement(leftBox, leftData);
  const rightBox = createElement({ tagName: 'div', className: 'controls_box' });
  createControlElement(rightBox, rightData);
  const boxLabel = createElement({ tagName: 'div', className: 'controls_label' });
  boxLabel.innerText = '\xa0\xa0\xa0 Select element and press a key\nor key combination.';

  const saveBtn = createElement({ tagName: 'button', className: 'controls_save_btn' });
  saveBtn.addEventListener('click', saveControls, false);
  saveBtn.innerText = 'Save';

  container.append(leftBox, rightBox, boxLabel, saveBtn);
  return container;
}

function createControlElement(container, data) {
  data.forEach(elem => {
    const nameLabel = createElement({ tagName: 'div', className: 'controls_input_label' });
    nameLabel.innerText = elem.caps;
    const input = createElement({ tagName: 'input', className: 'controls_input', attributes: { id: elem.idd, type: 'text' } });
    input.value = controls[elem.idd];
    input.addEventListener('keydown', keyDownFunction);
    input.addEventListener('keyup', keyUpFunction);
    inputs.push(input);
    const br = createElement({ tagName: 'br', className: 'controls_br' });
    container.append(nameLabel, input, br);
  });
  const infoLabel = createElement({ tagName: 'div', className: 'controls_input_label' });
  infoLabel.innerText = '( One hit in 10 seconds )'
  container.append(infoLabel);
  return container;
}
