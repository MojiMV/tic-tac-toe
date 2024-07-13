const gameBoard = (function(){
    const rows = 3;
    const columns = 3;
    const board = [];

    // common way to make a 2d array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
      }

    const getBoard = () => board;

    const addToken = (row, column, player) => {
        if (board[row][column] !== 0){
            console.log("This cell is already taken!");
            return;
        };
        board[row][column].addToken(player);
    } 

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    function Cell() {
        let value = 0;
      
        const addToken = (player) => {
          value = player;
        };
      
        const getValue = () => value;
      
        return {
          addToken,
          getValue
        };
      }

    return{
        getBoard,
        addToken,
        printBoard
    }
})();

const player = (function(playerOneName = "Player One", playerTwoName = "Player Two") {

    const players = [
        {
            name: playerOneName,
            token: "x"
        },
        {
            name: playerTwoName,
            token: "o"
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => activePlayer.token == "x" ? activePlayer = players[1] : activePlayer = players[0]; 

    const getActivePlayer = () => activePlayer;
    
    return{
        switchPlayer,
        getActivePlayer
    }

})();

const gameController = (function(){
    

})();