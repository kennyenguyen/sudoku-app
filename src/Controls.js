export default function Controls({ onUndo }) {

    function handleUndo() {
        onUndo();
    }

    return (
        <div className="pb-2 center-div">
            <input className="btn btn-danger" type="button" value="Undo" onClick={ () => handleUndo() } ></input>
        </div>
    );

}
