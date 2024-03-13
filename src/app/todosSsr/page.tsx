import { Todos } from "@/types/todos";
import React from "react";

const todosSsrPage = async () => {
  const response = await fetch("http://localhost:3000/api/todos", {
    cache: "no-cache"
  });
  const todos = await response.json();

  return (
    <ul>
      {todos?.map((todo: Todos) => {
        return (
          <li key={todo.id}>
            {todo.title}
            <p>{todo.contents}</p>
            <p>{todo.isDone ? "처리완료" : "처리중"}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default todosSsrPage;
