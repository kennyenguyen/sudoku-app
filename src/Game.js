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
- add timer
*/

export default function Game() {

    const [board, setBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [selected, setSelected] = useState(1);
    const [history, setHistory] = useState([Array(9).fill(0).map(() => new Array(9).fill(0))]);
    const [counter, setCounter] = useState(new Map([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]));
    const [placements, setPlacements] = useState([]);
    const [solvedBoard, setSolvedBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [startingBoard, setStartingBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));

    function handleMove(newBoard) {
        const nextHistory = [...history, newBoard];
        setHistory(nextHistory);
        setBoard(newBoard);
    }

    function handleGenerate(newBoard) {
        const nextHistory = [Array(9).fill(0).map(() => new Array(9).fill(0))];
        nextHistory.push(newBoard);
        setHistory(nextHistory);
        setBoard(newBoard);
    }

    function handleSelect(num) {
        setSelected(num);
    }

    function handleUndo() {
        if (history.length > 2) {
            if (placements !== undefined && placements.length !== 0) {
                const newPlacements = [...placements];
                const [val, row, col] = newPlacements.pop();
                const newCounter = new Map(counter);
                newCounter.set(val, newCounter.get(val) - 1);
                setPlacements(newPlacements);
                setCounter(newCounter);
            }
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

    function handleSolution(newBoard) {
        setSolvedBoard(newBoard);
    }

    function handleStarting(newBoard) {
        setStartingBoard(newBoard);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (!isNaN(e.key)) {
                const num = Number(e.key);
                if (1 <= num && num <= 9 && counter.get(num) !== 9) {
                    setSelected(num);
                }
            } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
                let num = (selected % 9) + 1;
                while (counter.get(num) === 9) {
                    num = (num % 9) + 1;
                }
                setSelected(num);
            } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
                let num = ((selected + 7) % 9) + 1;
                while (counter.get(num) === 9) {
                    num = ((num + 7) % 9) + 1;
                }
                setSelected(num);
            } else if (e.key === 'Backspace') {
                handleUndo();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selected, history, board, counter, placements]);

    return (
        <div tabIndex="0" className="center-div">
            <Board 
                board={ board } 
                solvedBoard={ solvedBoard } 
                startingBoard={ startingBoard } 
                selection={ selected } 
                counter={ counter } 
                placements={ placements } 
                onMove={ handleMove } 
                onSelect={ handleSelect } 
                onUpdateCounter={ handleCounter } 
                onUpdatePlacements={ handlePlacements } 
            />
            <NumberDisplay selection={ selected } onSelect={ handleSelect } counter={ counter } />
            <div className="controls-container">
                <div className="controls-left">
                    <Difficulty 
                        onGenerate={ handleGenerate } 
                        onInitialize={ handleCounter } 
                        onUpdateSolution={ handleSolution } 
                        onUpdateStarting={ handleStarting } 
                    />
                </div>
                <div className="controls-right">
                    <Controls onUndo={ handleUndo } />
                </div>
            </div>
        </div>
    );

}
