export default function Timer({ time, running }) {

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="center-div">
            <p className="timer-text">
                { minutes.toString().padStart(2, "0") }:{ seconds.toString().padStart(2, "0") }
            </p>
        </div>
    );

}
