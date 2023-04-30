import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import DifficultyControl from "./DifficultyControl";

export default function Difficulty({ onGenerate, onInitialize, onUpdateSolution, onUpdateStarting, onResetTimer, onStartTimer, onSelect, onUpdateDifficulty }) {

    const [showGameOptions, setShowGameOptions] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    const difficulty = {
        easy: 40,
        medium: 36,
        hard: 32
    };

    const handleShowGameOptions = () => setShowGameOptions(true);

    const handleCloseGameOptions = () => setShowGameOptions(false);

    const handleShowTutorial = () => setShowTutorial(true);

    const handleCloseTutorial = () => setShowTutorial(false);

    return (
        <div>
            <div className="pb-2 center-div">
                <Button 
                    variant="success" 
                    onClick={ handleShowGameOptions } 
                    onMouseDown={ e => e.preventDefault() } 
                >
                    New Game
                </Button>
            </div>
            <Modal show={ showGameOptions } onHide={ handleCloseGameOptions } centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DifficultyControl
                        level={ difficulty.easy }
                        onGenerate={ onGenerate }
                        onInitialize={ onInitialize }
                        onUpdateSolution={ onUpdateSolution }
                        onUpdateStarting={ onUpdateStarting }
                        onClose={ handleCloseGameOptions } 
                        onResetTimer={ onResetTimer } 
                        onStartTimer={ onStartTimer } 
                        onSelect={ onSelect } 
                        onUpdateDifficulty={ onUpdateDifficulty } 
                    />
                    <DifficultyControl
                        level={ difficulty.medium }
                        onGenerate={ onGenerate }
                        onInitialize={ onInitialize }
                        onUpdateSolution={ onUpdateSolution }
                        onUpdateStarting={ onUpdateStarting }
                        onClose={ handleCloseGameOptions } 
                        onResetTimer={ onResetTimer } 
                        onStartTimer={ onStartTimer } 
                        onSelect={ onSelect } 
                        onUpdateDifficulty={ onUpdateDifficulty } 
                    />
                    <DifficultyControl
                        level={ difficulty.hard }
                        onGenerate={ onGenerate }
                        onInitialize={ onInitialize }
                        onUpdateSolution={ onUpdateSolution }
                        onUpdateStarting={ onUpdateStarting }
                        onClose={ handleCloseGameOptions } 
                        onResetTimer={ onResetTimer } 
                        onStartTimer={ onStartTimer } 
                        onSelect={ onSelect } 
                        onUpdateDifficulty={ onUpdateDifficulty } 
                    />
                </Modal.Body>
            </Modal>
            <div className="py-2 center-div">
                <Button 
                    variant="warning" 
                    onClick={ handleShowTutorial } 
                    onMouseDown={ e => e.preventDefault() } 
                >
                    Tutorial
                </Button>
            </div>
            <Modal show={ showTutorial } onHide={ handleCloseTutorial } size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>How To Play</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey={ ['0', '1', '2'] } alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Difficulty Level</Accordion.Header>
                            <Accordion.Body>
                                <p>Start a new game by clicking the <b>'New Game'</b> button and choosing <b>'Easy'</b>, <b>'Medium'</b>, or <b>'Hard'</b> mode.</p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Number Selection</Accordion.Header>
                            <Accordion.Body>
                                <p>Numbers can be selected for placement by clicking one of the options below the board or pressing the particular number key on keyboard.</p>
                                <p>Alternatively, you can quickly cycle through the available numbers using the <b>'A'</b> and <b>'D'</b> keys.</p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Undo</Accordion.Header>
                            <Accordion.Body>
                                <p>Undo your last number placement by clicking the <b>'Undo'</b> button or simply pressing the <b>'Backspace'</b> key on keyboard.</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
            </Modal>
        </div>
    );

}
