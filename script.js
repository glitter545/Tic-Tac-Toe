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