import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import React from "react";

const todosCsrPage = () => {
  return (
    <div>
      <TodoForm />
      <TodoList isActive={false} />
      <TodoList isActive={true} />
    </div>
  );
};

export default todosCsrPage;
