export default function Log({turns}) {
    return (
        <ol id='log'>
            {turns.map((turn, index) => (
                <li key={index}> Player {turn.player} selected row {turn.square.row} and column {turn.square.col}</li>
            ))}
        </ol>
    )
}