import { generate_board } from "./Game";
import { initial_counter } from "./Game";

export default function DifficultyControl({ onGenerate, onInitialize, level }) {

    const label = level === 40 ? 'Easy' : level === 35 ? 'Medium' : 'Hard';

    function handleGenerate(level) {
        const [removed, board, solvedBoard] = generate_board(level);
        const counter = initial_counter(board);
        onInitialize(counter);
        onGenerate(board);
    }

    return (
        <div className="center-div">
            <button className="difficulty-btn" type="button" onClick={ () => handleGenerate(level) }>{ label }</button>
        </div>
    );

}
