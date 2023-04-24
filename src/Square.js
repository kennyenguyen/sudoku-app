export default function Square({ board, solvedBoard, startingBoard, row, col, value, onSquareClick, selection }) {

    const matchSelection = (value === selection);
    const isCorrect = (board[row][col] === solvedBoard[row][col]);
    const isGiven = (startingBoard[row][col] !== 0);

    return (
        <>
            <button className={ `square ${matchSelection ? 'number-selected' : ''} ${isGiven ? 'given' : isCorrect ? 'correct' : 'incorrect'}` } type="button" onClick={ onSquareClick }>
                { value !== 0 && value }
            </button>
        </>
    );

}
