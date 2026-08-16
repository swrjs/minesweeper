const cells = document.querySelectorAll('.cell');

var x, y, firstClick = 1;
var dx = [-1, -1, -1, 0, 0, 1, 1, 1];
var dy = [-1, 0, 1, -1, 1, -1, 0, 1];

cells.forEach(function (cells) {
    const x = Number(cells.dataset.row);
    const y = Number(cells.dataset.column);
    cells.addEventListener('click', function () {
        console.log(`Clicked cell at (${x}, ${y})`);
        dig(x, y);
        });

    cells.addEventListener('contextmenu', function () {
        event.preventDefault();
        toggleFlag(x, y);
    });
})

options = document.querySelectorAll('.option');
options.forEach(function (options) {
    options.addEventListener('click', function () {
        resetGame();
    });
})

function toggleFlag(x, y) {
    let cell = document.getElementById(`${x + 1}${y + 1}`);
    if (cell.textContent == '⠀') {
        cell.textContent = '🚩';
    } else {
        cell.textContent = '⠀';
    }
}

function resetGame() {
    firstClick = 1;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let cell = document.getElementById(`${i + 1}${j + 1}`);
            cell.textContent = '⠀';
        }
    }
}
function printBoard() {
    for (let i = 0; i < 5; i++) {
        let row = '';
        for (let j = 0; j < 5; j++) {
            row += board[i][j] + ' ';
        }
        console.log(row);
    }
}
//dig-->
function dig(x, y) {
    if (firstClick) {//first move
        generateBoard(x, y);
        printBoard();
        if (board[x][y] == '0') {//zero clicked
            console.log(`Performing DFS on (${x}, ${y})`);
            dfs(x, y);
        }
    }
    else {// non first move
        printBoard();
        if (board[x][y] == 'M') {//mine
            // game over
            console.log("Game Over");
        }
        else {//non mine
            if (board[x][y] == '0') {//zero clicked
                dfs(x, y);
            }
            else {//non zero clicked
                revealCell(x, y);
            }
        }
    }
}

function revealCell(x, y) {
    cell = document.getElementById(`${x + 1}${y + 1}`);
    cell.textContent = board[x][y];
}

function dfs(x, y) {
    vis[x][y] = true;
    revealCell(x, y);
    for (let i = 0; i < 8; i++) {
        let newX = x + dx[i];
        let newY = y + dy[i];
        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5 && !vis[newX][newY]) {
            if (board[newX][newY] == '0') {
                vis[newX][newY] = true;
                revealCell(newX, newY);
                dfs(newX, newY);
            }
            else {
                vis[newX][newY] = true;
                revealCell(newX, newY);
            }
        }
    }
}

var board = [];
var vis = [];
function createVis() {
    for (let i = 0; i < 5; i++) {
        vis[i] = [];
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            vis[i][j] = false;
        }
    }
}



function generateBoard(x, y) {
    // initialize board
    // seed random mines
    // calculate numbers around the mines
    createBoard();
    createVis();
    generateMines(x, y);
    generateNumbers();
    firstClick = false;
}

function createBoard() {
    for (let i = 0; i < 5; i++) {
        board[i] = [];
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            board[i][j] = '0';
        }
    }
}

function generateMines(x, y) {
    let mines = 5;
    for (let i = 0; i < mines; i++) {
        let randX = Math.floor(Math.random() * 5);
        let randY = Math.floor(Math.random() * 5);
        if ((randX >= x - 1 && randX <= x + 1 && randY >= y - 1 && randY <= y + 1)||(board[randX][randY] == 'M')) {
            i--;
            continue;
        }
        board[randX][randY] = 'M';
        console.log(`Mine placed at (${randX}, ${randY})`);
    }
}

function generateNumbers(x, y) {
    //if(board[x][y] == 'M') return;
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
            if (board[i][j] != 'M') {
                board[i][j] = cnt;
            }
        }
    }
}