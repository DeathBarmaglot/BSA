function request(action) {
  let req = new XMLHttpRequest();
  req.open("GET", action, true);   
  req.setRequestHeader("Content-Type", "application/json");            
  req.send();
  return new Promise((resolve,reject) => {
      req.addEventListener("load", function () {
          if (req.status == 200) resolve(req.response)
          else reject(req.response);
      }); 
  });
}

export function loadFigthersData() {
  return new Promise(((resolve, reject) => {
    let reqs = [request("/api/fighters"),request("/api/details")];
    Promise.all(reqs)
    .then(responses => {
        fighters = JSON.parse(responses[0]);
        fightersDetails = JSON.parse(responses[0]);
        let details = JSON.parse(responses[1]);
        for (let i=0; i < fighters.length; i++) {
          let detail = details.find((item) => { return (item.id == fighters[i].id) });
          fighters[i].attack = fighters[i].power;
          if (detail) fighters[i].source = detail.source
          else fighters[i] = "";
          fightersDetails[i].attack = fighters[i].power;
        }
        resolve(fighters);
    }).catch(alert);
  }));
}

function loadControlsData() {
  request('/api/controls')
    .then(response => {
        const data = JSON.parse(response);
        if (data) {
          for (const key in controls) {
            if (data[key]) {
              controls[key] = data[key];
            }
          }
        }
    }).catch(alert);
}

loadControlsData();

export var fighters;
export var fightersDetails;
export const controls = {
  PlayerOneAttack: 'KeyA',
  PlayerOneBlock: 'KeyD',
  PlayerTwoAttack: 'KeyJ',
  PlayerTwoBlock: 'KeyL',
  PlayerOneCriticalHitCombination: ['KeyQ', 'KeyW', 'KeyE'],
  PlayerTwoCriticalHitCombination: ['KeyU', 'KeyI', 'KeyO']
}
