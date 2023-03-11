import { useAppSelector } from "hooks/reduxHooks";
import React from "react";
import "./styles.css";

const TodoResults = () => {

  const {totalDone} = useAppSelector(state => state.todo);
  // Fix an ability to calculate completed tasks

  return <div className="todo-results">Done: {totalDone}</div>;
};

export default TodoResults;
