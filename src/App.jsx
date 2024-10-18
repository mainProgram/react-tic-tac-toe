import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function getActivePlayer(prevState) {
    let currentPlayer = "X"

    if (prevState.length > 0 && prevState[0].player === "X") {
        currentPlayer = "O"
    }
    return currentPlayer;
}

function derivedWinner(gameBoard, players) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
        console.log(firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol)

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
            console.log(players)
            console.log("win:", winner)
        }
    }
    return winner;
}

function deriveGameBoard(gameTurn) {
    let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const turn of gameTurn) {
        const {square, player} = turn
        const {row, col} = square

        gameBoard[row][col] = player
    }
    return gameBoard;
}

const PLAYERS = {
    X: "Player 1",
    O: "Player 2"
};

function App() {
    const [gameTurn, setGamesTurn] = useState([]);
    const [players, setPlayers] = useState(PLAYERS)
    const activePlayer = getActivePlayer(gameTurn);
    const gameBoard = deriveGameBoard(gameTurn);
    const winner = derivedWinner(gameBoard, players);
    const hasDraw = gameTurn.length === 9 && !winner

    function handleRestart() {
        setGamesTurn([])
    }

    function handleSelectSquare(rowIndex, colIndex) {
        setGamesTurn(prevState => {
            let currentPlayer = getActivePlayer(prevState);

            let updatedTurns;
            updatedTurns = [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevState];

            return updatedTurns
        })
    }

    function handlePlayerNameChange(symbol, name){
        setPlayers((prevState) => {
            return {...prevState, [symbol]: name}
        })
    }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onPlayerNameSave={handlePlayerNameChange}/>
            <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onPlayerNameSave={handlePlayerNameChange}/>
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard
            onSelectSquare={handleSelectSquare}
            board={gameBoard}
        />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
