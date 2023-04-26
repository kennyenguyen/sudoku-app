import Button from 'react-bootstrap/Button';
import { generate_board } from "./helper";
import { initial_counter } from "./helper";

export default function DifficultyControl({ level, onGenerate, onInitialize, onUpdateSolution, onUpdateStarting, onClose }) {

    const label = level === 40 ? 'Easy' : level === 36 ? 'Medium' : 'Hard';

    const color = level === 40 ? 'info' : level === 36 ? 'warning' : 'danger';

    function handleGenerate(level) {
        const [removed, board, solvedBoard] = generate_board(level);
        const counter = initial_counter(board);
        onInitialize(counter);
        onGenerate(board);
        onUpdateSolution(solvedBoard);
        onUpdateStarting(board);
        onClose();
    }

    return (
        <div className="center-div">
            <Button className="difficulty-btn" variant={ color } onClick={ () => handleGenerate(level) }>{ label }</Button>
        </div>
    );

}
