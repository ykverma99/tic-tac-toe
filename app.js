const tiles = Array.from(document.getElementsByClassName('tile'))
const playerDisplay = document.getElementById('player')
const reset = document.getElementById('reset')
const winner = document.getElementById('winner')

let bord = ['','','','','','','','',''];
let currentPlayer = 'X'
let isGameActive = true;

const playerX_Won = 'Player X won'
const playerO_Won = 'Player O won'
const tie = 'TIE'

/*
    index for winning concept
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6],  
]

function handleResultValoidation(){
    let round = false;
    for(let i=0; i<=7; i++){
        const winCondition = winningCondition[i];
        const a = bord[winCondition[0]] //this will find the array of 0 3 6 0 1 2 0 2
        const b = bord[winCondition[1]]
        const c = bord[winCondition[2]]

        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            round = true;
            break;
        }       
        
    }
    
        if(round){
            anounce(currentPlayer === 'X' ? playerX_Won : playerO_Won)
            isGameActive = false;
            return;
        }

        if(!bord.includes('')){
            anounce(tie)
        }
}

const anounce = (type) =>{
    switch(type){
        case playerO_Won:
            winner.innerHTML = 'player <span class="playerO">O</span> won';
            break;
        case playerX_Won:
            winner.innerHTML = 'player <span class="playerX">X</span> won';
            break;
        case tie:
            winner.innerText = "Tie"
    }
    winner.classList.remove('hide')
}

const updateBoard = (index) =>{
    bord[index] = currentPlayer;
}

const isValidAction = (tile) =>{
    if(tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }
    return true;
}

const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}

const userAction = (tile,index)=>{
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`)
        updateBoard(index);
        handleResultValoidation();
        changePlayer();
    }
}

reset.addEventListener('click',()=>{
    bord = ['', '', '', '', '', '', '', '', '']
    isGameActive = true;

    if(currentPlayer === 'O'){
        changePlayer();
    }

    tiles.forEach(tile =>{
        tile.innerText = '';
        tile.classList.remove('playerX')
        tile.classList.remove('playerO')

    })
    winner.classList.add('hide');
    winner.innerText = ''
})

tiles.forEach((tile,index) =>{
    tile.addEventListener('click',()=>userAction(tile,index))
})

