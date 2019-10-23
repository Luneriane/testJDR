// HTML
const addBtn = document.getElementById('addBtn');

const playersUl = document.getElementById('playersUl');
const ennemiesUl = document.getElementById('ennemiesUl');
const cemetaryUl = document.getElementById('cemetaryUl');

const simulBtn = document.getElementById('simulBtn');
const simulation = document.getElementById('simulation');

// Add caracters to lists
addBtn.addEventListener( 'click', () => {
    let characName = document.getElementById('nameInput').value;
    let characType = document.getElementById('typeInput').value;
    let characArchType = document.getElementById('archInput').value;
    let alertSpan = document.getElementById('alert');

    if (document.getElementById(characName)){
        alertSpan.innerText = "Ce nom est déjà pris";
    } else {
        alertSpan.innerText = "";
        const newLi = document.createElement('li');
    
        newLi.setAttribute('id', characName);
        switch (characArchType){
            case "tank" : newLi.innerText = characName + " - " + archetypes.tank.name; break
            case "dpsF" : newLi.innerText = characName + " - " + archetypes.dpsF.name; break
            case "dpsD" : newLi.innerText = characName + " - " + archetypes.dpsD.name; break
            case "dpsM" : newLi.innerText = characName + " - " + archetypes.dpsM.name; break
            case "heal" : newLi.innerText = characName + " - " + archetypes.heal.name; break
            case "pet" : newLi.innerText = characName + " - " + archetypes.pet.name;
        }
        switch(characType){
            case "player" : playersUl.appendChild(newLi); break
            case "ennemy" : ennemiesUl.appendChild(newLi);
        }
    }
});


// Objects
const archetypes = {
    tank : {name : "Défenseur", atkP : 2, atkM : 0, defP : 4, defM : 1, esq : 0, par : 4, vit : 4},
    dpsF : {name : "Attaquant force", atkP : 4, atkM : 1, defP : 3, defM : 0, esq : 2, par : 2, vit : 2},
    dpsD : {name : "Attaquant dextérité", atkP : 3, atkM : 1, defP : 2, defM : 1, esq : 4, par : 2, vit : 1},
    dpsM : {name : "Attaquant magique", atkP : 1, atkM : 4, defP : 1, defM : 4, esq : 2, par : 1, vit : 1},
    heal : {name : "Soigneur", atkP : 0, atkM : 4, defP : 1, defM : 4, esq : 2, par : 1, vit : 2},
    pet : {name : "Familier", atkP : 0, atkM : 0, defP : 0, defM : 0, esq : 0, par : 0, vit : -10},
};
let players = [];
let ennemies = [];
let cemetary = [];

class caracter{
    constructor(pseudo, type){
        this.name = pseudo;
        this.archetype = type;
        this.stats = {atkP : 0, atkM : 0, defP : 0, defM : 0, esq : 0, par : 0, hp : 20, hpMax : 20}

        function action(what, target){
            let touchDice = Math.floor(Math.random()*1000);
            touchDice = touchDice[0] + touchDice[1] + touchDice [2];
            if (action == "heal"){touchDice=15};
            if (touchDice >= 10){
                let actDice = Math.floor(Math.random()*1000);
                actDice = actDice[0] + actDice[1] + actDice[2];

                switch(what){
                    case atkP :
                        actDice = actDice + this.stats.atkP - target.stats.defP;
                    case atkM :
                        actDice = actDice + this.stats.atkM - target.stats.defM;
                    case heal :
                        actDice = actDice + this.stats.atkM;
                }

                switch(true){
                    case actDice > 24 :
                        target.hp = (target.hp - 3)
                        console.log(`${this.name} réussit son attaque(${actDice}) ! Il reste ${target.hp} à ${target.name}`)
                        break;
                    case actDice > 5 :
                        target.hp = (target.hp - 2)
                        console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                        break;
                    case actDice <= 5 :
                        target.hp = (target.hp - 1)
                        console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                        break;
                }
            } else {
                console.log(touchDice + " -> " + joueurs[player].name + " rate son attaque.");
            }
        }
    };
}

/*
let joueurs = [{name : "Sakuhane", atk : 4, def : 1, esq : 0, pv : 32}, 
            {name : "Ifrit", atk : 2, def : 0, esq : 0, pv : 15},
            {name : "Bran", atk : 4, def : 3, esq : 2, pv : 34}];
    let ennemies = [{name : "Ennemy 01", pv : 20},{name : "Ennemy 02", pv : 20}, {name : "Ennemy 03", pv : 20}, {name : "Ennemy ++", pv : 30}];
    const order = ["Sakuhane", "Ifrit", "Bran", "Ennemy 01", "Ennemy 02", "Ennemy 03", "Ennemy 04"]
    let target = 0
    let tour = 0;

simulBtn.addEventListener('click', () => {
    console.log(order)

    //Tours des joueurs
    for (let player in joueurs){

        if (ennemies[target].pv <= 0){target++};
        if (target > ennemies.length){target = 0};
        if (joueurs[player].pv == 0){player++};
        if (player > joueurs.length){player == 0};

        let touchDice = Math.floor(Math.random()*1000);
        console.log(touchDice + " -> " + joueurs[player].name + " attaque " + ennemies[target].name);
        if (touchDice > 300){
            let atkDice = Math.floor(Math.random()*1000);
            switch(true){
                case atkDice < 300 :
                    ennemies[target].pv = (ennemies[target].pv - 1)
                    console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                    break;
                case atkDice > 500 :
                    ennemies[target].pv = (ennemies[target].pv - 2)
                    console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                    break;
                case atkDice > 700 :
                    ennemies[target].pv = (ennemies[target].pv - 3)
                    console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                    break;
                case atkDice > 900 :
                    ennemies[target].pv = (ennemies[target].pv - 4)
                    console.log(`${atkDice} -> ${joueurs[player].name} touche ! Il reste ${ennemies[target].pv} à ${ennemies[target].name}`)
                    break;
                default :
                    console.log(atkDice);
            }
        } else {
            console.log(touchDice + " -> " + joueurs[player].name + " rate son attaque.");
        }
        
        if (ennemies[0].pv + ennemies[1].pv + ennemies[2].pv + ennemies[3].pv<= 0){console.log("Les ennemis sont vaincus"); return};
    }

    //Tours des ennemis
    for (let ennemy in ennemies){
        aleaTarget = Math.floor(Math.random()*joueurs.length);

        if (joueurs[0].pv == 0){joueurs[1].pv = 0};
        if (joueurs[aleaTarget].pv <= 0){aleaTarget++};
        if (aleaTarget > joueurs.length){aleaTarget = 0};

        let touchDice = Math.floor(Math.random()*1000);
        console.log(touchDice + " -> " + ennemies[ennemy].name + " attaque " + joueurs[aleaTarget].name);
        if (touchDice > 500){
            let atkDice = Math.floor(Math.random()*1000);
            switch(true){
                case atkDice < 750 :
                        joueurs[aleaTarget].pv = (joueurs[aleaTarget].pv - 1)
                    console.log(`${atkDice} -> ${ennemies[ennemy].name} touche ! Il reste ${joueurs[aleaTarget].pv} à ${joueurs[aleaTarget].name}`)
                    break;
                case atkDice > 700 :
                        joueurs[aleaTarget].pv = (joueurs[aleaTarget].pv - 2)
                        console.log(`${atkDice} -> ${ennemies[ennemy].name} touche ! Il reste ${joueurs[aleaTarget].pv} à ${joueurs[aleaTarget].name}`)
                        break;
            }
        } else {
            console.log(touchDice + " -> " + ennemies[ennemy].name + " rate son attaque.");
        }
        if (joueurs[0].pv + joueurs[1].pv + joueurs[2].pv <= 0){console.log("Les joueurs sont vaincus"); return};
    }
    console.log("Fin du tour " + (tour + 1));
    tour++;
})*/