import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import Link from "next/link";
import React from "react";

const TodosCsrPage = () => {
  return (
    <div>
      <Link href="/report" className="btn btn-xs">
        할일정보통계 보러가기
      </Link>
      <TodoForm />
      <TodoList isActive={false} />
      <TodoList isActive={true} />
    </div>
  );
};

export default TodosCsrPage;
