/* Med document.queryselector(selector) kan vi hämta
 * de element som vi behöver från html dokumentet.
 * Vi spearar elementen i const variabler då vi inte kommer att
 * ändra dess värden.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * Viktigt: queryselector ger oss ett html element eller flera om det finns.
 */
const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps'); // money per second
const mpcTracker = document.querySelector('#mpc'); // money per click
const msgbox = document.querySelector('#msgbox');
const moneybox = document.querySelector('#moneybox');
const techList = document.querySelector('#techlist');
const mainDiv = document.querySelector('#mainDiv');

/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;

let valueList = [];

let tileList = [];
let tiles = 25;
let ownedLand = [13];

let last = 0;
let cityBuiltLvl = 0;
let moneyForDevelopment = 2;
var xPos = 0;
var yPos = 0;
var xSize = 16;
var ySize = 16;
let buildType = 0;
let building = 0;

let builds = ["⛺Farm", "🏠Bostad", "⛪Kyrka"];
let buildings = 2;
let buildLista = [1, 99, 1];

let achievementTest = false;
let medeltidUnlock = false;
let renaissanceUnlock = false;
let IndustrialUnlock = false;
let atomicUnlock = false;

/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener(
    'click',
    () => {
        // vid click öka score med 1
        money += moneyPerClick;
        visualMoney('+' + moneyPerClick, 'money');
        // console.log(clicker.score);
    },
    false
);
/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = moneyPerSecond;
    mpcTracker.textContent = moneyPerClick.toFixed(2);

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    // exempel på hur vi kan använda värden för att skapa tex 
    // achievements. Titta dock på upgrades arrayen och gör något rimligare om du
    // vill ha achievements.
    // på samma sätt kan du även dölja uppgraderingar som inte kan köpas
    /*if (moneyPerClick >= 10 && !achievementTest) {
        achievementTest = true;
        message('Du har hittat en FOSSIL!', 'achievement');
    }*/

    window.requestAnimationFrame(step);
}

function expandLandFunc(e)
{
    let select = document.getElementById("chooseBuild").value;
    let noAdd = false;
    for(var i = 0; i<ownedLand.length; i++)
    {
        if(ownedLand[i] == e && select != valueList[e])
        {
            noAdd = true;
        }
    }
    if(noAdd == true)
    {
        noAdd = false;
    }
    else 
    {
        switch(select)
        {
            case '0':
                if(money>=upgrades[0].cost)
                {
                    money -= upgrades[0].cost;
                    upgrades[0].cost *= 1.15;
                    upgrades[0].cost = Math.round(upgrades[0].cost);
                    moneyPerSecond += upgrades[0].amount;
                    document.getElementById("u0").innerHTML = builds[0] + ": Köp för: " + upgrades[0].cost + " Mynt" + ": Tjänar " + upgrades[0].amount + " Mynt per Sekund";
                    var img = document.createElement('img');
                    img.src="../img/farm.png";
                    valueList[e] = 0;
                    document.getElementById(e).appendChild(img);
                    ownedLand.push(e);
                }
                else 
                {
                    message('Du har inte råd.', 'warning');
                }
                break;
            case '1':
                if(money>=upgrades[1].cost)
                {
                    money -= upgrades[1].cost;
                    upgrades[1].cost *= 1.15;
                    upgrades[1].cost = Math.round(upgrades[1].cost);
                    moneyPerSecond += upgrades[1].amount;
                    document.getElementById("u1").innerHTML = builds[1] + ": Köp för: " + upgrades[1].cost + " Mynt" + ": Tjänar " + upgrades[1].amount + " Mynt per Sekund";
                    var img = document.createElement('img');
                    img.src="../img/house.png";
                    valueList[e] = 1;
                    document.getElementById(e).appendChild(img);
                    ownedLand.push(e);
                }
                else
                {
                    message('Du har inte råd.', 'warning');
                }
                break;
            case '2':
                if(money>=upgrades[2].cost)
                {
                    money -= upgrades[2].cost;
                    upgrades[2].cost *= 1.15;
                    upgrades[2].cost = Math.round(upgrades[2].cost);
                    moneyPerSecond += upgrades[2].amount;
                    document.getElementById("u2").innerHTML = builds[2] + ": Köp för: " + upgrades[2].cost + " Mynt" + ": Tjänar " + upgrades[2].amount + " Mynt per Sekund";
                    var img = document.createElement('img');
                    img.src="../img/kyrka.png";
                    valueList[e] = 2;
                    document.getElementById(e).appendChild(img);
                    ownedLand.push(e);
                }
                else
                {
                    message('Du har inte råd.', 'warning');
                }
                break;
        }
    }
}
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    techs.forEach((tech) => {
        if (tech.unlocked)
        {
            techList.appendChild(createCard(tech));
        }
    });
    let gameCanvas = document.getElementById('landGFX');
    let gameTiles = Array.from(gameCanvas.children);
    tileList = gameTiles.map(element => {
        return element.id;
    });

    for (let i = 0; i < builds.length; i++) {
        var opt = document.createElement('option');
        opt.id = "u"+i;
        opt.value = i;
        opt.innerHTML = builds[i] + ": Köp för: " + upgrades[i].cost + " Mynt" + ": Tjänar " + upgrades[i].amount + " Mynt per Sekund";
        document.getElementById("chooseBuild").appendChild(opt);
    }
    var img = document.createElement('img');
    img.src="../img/slott.png";
    document.getElementById(tileList[12]).appendChild(img);
    window.requestAnimationFrame(step);
});

/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */
upgrades = [
    {
        name: 'Farm',
        cost: 10,
        amount: 1,
        building: 0,
        unlocked: 1,
    },
    {
        name: 'Hus',
        cost: 50,
        amount: 5,
        building: 1,
        unlocked: 1,
    },
    {
        name: 'Kyrka',
        cost: 100,
        amount: 10,
        building: 2,
        unlocked: 1,
    },
    {
        name: 'Fabrik',
        cost: 1000,
        amount: 100,
        building: 3,
        unlocked: 0,
    },
];

techs = [
    {
        name: 'Brunnar',
        cost: 50,
        clicks: 1.25,
        unlocked: 1,
    },
    {
        name: 'Vägar',
        cost: 100,
        clicks: 1.25,
        unlocked: 1,
    },
    {
        name: 'Brons',
        cost: 200,
        clicks: 1.25,
        unlocked: 1,
    },
    {
        name: 'Medeltiden',
        cost: 1000,
        clicks: 2,
        unlock: 1,
        unlocked: 1,
    },
    {
        name: 'Järn',
        cost: 1750,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Hästar',
        cost: 2000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Valuta',
        cost: 2500,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Renässansen',
        cost: 5000,
        clicks: 2,
        unlock: 2,
        unlocked: 0,
    },
    {
        name: 'Krut',
        cost: 6000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Metallgjutning',
        cost: 7000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Advancerad Matematik',
        cost: 8000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Industriella Revolutionen',
        cost: 10000,
        clicks: 2,
        unlock: 3,
        unlocked: 0,
    },
    {
        name: 'Industrialisering',
        cost: 15000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Ångkraft',
        cost: 20000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Stål',
        cost: 50000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Kärnåldern',
        cost: 100000,
        clicks: 2,
        unlock: 4,
        unlocked: 0,
    },
    {
        name: 'Datorer',
        cost: 150000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Sateliter',
        cost: 200000,
        clicks: 1.25,
        unlocked: 0,
    },
    {
        name: 'Kärnkraft',
        cost: 500000,
        clicks: 1.25,
        unlocked: 0,
    },
]

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */

function createCard(upgrade) {
    const card = document.createElement('div');
    card.classList.add('card');
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');
    header.textContent = `${upgrade.name}, +${upgrade.clicks} utveckling.`;
    cost.textContent = `Köp för ${upgrade.cost} mynt.`;
    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            money -= upgrade.cost;
            cost.textContent = 'Köp för ' + upgrade.cost + ' mynt';
            moneyPerClick *= upgrade.clicks ? upgrade.clicks : 1;
            message('Grattis du har fått fler invånare!', 'success');
            buildType = upgrade.building;
            var city = document.getElementById("cityGFX");
            if(upgrade.unlock)
            {
                message('Du har uppnått ' + upgrade.name + '!', 'achievement');
                switch(upgrade.unlock)
                {
                    case 1:
                        techList.appendChild(createCard(techs[4]));
                        techList.appendChild(createCard(techs[5]));
                        techList.appendChild(createCard(techs[6]));
                        techList.appendChild(createCard(techs[7]));
                        break;
                    case 2:
                        techList.appendChild(createCard(techs[8]));
                        techList.appendChild(createCard(techs[9]));
                        techList.appendChild(createCard(techs[10]));
                        techList.appendChild(createCard(techs[11]));
                        break;
                    case 3:
                        techList.appendChild(createCard(techs[12]));
                        techList.appendChild(createCard(techs[13]));
                        techList.appendChild(createCard(techs[14]));
                        techList.appendChild(createCard(techs[15]));
                        break;
                    case 4:
                        techList.appendChild(createCard(techs[16]));
                        techList.appendChild(createCard(techs[17]));
                        techList.appendChild(createCard(techs[18]));
                        break;
                }
            }
            if(upgrade.clicks)
            {
                card.remove();
            }
        } else {
            message('Du har inte råd.', 'warning');
        }
    });

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}

function visualMoney(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 500);
}
