import { generate_board } from "./Game";

export default function DifficultyControl({ onGenerate, level }) {

    const label = level === 38 ? 'Easy' : level === 30 ? 'Medium' : 'Hard';

    function handleGenerate(level) {
        const [removed, board] = generate_board(level);
        onGenerate(board);
    }

    return (
        <div className="center-div">
            <button className="difficulty-btn" type="button" onClick={ () => handleGenerate(level) }>{ label }</button>
        </div>
    );

}
