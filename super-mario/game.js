const scene = document.querySelector("a-scene"); 
const scoreEl = document.querySelector("#score");
const pipe = document.querySelector("#pipe");
const coin = document.querySelector("#coin");
const surprise = document.querySelector("#surprise");
const heart = document.querySelector("#heart");

const NUM_OF_COINS = 5;
const NUM_OF_PIPES = 15;
const NUM_OF_HEARTS = 5;
let score = 0;

function selectRandomPosition(){
 return {
     x: (Math.random() - 0.5) * 10,
     y: 2, 
     z: (Math.random() - 0.5) * 10
 }
}

function selectHeartRandomPosition(){
    return {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 10, 
        z: -4
    }
}

function selectPipeRandomPosition(){
    return {
        x: (Math.random() - 0.5) * 10,
        y: 1, 
        z: (Math.random() - 0.5) * 10
    }
}

function updateScore(event){
    if (event){
        scene.removeChild(event.target);
        score++;
        scoreEl.setAttribute("value", `Score: ${score}`);
        if (score == NUM_OF_COINS){
            scoreEl.setAttribute("value", `You Won!!! Go find your princess :)`);
            surprise.setAttribute("gltf-model", "./models/surprise/model.gltf");
            surprise.addEventListener("mousedown", () => {
                addHearts();
            });
        }
    }   
}

function createCoins(){
    const coinClone = coin.cloneNode();
    coinClone.setAttribute("position", selectRandomPosition());
    coinClone.addEventListener("mousedown", (event) => updateScore(event));
    scene.appendChild(coinClone);
}

function addPipes(){
    const pipeClone = pipe.cloneNode();
    pipeClone.setAttribute("position", selectPipeRandomPosition());
    scene.appendChild(pipeClone);
}

function addHearts(){
    for(let i=0; i<NUM_OF_HEARTS; i++){
        const heartClone = heart.cloneNode();
        heartClone.setAttribute("position", selectHeartRandomPosition());
        scene.appendChild(heartClone);
    }
}

updateScore();

for(let i=0; i<NUM_OF_COINS; i++){
    createCoins();
}

for(let i=0; i<NUM_OF_PIPES; i++){
    addPipes();
}
