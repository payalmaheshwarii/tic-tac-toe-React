import { useState } from "react"

export default function Player({ initialName, symbol, isActive , handlePlayerChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);


    function handleEditClick() {
        setIsEditing((edit) => !edit);
        handlePlayerChange(symbol, name);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    let playerName = <span className="player-name"> {name} </span>
    let editText = 'Edit'
    if (isEditing) {
        playerName = <input type='text' required value={name} onChange={handleNameChange}/>
        editText = 'Save'
    }

    return (
        <li className={isActive?"active": undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol"> {symbol}  </span>

            </span>
            <button onClick={handleEditClick}>
                {editText}
            </button>
        </li>)
}