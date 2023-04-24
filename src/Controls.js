export default function Controls({ onUndo }) {

    function handleUndo() {
        onUndo();
    }

    return (
        <div>
            <input className="undo-btn" type="button" value="Undo" onClick={ () => handleUndo() } ></input>
        </div>
    );

}
