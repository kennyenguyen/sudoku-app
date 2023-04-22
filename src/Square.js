export default function Square({ value, onSquareClick, selection }) {

    return (
        <>
            <button className={ value === selection ? "square number-selected" : "square" } type="button" onClick={ onSquareClick }>
                { value !== 0 && value }
            </button>
        </>
    );
    
}
