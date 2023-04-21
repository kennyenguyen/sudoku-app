import { generate_board } from "./Game";

export default function DifficultyControl({ onGenerate, level }) {

    const label = level === 38 ? 'Easy' : level === 30 ? 'Medium' : 'Hard';

    function handleGenerate(level) {
        const board = generate_board(level);
        onGenerate(board);
    }

    return (
        <>
            <button type="button" onClick={ () => handleGenerate(level) }>{ label }</button>
        </>
    );
}
