export default function GameBoard({handleActive, board}) {
    return (
        <ol id='game-board'>
            {board.map((row, rowInd) => (
                <li key={rowInd}>
                    <ol>
                        {row.map((symbol, symbolIndex) => (
                            <button key={symbolIndex} onClick={()=> handleActive(rowInd, symbolIndex, symbol)} disabled = {symbol!==null}> {symbol}</button>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}