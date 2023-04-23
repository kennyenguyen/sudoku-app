import { useState, useEffect } from "react";
import Board from "./Board";
import Difficulty from "./Difficulty";
import NumberDisplay from "./NumberDisplay";
import Controls from "./Controls";

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

    const [board, setBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [selected, setSelected] = useState(1);
    const [history, setHistory] = useState([Array(9).fill(0).map(() => new Array(9).fill(0))]);
    const [counter, setCounter] = useState(new Map([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]));
    const [available, setAvailable] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [placements, setPlacements] = useState([]);

    function handleMove(newBoard) {
        const nextHistory = [...history, newBoard];
        setHistory(nextHistory);
        setBoard(newBoard);
    }

    // TODO: need separate handleGenerate function to fix the "undo problem"

    function handleSelect(num) {
        setSelected(num);
    }

    function handleUndo() {
        if (history.length > 2) {
            const nextHistory = history.slice(0, history.length - 1);
            const prevBoard = history[history.length - 2];
            setHistory(nextHistory);
            setBoard(prevBoard);
        }
    }

    function handleCounter(newCounter) {
        setCounter(newCounter);
    }

    function handlePlacements(newPlacements) {
        setPlacements(newPlacements);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (!isNaN(e.key)) {
                const num = Number(e.key);
                if (1 <= num && num <= 9 && counter.get(num) !== 9) {
                    setSelected(num);
                }
            } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
                const num = (selected % 9) + 1;
                setSelected(num);
            } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
                const num = ((selected + 7) % 9) + 1;
                setSelected(num);
            } else if (e.key === 'Backspace') {
                console.log("Undo doesn't work here :(")
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selected]);

    return (
        <div tabIndex="0" className="center-div">
            <Board 
                board={ board } 
                selection={ selected } 
                onMove={ handleMove } 
                counter={ counter } 
                onUpdateCounter={ handleCounter } 
                placements={ placements } 
                onUpdatePlacements={ handlePlacements } 
            />
            <NumberDisplay selection={ selected } onSelect={ handleSelect } counter={ counter } />
            <div className="controls-container">
                <div className="controls-left">
                    <Difficulty onGenerate={ handleMove } onInitialize={ handleCounter } />
                </div>
                <div className="controls-right">
                    <Controls 
                        onUndo={ handleUndo } 
                        counter={ counter } 
                        onUpdateCounter={ handleCounter } 
                        placements={ placements } 
                        onUpdatePlacements={ handlePlacements } 
                    />
                </div>
            </div>
        </div>
    );

}

// ============================================================================

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
    const holes = 81 - level;
    const removed = [];
    while (removed.length < holes) {
        const position = Math.floor(Math.random() * 81);
        const random_row = Math.floor(position / 9);
        const random_col = position % 9;
        if (board[random_row][random_col] === 0) {
            continue;
        }
        removed.push({
            row: random_row,
            col: random_col,
            val: board[random_row][random_col]
        });
        board[random_row][random_col] = 0;
        const curr_board = board.map(row => row.slice());
        if (!solvable(curr_board)) {
            board[random_row][random_col] = removed.pop().val;
        }
    }
    return [removed, board];
}

export function generate_board(level) {
    while (true) {
        const board = new Array(9).fill(0).map(() => new Array(9).fill(0));
        fill_board(board);
        const [removed, new_board] = make_holes(board, level);
        if (!has_multiple_solutions(new_board)) {
            return [removed, new_board];
        }
    }
}

export function find_all_empty(board) {
    const empty_cells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                empty_cells.push([row, col]);
            }
        }
    }
    return empty_cells;
}

export function find_empty_from_list(board, empty_cells) {
    for (const position of empty_cells) {
        const [row, col] = position;
        if (board[row][col] === 0) {
            return [row, col];
        }
    }
    return false;
}

export function fill_board_from_list(board, empty_cells) {
    const empty_cell = find_empty_from_list(board, empty_cells);
    if (!empty_cell) {
        return board;
    }
    const [row, col] = empty_cell;
    for (const val of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (valid_move(board, row, col, val)) {
            board[row][col] = val;
            if (fill_board_from_list(board, empty_cells)) {
                return board;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

export function has_multiple_solutions(board) {
    const solutions = [];
    const empty_cells = find_all_empty(board);
    for (let i = 0; i < empty_cells.length; i++) {
        const curr_empty_cells = [...empty_cells];
        const start = curr_empty_cells.splice(i, 1);
        curr_empty_cells.unshift(start[0]);
        const solution = fill_board_from_list(board.map(row => row.slice()), curr_empty_cells);
        solutions.push(solution.join());
        if (Array.from(new Set(solutions)).length > 1) {
            return true;
        }
    }
    return false;
}

export function initial_counter(board) {
    const counter = new Map([
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0]
    ]);
    const rows = board.length;
    const cols = board[0].length;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] !== 0) {
                const val = board[row][col];
                counter.set(val, counter.get(val) + 1);
            }
        }
    }
    return counter;
}
