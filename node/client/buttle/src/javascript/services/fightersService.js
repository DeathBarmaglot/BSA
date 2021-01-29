import { createFighterPreview } from '../components/fighterPreview';
import { fighters, fightersDetails, loadFigthersData } from '../helpers/apiHelper';

class FighterService {
  static posPreview = ["left","right"];

  async getFighters() {
    try {
      const apiResult = await loadFigthersData();
      this.selectedFighters = [undefined,undefined];
      this.selectLast = false;
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    try {
      let fighter;
      for (let i=0; i < fighters.length; i++) {
        if (fighters[i].id == id) {
          fighter = fighters[i];
          break;
        }
      }
      if (fighter) {
        if ((!fighter.health)||(!fighters.attack)||(!fighters.defense)) 
          for (let i=0; i < fightersDetails.length; i++) {
            if (fightersDetails[i].id == id) {
              fighter.health = fightersDetails[i].health;
              fighter.attack = fightersDetails[i].attack;
              fighter.defense = fightersDetails[i].defense;
              break;
            }
          }
        let curr = this.selectLast ? 1 : 0;
        this.selectLast = !this.selectLast;
        this.selectedFighters[curr] = fighter;
        createFighterPreview(fighter, FighterService.posPreview[curr]);        
        return fighter;
      } else throw "Error";
    } catch (error) {
      alert("Error search fighter "+id+" !");
    };
  }

  async getSelectedFighters() {
    return Promise.resolve(this.selectedFighters);
  }

}

export const fighterService = new FighterService();
