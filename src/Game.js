import { useState, useEffect } from "react";
import Board from "./Board";
import Controls from "./Controls";
import NumberDisplay from "./NumberDisplay";

/*
easy = 38 clues given
medium = 30 clues given
hard = 27 clues given
expert = 24 clues given (??)
nightmare = 25 clues given (??)
*/

/*
TODO:
- style incorrect placements as red number
- create "game over" notification when board is filled correctly
- remove option to select a number that has been placed 9 times, i.e. 9 placements max for each number
*/

export default function Game() {

    // TODO: create history useState to enable undo functionality
    const [board, setBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [selected, setSelected] = useState(1);

    function handleMove(newBoard) {
        setBoard(newBoard);
    }

    function handleSelect(num) {
        setSelected(num);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            console.log(e.key);
            if (!isNaN(e.key)) {
                const num = Number(e.key);
                if (1 <= num && num <= 9) {
                    setSelected(num);
                }
            } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
                const num = (selected % 9) + 1;
                setSelected(num);
            } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
                const num = ((selected + 7) % 9) + 1;
                setSelected(num);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selected]);

    return (
        <div tabIndex="0" className="center-div">
            <Board board={ board } selection={ selected } onMove={ handleMove } />
            <NumberDisplay selection={ selected } onSelect={ handleSelect } />
            <Controls onGenerate={ handleMove } />
        </div>
    );
}


export function find_empty(board) {
    const rows = board.length;
    const cols = board[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

export function valid_move(board, row, col, val) {
    const rows = board.length;
    const cols = board[0].length;
    for (let r = 0; r < rows; r++) {
        if (r !== row && board[r][col] === val) {
            return false;
        }
    }
    for (let c = 0; c < cols; c++) {
        if (c !== col && board[row][c] === val) {
            return false;
        }
    }
    const block_row = row - (row % 3);
    const block_col = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (block_row + i !== row && block_col + j !== col && board[block_row + i][block_col + j] === val) {
                return false;
            }
        }
    }
    return true;
}

export function solvable(board) {
    const empty = find_empty(board);
    if (empty === null) {
        return true;
    }
    const [row, col] = empty;
    for (let val = 1; val < 10; val++) {
        if (valid_move(board, row, col, val)) {
            board[row][col] = val;
            if (solvable(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

export function shuffle(nums) {
    let shuffled = [...nums];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function fill_board(board) {
    const empty = find_empty(board);
    if (empty === null) {
        return board;
    }
    const [row, col] = empty;
    for (const val of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (valid_move(board, row, col, val)) {
            board[row][col] = val;
            if (fill_board(board)) {
                return board;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

export function make_holes(board, level) {
    
}

export function generate_board(level) {
    const board = new Array(9).fill(0).map(() => new Array(9).fill(0));
    fill_board(board);
    return board;
}

/*
💡
    1. get fully completed board, 81 values.
    2. based on difficulty, randomly erase x number of cells on the board,
        where x = 81 - 38 = 43 for easy mode, for example.
    3. set board state to this new partially filled board.
💡
*/
