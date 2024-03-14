"use client";

import type { Todos } from "@/types/todos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const TodoList = () => {
  const { data, isLoading, isError } = useQuery<Todos[]>({
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      const todos = response.json();
      return todos;
    },
    queryKey: ["todos"]
  });

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <ul>
      {data?.map((todo: Todos) => {
        return (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            <p>{todo.contents}</p>
            <div>
              <button>{todo.isDone ? "취소" : "완료"}</button>
              <button>삭제</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
