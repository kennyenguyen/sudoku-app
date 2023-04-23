export default function Controls({ onUndo, counter, onUpdateCounter, placements, onUpdatePlacements }) {

    function handleUndo() {
        if (placements !== undefined && placements.length !== 0) {
            const newPlacements = [...placements];
            const [val, row, col] = newPlacements.pop();
            const newCounter = new Map(counter);
            newCounter.set(val, newCounter.get(val) - 1);
            onUpdatePlacements(newPlacements);
            onUpdateCounter(newCounter);
        }
        onUndo();
    }

    return (
        <div>
            <input className="undo-btn" type="button" value="Undo" onClick={ () => handleUndo() } ></input>
        </div>
    );

}
