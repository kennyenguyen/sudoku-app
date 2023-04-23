export default function NumberDisplay({ selection, onSelect, counter }) {

    function handleClick(num) {
        onSelect(num);
    }

    return (
        <>
            <ul className="number-display-list">
                <li className={ counter.get(1) >= 9 ? "invisible number-display" : "number-display" } key={ 1 }>
                    <input className={ selection === 1 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="1" onClick={ () => handleClick(1) } />
                </li>
                <li className={ counter.get(2) >= 9 ? "invisible number-display" : "number-display" } key={ 2 }>
                    <input className={ selection === 2 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="2" onClick={ () => handleClick(2) } />
                </li>
                <li className={ counter.get(3) >= 9 ? "invisible number-display" : "number-display" } key={ 3 }>
                    <input className={ selection === 3 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="3" onClick={ () => handleClick(3) } />
                </li>
                <li className={ counter.get(4) >= 9 ? "invisible number-display" : "number-display" } key={ 4 }>
                    <input className={ selection === 4 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="4" onClick={ () => handleClick(4) } />
                </li>
                <li className={ counter.get(5) >= 9 ? "invisible number-display" : "number-display" } key={ 5 }>
                    <input className={ selection === 5 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="5" onClick={ () => handleClick(5) } />
                </li>
                <li className={ counter.get(6) >= 9 ? "invisible number-display" : "number-display" } key={ 6 }>
                    <input className={ selection === 6 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="6" onClick={ () => handleClick(6) } />
                </li>
                <li className={ counter.get(7) >= 9 ? "invisible number-display" : "number-display" } key={ 7 }>
                    <input className={ selection === 7 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="7" onClick={ () => handleClick(7) } />
                </li>
                <li className={ counter.get(8) >= 9 ? "invisible number-display" : "number-display" } key={ 8 }>
                    <input className={ selection === 8 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="8" onClick={ () => handleClick(8) } />
                </li>
                <li className={ counter.get(9) >= 9 ? "invisible number-display" : "number-display" } key={ 9 }>
                    <input className={ selection === 9 ? "number-display-btn number-selected" : "number-display-btn" } type="button" value="9" onClick={ () => handleClick(9) } />
                </li>
            </ul>
        </>
    );
}
