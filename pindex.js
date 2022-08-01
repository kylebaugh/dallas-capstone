const alertBtn = document.getElementById("charbtn")
const statBtn = document.getElementById("charbtn2")
const diceBtn = document.getElementById("charbtn3")
const diceBtn2 = document.getElementById("charbtn3-1")
const diceBtn3 = document.getElementById("charbtn3-2")
const diceBtn4 = document.getElementById("charbtn3-3")
const diceBtn5 = document.getElementById("charbtn3-4")
const diceBtn6 = document.getElementById("charbtn3-5")
const diceBtn7 = document.getElementById("charbtn3-6")
const counter20 = document.getElementById("d20Display")
const counterPercent = document.getElementById("percentDisplay")
const counter12 = document.getElementById("d12Display")
const counter10 = document.getElementById("d10Display")
const counter8 = document.getElementById("d8Display")
const counter6 = document.getElementById("d6Display")
const counter4 = document.getElementById("d4Display")
const statsDis = document.getElementById("statDisplay1")
const recentChar = document.getElementById("charbtn4")
const saveBtn = document.getElementById("saveBtn")


function createCharacter() {
    axios.post("https://f24-alan.herokuapp.com/create-characters/")
    .then((res) => console.log(res.data))
    .catch(error => console.log(error))
}
function recentCharacters () {
    axios.get("https://f24-alan.herokuapp.com/characters/")
    .then((res) => console.log(res.data))
    .catch(error => console.log(error))
}
function saveMe () {
    html2canvas(document.body).then((canvas) => {
        let a = document.createElement("a");
        a.download = "dnd-character.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
    })
}

function statGenerator() {
    let diceSum = [];

    for(let i = 0; i < 6; i++) {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;
        let d3 = Math.floor(Math.random() * 6) + 1;
        let d4 = Math.floor(Math.random() * 6) + 1;
        if ((d4<=d3)&(d4<=d2)&(d4<=d1)) {
            let sum = (" " + (d1+d2+d3))
            diceSum.push(sum)
        }else if ((d3<=d4)&(d3<=d2)&(d3<=d1)) { 
            let sum = (" " + (d1 + d2 + d4))
            diceSum.push(sum)
        }else if ((d2<=d4)&(d2<=d3)&(d2<=d1)) {
            let sum = (" " + (d1 + d3 + d4))
            diceSum.push(sum)
        }else{
            let sum = (" " + (d2 + d3 + d4))
            diceSum.push(sum)
        }
    }
  console.log(diceSum);
  statsDis.textContent = diceSum
}

function rollD20() {
    let d1 = Math.floor(Math.random() * 20) + 1;
    console.log(d1)
    counter20.textContent = d1
}
function rollPercent() {
    let d1 = Math.floor(Math.random() * 100) + 1;
    console.log(d1)
    counterPercent.textContent = d1
}
function rollD12() {
    let d1 = Math.floor(Math.random() * 12) + 1;
    console.log(d1)
    counter12.textContent = d1
}
function rollD10() {
    let d1 = Math.floor(Math.random() * 10) + 1;
    console.log(d1)
    counter10.textContent = d1
}
function rollD8() {
    let d1 = Math.floor(Math.random() * 8) + 1;
    console.log(d1)
    counter8.textContent = d1
}
function rollD6() {
    let d1 = Math.floor(Math.random() * 6) + 1;
    console.log(d1)
    counter6.textContent = d1
}
function rollD4() {
    let d1 = Math.floor(Math.random() * 4) + 1;
    console.log(d1)
    counter4.textContent = d1
}

alertBtn.addEventListener('click', recentCharacters)
statBtn.addEventListener('click', statGenerator)
diceBtn.addEventListener('click', rollD20)
diceBtn2.addEventListener('click', rollPercent)
diceBtn3.addEventListener('click', rollD12)
diceBtn4.addEventListener('click', rollD10)
diceBtn5.addEventListener('click', rollD8)
diceBtn6.addEventListener('click', rollD6)
diceBtn7.addEventListener('click', rollD4)
recentChar.addEventListener('click', createCharacter)
saveBtn.addEventListener('click', saveMe)