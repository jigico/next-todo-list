import { Todos } from "@/types/todos";
import Link from "next/link";
import React from "react";

const TodosSsrPage = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache"
  });
  const todos = await response.json();

  return (
    <>
      <Link href="/report" className="btn btn-xs">
        할일정보통계 보러가기
      </Link>
      <ul className="mt-4 mb-8 grid grid-cols-4 gap-4">
        {todos?.map((todo: Todos) => {
          return (
            <li key={todo.id} className="shadow p-4 rounded">
              {todo.isDone ? <p className="badge badge-primary badge-outline">처리완료</p> : <p className="badge badge-secondary badge-outline">처리중</p>}
              <p className="font-bold">{todo.title}</p>
              <p>{todo.contents}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodosSsrPage;
