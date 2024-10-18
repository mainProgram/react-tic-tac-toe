import {useState} from "react";

export default function Player({initialName, symbol, isActive, onPlayerNameSave}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function edit() {
        setIsEditing((editing) => !editing);
        if(isEditing){
            onPlayerNameSave(symbol, playerName)
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {
                    isEditing &&
                    <input
                        type="text"
                        value={playerName}
                        onChange={handleChange}
                    />
                }
                {!isEditing && <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={edit}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}