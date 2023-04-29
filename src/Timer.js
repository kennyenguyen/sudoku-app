export default function Timer({ time }) {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="center-div">
            <h4 className="timer-text">
                { minutes.toString().padStart(2, "0") }:{ seconds.toString().padStart(2, "0") }
            </h4>
        </div>
    );

}
