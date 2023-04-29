import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Board from "./Board";
import Difficulty from "./Difficulty";
import DifficultyControl from "./DifficultyControl";
import NumberDisplay from "./NumberDisplay";
import Controls from "./Controls";
import Timer from "./Timer";
import Leaderboard from './Leaderboard';

/*
easy = 38 clues given
medium = 30 clues given
hard = 27 clues given
expert = 24 clues given (??)
nightmare = 25 clues given (??)
*/

/*
TODO:
- 3-2-1 countdown every new game before timer starts
- db table: score_id, username, time, difficulty
*/

export default function Game() {

    const [board, setBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [selected, setSelected] = useState(1);
    const [history, setHistory] = useState([Array(9).fill(0).map(() => new Array(9).fill(0))]);
    const [counter, setCounter] = useState(new Map([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]));
    const [placements, setPlacements] = useState([]);
    const [solvedBoard, setSolvedBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [startingBoard, setStartingBoard] = useState(Array(9).fill(0).map(() => new Array(9).fill(0)));
    const [showGameOver, setShowGameOver] = useState(false);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [username, setUsername] = useState('');
    const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [scores, setScores] = useState([]);

    const difficulty = {
        easy: 40,
        medium: 36,
        hard: 32
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Fetch all scores on init
    useEffect(() => {
        fetchScores();
    }, []);

    async function fetchScores() {
        axios.get('http://localhost:4001/scores/all')
            .then(response => {
                setScores(response.data);
            })
            .catch(error => console.error(`There was an error retrieving the scores list: ${error}`));
    }

    function handleCreateScore() {
        axios.post('http://localhost:4001/scores/create', {
            username: username,
            time: time,
            difficulty: difficultyLevel
        })
            .then(res => {
                console.log(res.data);
                fetchScores();
            })
            .catch(error => console.error(`There was an error creating the score: ${error}`));
    }

    function handleDeleteScore(score_id) {
        axios.put('http://localhost:4001/scores/delete')
            .then(() => {
                console.log(`Score ${score_id} deleted.`);
                fetchScores();
            })
            .catch(error => console.error(`There was an error removing the score: ${error}`));
    }

    function handleResetScores() {
        axios.put('http://localhost:4001/scores/reset')
            .then(() => {
                fetchScores();
            })
            .catch(error => console.error(`There was an error resetting the score list: ${error}`));
    }

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

    function handleShowGameOver() {
        setShowGameOver(true);
    }

    function handleCloseGameOver() {
        setShowGameOver(false);
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

    function handleStartTimer() {
        setRunning(true);
    }

    function handleStopTimer() {
        setRunning(false);
    }

    function handleResetTimer() {
        setTime(0);
    }

    useEffect(() => {
        let interval_id;
        if (running) {
            interval_id = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(interval_id);
    }, [running, time]);

    function handleShowUsernamePrompt() {
        setShowUsernamePrompt(true);
    }

    function handleCloseUsernamePrompt() {
        setShowUsernamePrompt(false);
    }

    function handleSubmitUsername(e) {
        e.preventDefault();
        setShowUsernamePrompt(false);
    }

    function handleDifficultyLevel(label) {
        setDifficultyLevel(label);
    }

    return (
        <div tabIndex="0" className="center-div">
            <Modal show={ showGameOver } onHide={ handleCloseGameOver }>
                <Modal.Header closeButton>
                    <Modal.Title>{ username === '' ? 'Congratulations!' : `Congratulations, ${username}!` }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Difficulty: { difficultyLevel }</p>
                    <p>Timer: { minutes.toString().padStart(2, "0") }:{ seconds.toString().padStart(2, "0") }</p>
                    <DifficultyControl
                        level={ difficulty.easy }
                        onGenerate={ handleGenerate }
                        onInitialize={ handleCounter }
                        onUpdateSolution={ handleSolution }
                        onUpdateStarting={ handleStarting }
                        onClose={ handleCloseGameOver }
                        onResetTimer={ handleResetTimer }
                        onStartTimer={ handleStartTimer }
                        onSelect={ handleSelect }
                        onUpdateDifficulty={ handleDifficultyLevel }
                    />
                    <DifficultyControl
                        level={ difficulty.medium }
                        onGenerate={ handleGenerate }
                        onInitialize={ handleCounter }
                        onUpdateSolution={ handleSolution }
                        onUpdateStarting={ handleStarting }
                        onClose={ handleCloseGameOver }
                        onResetTimer={ handleResetTimer }
                        onStartTimer={ handleStartTimer }
                        onSelect={ handleSelect }
                        onUpdateDifficulty={ handleDifficultyLevel }
                    />
                    <DifficultyControl
                        level={ difficulty.hard }
                        onGenerate={ handleGenerate }
                        onInitialize={ handleCounter }
                        onUpdateSolution={ handleSolution }
                        onUpdateStarting={ handleStarting }
                        onClose={ handleCloseGameOver }
                        onResetTimer={ handleResetTimer }
                        onStartTimer={ handleStartTimer }
                        onSelect={ handleSelect }
                        onUpdateDifficulty={ handleDifficultyLevel }
                    />
                </Modal.Body>
            </Modal>
            <Modal show={ showUsernamePrompt } onHide={ handleCloseUsernamePrompt }>
                <Modal.Header closeButton>
                    <Modal.Title>Enter User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={ handleSubmitUsername }>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={ username }
                                onChange={ e => setUsername(e.target.value) }
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ handleCloseUsernamePrompt }>Play</Button>
                </Modal.Footer>
            </Modal>
            <div className="info-container">
                <div className="controls-left">
                    <h4>
                        <Button className="user-icon" variant="link" size="lg" onClick={ handleShowUsernamePrompt } onMouseDown={ e => e.preventDefault() }><i className="bi bi-person-circle"></i></Button> { username }
                    </h4>
                </div>
                <div className="controls-right">
                    <Timer time={ time } running={ running } />
                </div>
            </div>
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
                onShowGameOver={ handleShowGameOver }
                onStopTimer={ handleStopTimer } 
                onCreateScore={ handleCreateScore } 
            />
            <NumberDisplay selection={ selected } onSelect={ handleSelect } counter={ counter } />
            <div className="controls-container">
                <div className="controls-left">
                    <Difficulty
                        onGenerate={ handleGenerate }
                        onInitialize={ handleCounter }
                        onUpdateSolution={ handleSolution }
                        onUpdateStarting={ handleStarting }
                        onResetTimer={ handleResetTimer }
                        onStartTimer={ handleStartTimer }
                        onSelect={ handleSelect }
                        onUpdateDifficulty={ handleDifficultyLevel }
                    />
                </div>
                <div className="controls-right">
                    <Controls onUndo={ handleUndo } />
                    <Leaderboard scores={ scores } />
                </div>
            </div>
        </div>
    );

}
