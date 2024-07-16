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
        if (board[row][column].getValue() !== null){
            console.log("This cell is already taken!");
            return false;
        };
        board[row][column].addToken(player);
        return true
    } 

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    function Cell() {
        let value = null;
      
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
    const printNewRound = () => {
      gameBoard.printBoard();
      console.log(`${player.getActivePlayer().name}'s turn...`)
    }

    const playRound = (row, column) => {
      const success = gameBoard.addToken(row , column, player.getActivePlayer().token);
      if(!success){
        return;
      }

      const checkWin = (board, playerToken) => {
        const rows = board.length;
        const cols = board[0].length;

        // Check rows
        for (let i = 0; i < rows; i++) {
            if (board[i].every(cell => cell.getValue() === playerToken)) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < cols; j++) {
            if (board.every(row => row[j].getValue() === playerToken)) {
                return true;
            }
        }

        // Check descending diagonal
        if (board[0][0].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[2][2].getValue() === playerToken) {
            return true;
        }

        // Check ascending diagonal
        if (board[2][0].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[0][2].getValue() === playerToken) {
            return true;
        }

        return false;
      }

      const isFull = (board) => {
        for ( let i = 0 ; i < board.length ; i++){
          for( let j = 0 ; j < board[0].length; j++){
            if (board[i][j].getValue() == null){
              return false;
            }
          }
        }
        return true;
      }

      if(checkWin(gameBoard.getBoard(), player.getActivePlayer().token)){
        alert(`${player.getActivePlayer().name} won this round!`);
        } else if (isFull(gameBoard.getBoard())){
          alert("Its a draw!");
        } else {
        console.log("no winner yet.");
        }

        
      player.switchPlayer();
      printNewRound();
      
    }
    printNewRound();

    return{
      playRound
    }
    
})();

const screenController = (function(){
  
})();
