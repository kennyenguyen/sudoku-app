import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DifficultyControl from "./DifficultyControl";

export default function Difficulty({ onGenerate, onInitialize, onUpdateSolution, onUpdateStarting }) {

    const [show, setShow] = useState(false);

    const difficulty = {
        easy: 40,
        medium: 36,
        hard: 32
    };

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    return (
        <div className="center-div">
            <Button variant="primary" onClick={ handleShow }>New Game</Button>
            <Modal show={ show } onHide={ handleClose }>
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
                        onClose={ handleClose }
                    />
                    <DifficultyControl
                        level={ difficulty.medium }
                        onGenerate={ onGenerate }
                        onInitialize={ onInitialize }
                        onUpdateSolution={ onUpdateSolution }
                        onUpdateStarting={ onUpdateStarting }
                        onClose={ handleClose }
                    />
                    <DifficultyControl
                        level={ difficulty.hard }
                        onGenerate={ onGenerate }
                        onInitialize={ onInitialize }
                        onUpdateSolution={ onUpdateSolution }
                        onUpdateStarting={ onUpdateStarting }
                        onClose={ handleClose }
                    />
                </Modal.Body>
            </Modal>
        </div>

        // <div className="center-div">
        //     <DifficultyControl 
        //         level={ difficulty.easy } 
        //         onGenerate={ onGenerate } 
        //         onInitialize={ onInitialize } 
        //         onUpdateSolution={ onUpdateSolution } 
        //         onUpdateStarting={ onUpdateStarting } 
        //     />
        //     <DifficultyControl 
        //         level={ difficulty.medium } 
        //         onGenerate={ onGenerate } 
        //         onInitialize={ onInitialize } 
        //         onUpdateSolution={ onUpdateSolution } 
        //         onUpdateStarting={ onUpdateStarting } 
        //     />
        //     <DifficultyControl 
        //         level={ difficulty.hard } 
        //         onGenerate={ onGenerate } 
        //         onInitialize={ onInitialize } 
        //         onUpdateSolution={ onUpdateSolution } 
        //         onUpdateStarting={ onUpdateStarting } 
        //     />
        // </div>
    );

}
