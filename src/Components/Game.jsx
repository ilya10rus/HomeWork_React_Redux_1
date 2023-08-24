import React from "react";
import Board from "./Board";
import { calculateWinner } from "../Who_winner";
import style from "./Game.module.css";
import { useDispatch, useSelector } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const isXNext = useSelector((state) => state.isXNext);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    const boardCopy = [...board];

    if (winner || boardCopy[index]) return;

    boardCopy[index] = isXNext ? "X" : "O";
	 
    dispatch({ type: "COPY_BOARD", payload: boardCopy });
    dispatch({ type: "UPDATE", payload: !isXNext });
  };

  const startNewGame = () => {
    return (
      <button
        className={style.Start_btn}
        onClick={() => {
          dispatch({ type: "NEW_GAME", payload: Array(9).fill(null) });
          dispatch({ type: "MOVE_X", payload: true });
        }}
      >
        Новоя игра
      </button>
    );
  };

  const who_winner = () => {
    if (winner) {
      return "Победитель: " + winner;
    } else if (!winner && board.includes(null)) {
      return "Сейчас ходит: " + (isXNext ? "X" : "O");
    } else if (!board.includes(null) && !winner) {
      return "Ничья";
    }
  };

  return (
    <div className={style.wrapper}>
      {startNewGame()}
      <Board squares={board} click={handleClick} />
      <p className={style.text}>{who_winner()}</p>
    </div>
  );
};

export default Game;
