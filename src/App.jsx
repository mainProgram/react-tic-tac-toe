import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";

function getActivePlayer(prevState) {
    let currentPlayer = "X"

    if (prevState.length > 0 && prevState[0].player === "X") {
        currentPlayer = "O"
    }
    return currentPlayer;
}

function App() {
    const [gameTurn, setGamesTurn] = useState([]);
    //const [activePlayer, setActivePlayer] = useState("X");
    let activePlayer = getActivePlayer(gameTurn);

    function handleSelectSquare(rowIndex, colIndex) {
       // setActivePlayer((prevState) => prevState === "X" ? "O" : "X")
        setGamesTurn(prevState => {
            let currentPlayer = getActivePlayer(prevState);

            let updatedTurns;
            updatedTurns = [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevState];

            return updatedTurns
        })
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName="Fa" symbol="X" isActive={activePlayer === "X"}/>
            <Player initialName="Max" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        <GameBoard
            onSelectSquare={handleSelectSquare}
            turns={gameTurn}
        />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
