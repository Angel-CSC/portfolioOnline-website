//this will be checked before all else
window.addEventListener('DOMContentLoaded', () => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    const box = Array.from(document.querySelectorAll('.box'));
    const display = document.querySelector('.currentPlayer');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.displayAnnouncer');
    const currentPlayerTag = document.querySelector('.currentPlayer');
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
    This is the board:

    [0][1][2]
    [3][4][5]
    [6][7][8]

    given this, there are only some possible conditions on where a winner is declared

    these are as follows
    */

    const WINNING_CONDITIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];


    //will check of the games is 1.) finished, and if so, what is the result from the game
    function handleResultValidation(){
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = WINNING_CONDITIONS[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === '' || b === '' | c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON: PLAYERO_WON);
            isGameActive = false;
            return;
        }

        //there is no way any player won
        if(!board.includes('')){
            announce(TIE);
        }

    };

    //will depict which player won the game
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class = "playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class = "playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    //check if a box is occupied, and if so then you are not able to change the value at the current location
    const isValidAction = (box) => {
        if(box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }

        return true;
    }


    //will update the board vidually
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    //will change which player goes next and depict it visually
    const changePlayer = () => {
        display.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        display.innerText.add(`player${currentPlayer}`);
        switch(currentPlayer){
            case 'X':
                currentPlayerTag.innerHTML = 'Player <span class = "playerX">X</span>\'s turn';
            case 'O':
                currentPlayerTag.innerHTML = 'Player <span class = "playerO">O</span>\'s turn';
            default:
                currentPlayerTag.innerHTML = '<span class = "gameOver">~~~Game Over!~~~</span>';
        }
    };

    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive){
            display.innerText = currentPlayer;
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === 'O'){
            changePlayer();
        }

        box.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    };

    box.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });



    resetButton.addEventListener('click', resetBoard());
});