export default function Controls({ onUndo, counter, onUpdateCounter, placements, onUpdatePlacements }) {

    function handleUndo() {
        onUndo();
    }

    return (
        <div>
            <input className="undo-btn" type="button" value="Undo" onClick={ () => handleUndo() } ></input>
        </div>
    );

}
