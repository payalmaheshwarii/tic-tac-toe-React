export default function GameOver({ isDraw, player, handleRematch }) {
    return (
        <div id='game-over'>
            <h2>Game Over!</h2>
            {!isDraw && <p> You won {player}!!</p>}
            {isDraw && <p> It's a Draw</p>}
            <p> 
                <button onClick={handleRematch}> Rematch </button>
            </p>
        </div>
    );
}