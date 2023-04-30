import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Leaderboard({ scores }) {

    const [showBoard, setShowBoard] = useState(false);

    const easyScores = scores.filter(score => score.difficulty === 'Easy').sort((a, b) => a.time - b.time);
    const mediumScores = scores.filter(score => score.difficulty === 'Medium').sort((a, b) => a.time - b.time);
    const hardScores = scores.filter(score => score.difficulty === 'Hard').sort((a, b) => a.time - b.time);

    return (
        <div>
            <div className="py-2 center-div">
                <Button
                    variant="info"
                    onClick={ () => setShowBoard(true) }
                    onMouseDown={ e => e.preventDefault() }
                >
                    Leaderboard
                </Button>
            </div>
            <Modal show={ showBoard } onHide={ () => setShowBoard(false) } size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs 
                        defaultActiveKey="easy" 
                        className="mb-3" 
                        justify 
                    >
                        <Tab eventKey="easy" title="Easy">
                            <Table bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { easyScores.map((score, index) => (
                                        <tr key={ score.score_id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ score.username }</td>
                                            <td>
                                                { Math.floor(score.time / 60).toString().padStart(2, "0") }:{ (score.time % 60).toString().padStart(2, "0") }
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="medium" title="Medium">
                            <Table bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { mediumScores.map((score, index) => (
                                        <tr key={ score.score_id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ score.username }</td>
                                            <td>
                                                { Math.floor(score.time / 60).toString().padStart(2, "0") }:{ (score.time % 60).toString().padStart(2, "0") }
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="hard" title="Hard">
                            <Table bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { hardScores.map((score, index) => (
                                        <tr key={ score.score_id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ score.username }</td>
                                            <td>
                                                { Math.floor(score.time / 60).toString().padStart(2, "0") }:{ (score.time % 60).toString().padStart(2, "0") }
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    );

}
