import type { Todos } from "@/types/todos";
import React from "react";

const ReportPage = async () => {
  const response = await fetch("http://localhost:4000/todos", {
    next: {
      revalidate: 5
    }
  });
  const todos: Todos[] = await response.json();

  return (
    <div>
      <p>현재까지 {todos.length}개의 todolist가 등록되었습니다.</p>
      <p>
        할일 수 : {todos.filter((todo) => todo.isDone === false).length}개 / 완료 수 : {todos.filter((todo) => todo.isDone === true).length}개
      </p>
    </div>
  );
};

export default ReportPage;
