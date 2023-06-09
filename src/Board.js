import Square from './Square';
import { completed_board } from './helper';

export default function Board({ board, solvedBoard, startingBoard, selection, counter, placements, onMove, onSelect, onUpdateCounter, onUpdatePlacements, onShowGameOver, onStopTimer, onCreateScore }) {

    function handleClick(row, col, val) {
        if (board[row][col] === 0 && counter.get(val) < 9) {
            let num_cells = 0;
            for (let key = 1; key < 10; key++) {
                num_cells += counter.get(key);
            }
            if (counter.get(val) === 8 && num_cells < 80) {
                let num = (selection % 9) + 1;
                while (counter.get(num) === 9) {
                    num = (num % 9) + 1;
                    console.log(num);
                }
                onSelect(num);
            }
            const newBoard = board.map(row => row.slice());
            newBoard[row][col] = val;
            if (num_cells === 80 && completed_board(newBoard, solvedBoard)) {
                onStopTimer();
                onShowGameOver();
                onCreateScore();
            }
            const newCounter = new Map(counter);
            newCounter.set(val, newCounter.get(val) + 1);
            const newPlacements = [...placements];
            newPlacements.push([val, row, col]);
            onMove(newBoard);
            onUpdateCounter(newCounter);
            onUpdatePlacements(newPlacements);
        }
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 0 } value={ board[0][0] } onSquareClick={ () => handleClick(0, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 1 } value={ board[0][1] } onSquareClick={ () => handleClick(0, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 2 } value={ board[0][2] } onSquareClick={ () => handleClick(0, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 3 } value={ board[0][3] } onSquareClick={ () => handleClick(0, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 4 } value={ board[0][4] } onSquareClick={ () => handleClick(0, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 5 } value={ board[0][5] } onSquareClick={ () => handleClick(0, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 6 } value={ board[0][6] } onSquareClick={ () => handleClick(0, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 7 } value={ board[0][7] } onSquareClick={ () => handleClick(0, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 0 } col={ 8 } value={ board[0][8] } onSquareClick={ () => handleClick(0, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 0 } value={ board[1][0] } onSquareClick={ () => handleClick(1, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 1 } value={ board[1][1] } onSquareClick={ () => handleClick(1, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 2 } value={ board[1][2] } onSquareClick={ () => handleClick(1, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 3 } value={ board[1][3] } onSquareClick={ () => handleClick(1, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 4 } value={ board[1][4] } onSquareClick={ () => handleClick(1, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 5 } value={ board[1][5] } onSquareClick={ () => handleClick(1, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 6 } value={ board[1][6] } onSquareClick={ () => handleClick(1, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 7 } value={ board[1][7] } onSquareClick={ () => handleClick(1, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 1 } col={ 8 } value={ board[1][8] } onSquareClick={ () => handleClick(1, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 0 } value={ board[2][0] } onSquareClick={ () => handleClick(2, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 1 } value={ board[2][1] } onSquareClick={ () => handleClick(2, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 2 } value={ board[2][2] } onSquareClick={ () => handleClick(2, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 3 } value={ board[2][3] } onSquareClick={ () => handleClick(2, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 4 } value={ board[2][4] } onSquareClick={ () => handleClick(2, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 5 } value={ board[2][5] } onSquareClick={ () => handleClick(2, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 6 } value={ board[2][6] } onSquareClick={ () => handleClick(2, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 7 } value={ board[2][7] } onSquareClick={ () => handleClick(2, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 2 } col={ 8 } value={ board[2][8] } onSquareClick={ () => handleClick(2, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 0 } value={ board[3][0] } onSquareClick={ () => handleClick(3, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 1 } value={ board[3][1] } onSquareClick={ () => handleClick(3, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 2 } value={ board[3][2] } onSquareClick={ () => handleClick(3, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 3 } value={ board[3][3] } onSquareClick={ () => handleClick(3, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 4 } value={ board[3][4] } onSquareClick={ () => handleClick(3, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 5 } value={ board[3][5] } onSquareClick={ () => handleClick(3, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 6 } value={ board[3][6] } onSquareClick={ () => handleClick(3, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 7 } value={ board[3][7] } onSquareClick={ () => handleClick(3, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 3 } col={ 8 } value={ board[3][8] } onSquareClick={ () => handleClick(3, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 0 } value={ board[4][0] } onSquareClick={ () => handleClick(4, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 1 } value={ board[4][1] } onSquareClick={ () => handleClick(4, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 2 } value={ board[4][2] } onSquareClick={ () => handleClick(4, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 3 } value={ board[4][3] } onSquareClick={ () => handleClick(4, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 4 } value={ board[4][4] } onSquareClick={ () => handleClick(4, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 5 } value={ board[4][5] } onSquareClick={ () => handleClick(4, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 6 } value={ board[4][6] } onSquareClick={ () => handleClick(4, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 7 } value={ board[4][7] } onSquareClick={ () => handleClick(4, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 4 } col={ 8 } value={ board[4][8] } onSquareClick={ () => handleClick(4, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 0 } value={ board[5][0] } onSquareClick={ () => handleClick(5, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 1 } value={ board[5][1] } onSquareClick={ () => handleClick(5, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 2 } value={ board[5][2] } onSquareClick={ () => handleClick(5, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 3 } value={ board[5][3] } onSquareClick={ () => handleClick(5, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 4 } value={ board[5][4] } onSquareClick={ () => handleClick(5, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 5 } value={ board[5][5] } onSquareClick={ () => handleClick(5, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 6 } value={ board[5][6] } onSquareClick={ () => handleClick(5, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 7 } value={ board[5][7] } onSquareClick={ () => handleClick(5, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 5 } col={ 8 } value={ board[5][8] } onSquareClick={ () => handleClick(5, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 0 } value={ board[6][0] } onSquareClick={ () => handleClick(6, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 1 } value={ board[6][1] } onSquareClick={ () => handleClick(6, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 2 } value={ board[6][2] } onSquareClick={ () => handleClick(6, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 3 } value={ board[6][3] } onSquareClick={ () => handleClick(6, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 4 } value={ board[6][4] } onSquareClick={ () => handleClick(6, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 5 } value={ board[6][5] } onSquareClick={ () => handleClick(6, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 6 } value={ board[6][6] } onSquareClick={ () => handleClick(6, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 7 } value={ board[6][7] } onSquareClick={ () => handleClick(6, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 6 } col={ 8 } value={ board[6][8] } onSquareClick={ () => handleClick(6, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 0 } value={ board[7][0] } onSquareClick={ () => handleClick(7, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 1 } value={ board[7][1] } onSquareClick={ () => handleClick(7, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 2 } value={ board[7][2] } onSquareClick={ () => handleClick(7, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 3 } value={ board[7][3] } onSquareClick={ () => handleClick(7, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 4 } value={ board[7][4] } onSquareClick={ () => handleClick(7, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 5 } value={ board[7][5] } onSquareClick={ () => handleClick(7, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 6 } value={ board[7][6] } onSquareClick={ () => handleClick(7, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 7 } value={ board[7][7] } onSquareClick={ () => handleClick(7, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 7 } col={ 8 } value={ board[7][8] } onSquareClick={ () => handleClick(7, 8, selection) } selection={ selection } /></td>
                    </tr>
                    <tr>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 0 } value={ board[8][0] } onSquareClick={ () => handleClick(8, 0, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 1 } value={ board[8][1] } onSquareClick={ () => handleClick(8, 1, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 2 } value={ board[8][2] } onSquareClick={ () => handleClick(8, 2, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 3 } value={ board[8][3] } onSquareClick={ () => handleClick(8, 3, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 4 } value={ board[8][4] } onSquareClick={ () => handleClick(8, 4, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 5 } value={ board[8][5] } onSquareClick={ () => handleClick(8, 5, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 6 } value={ board[8][6] } onSquareClick={ () => handleClick(8, 6, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 7 } value={ board[8][7] } onSquareClick={ () => handleClick(8, 7, selection) } selection={ selection } /></td>
                        <td><Square board={ board } solvedBoard={ solvedBoard } startingBoard={ startingBoard } row={ 8 } col={ 8 } value={ board[8][8] } onSquareClick={ () => handleClick(8, 8, selection) } selection={ selection } /></td>
                    </tr>
                </tbody>
            </table>
        </>
    );

}
