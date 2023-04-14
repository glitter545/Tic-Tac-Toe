// Gameboard module
const Gameboard = (() => {
    let board = Array(9).fill("");

    const setCell = (index, player) => {
        if (!board[index]) {
            board[index] = player.symbol;
            return true;
        }
        return false;
    };

    const getCell = (index) => board[index];

    const reset = () => {
        board = Array(9).fill("");
    };

    const checkWin = (player) => {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        return winCombinations.some(combination =>
            combination.every(index => board[index] === player.symbol)
        );
    };

    const checkTie = () => {
        return board.every(cell => cell !== "");
    };

    const isGameOver = (player) => {
        return checkWin(player) || checkTie();
    };

    return { setCell, getCell, reset, isGameOver, checkWin, checkTie };
})();

// Player factory
const Player = (name, symbol) => {
    return { name, symbol };
};

// DisplayController module
const DisplayController = (() => {
    const gameboardDiv = document.getElementById("gameboard");
    const player1NameInput = document.getElementById("player1-name");
    const player2NameInput = document.getElementById("player2-name");
    const startRestartButton = document.getElementById("start-restart");
    const resultDisplay = document.getElementById("result");

    const render = () => {
        gameboardDiv.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = Gameboard.getCell(i);
            cellDiv.addEventListener("click", () => handleClick(i));
            gameboardDiv.appendChild(cellDiv);
        }
    };

    const handleClick = (index) => {
        if (Gameboard.setCell(index, currentPlayer)) {
            render();
            if (Gameboard.isGameOver(currentPlayer)) {
                const result = Gameboard.checkWin(currentPlayer)
                    ? `${currentPlayer.name} wins!`
                    : "It's a tie!";
                resultDisplay.textContent = result;
            } else {
                switchPlayer();
            }
        }
    };

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    startRestartButton.addEventListener("click", () => {
        const player1Name = player1NameInput.value || "Player 1";
        const player2Name = player2NameInput.value || "Player 2";
        player1.name = player1Name;
        player2.name = player2Name;
        Gameboard.reset();
        currentPlayer = player1;
        resultDisplay.textContent = "";
        render();
    });

    return { render };
})();

// Initialize players and display the initial gameboard
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
let currentPlayer = player1;
DisplayController.render();
