import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export default function Leaderboard({ scores }) {

    const [showBoard, setShowBoard] = useState(false);

    return (
        <div>
            <div className="py-3">
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
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr key={ "header" }>
                                { scores.length > 0 && Object.keys(scores[0]).map((key) => (
                                    <th>{ key }</th>
                                )) }
                            </tr>
                        </thead>
                        <tbody>
                            { scores.map((item) => (
                                <tr key={ item.score_id }>
                                    { Object.values(item).map((val) => (
                                        <td>{ val }</td>
                                    )) }
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );

}
