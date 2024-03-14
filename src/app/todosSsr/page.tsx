import { Todos } from "@/types/todos";
import Link from "next/link";
import React from "react";

const todosSsrPage = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache"
  });
  const todos = await response.json();

  return (
    <>
      <Link href="/report">할일정보통계 보러가기</Link>
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
    </>
  );
};

export default todosSsrPage;
