"use client";

import type { Todos } from "@/types/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export const TodoList = ({ isActive }: { isActive: boolean }) => {
  const { data, isLoading, isError } = useQuery<Todos[]>({
    queryFn: async () => {
      const response = await fetch("/api/todos");
      const todos = response.json();
      return todos;
    },
    queryKey: ["todos"]
  });
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const patchMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isDone })
      });
      await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  //todo 삭제
  const handleDeleteTodo = (id: string) => {
    if (window.confirm("정말 삭제할까요?")) {
      deleteMutation.mutate(id);
      alert("삭제를 완료했습니다.");
    } else {
      alert("삭제를 취소했습니다.");
    }
  };

  //todo 완료 상태 toggle
  const handleToggleIsDone = (id: string, isDone: boolean) => {
    patchMutation.mutate({ id, isDone: !isDone });
  };

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

  if (isLoading) {
    return (
      <div className="m-4 flex flex-col gap-4 w-full">
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-40 w-full"></div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <h2 className="mb-4 text-lg font-bold">{isActive ? "🎉 완료한 일" : "😀 해야할 일"}</h2>
      <ul className="mb-8 grid grid-cols-4 gap-4">
        {data
          ?.filter((todo: Todos) => todo.isDone === isActive)
          .map((todo: Todos) => {
            return (
              <li key={todo.id} className="shadow p-4 rounded">
                <strong>{todo.title}</strong>
                <p>{todo.contents}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="btn btn-outline btn-success btn-sm w-1/2"
                    onClick={() => {
                      handleToggleIsDone(todo.id, todo.isDone);
                    }}
                  >
                    {todo.isDone ? "취소" : "완료"}
                  </button>
                  <button className="btn btn-outline btn-error btn-sm w-1/2" onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
