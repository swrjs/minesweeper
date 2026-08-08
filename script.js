cell.addEventListener('click', function(){
    revealCell(x, y);
});

cell.addEventListener('contextmenu', function(){
    toggleFlag(x, y);
});

function revealCell(x, y) {
    if (firstClick) {
        generateBoard(x, y);
        return;
    }
    if(board[x][y] == 'M') {
        // game over
    }
    else if(board[x][y] == 0) {
        // flood fill algorithm+outlining numbers
    }
}

var board = [];

function toggleFlag(x, y) {

}

function generateBoard(x, y) {
    // initialize board
    // seed random mines
    // calculate numbers around the mines
    createBoard();
    generateMines(x, y);
    generateNumbers();
    firstClick = false;
}

function createBoard() {
    for (let i = 0; i < 5; i++) {
        board[i] = [];
    }
}

function generateMines(x, y) {
    for (let i = 0; i < 4; i++) {
        let randX = Math.floor(Math.random() * 5);
        let randY = Math.floor(Math.random() * 5);
        board[randX][randY] = 'M';
    }
}

function generateNumbers(x, y) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            var dx = [-1, -1, -1, 0, 0, 1, 1, 1];
            var dy = [-1, 0, 1, -1, 1, -1, 0, 1];
            var cnt = 0;
            for (let k = 0; k < 8; k++) {
                let newX = i + dx[k];
                let newY = j + dy[k];
                if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
                    if (board[newX][newY] == 'M') {
                        cnt++;
                    }
                }
            }
            board[i][j] = cnt;
        }
    }
}