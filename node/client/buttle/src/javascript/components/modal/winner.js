import { showModal } from './modal';
import App from '../../app';

export function showWinnerModal(fighter) {
  showModal({title: "Наш ПОБЕДИТЕЛЬ : "+fighter.name+" !! ", bodyElement: fighter.fighterImg, onClose: () => {
    document.location.href = "/client/pages/gloryHall.html";
  }}); 
}

export function showNoWinnerModal(nowinnerImg) {
  showModal({title:"Сегодня у нас победитея НЕТ ...", bodyElement: nowinnerImg, onClose: () => {
    document.getElementById('root').innerHTML = "";
    new App;
  }}); 
}