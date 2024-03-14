"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

export const TodoForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo: { title: string; contents: string }) => {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  //todo 등록
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const target = e.target as typeof e.target & {
      title: { value: string };
      contents: { value: string };
    };
    const title = target.title.value;
    const contents = target.contents.value;

    if (!title) {
      alert("제목을 입력해주세요.");
      titleRef.current?.focus();
      return;
    }
    if (!contents) {
      alert("내용을 입력해주세요.");
      contentsRef.current?.focus();
      return;
    }

    const newTodo = {
      title,
      contents
    };

    mutation.mutate(newTodo);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <label htmlFor="title">제목</label>
      <input type="text" id="title" name="title" ref={titleRef} className="mx-2 border border-slate-300 rounded indent-1.5" placeholder="제목을 입력해주세요." />
      <label htmlFor="title">내용</label>
      <input type="text" content="contents" name="contents" ref={contentsRef} className="mx-2 border border-slate-300 rounded indent-1.5" placeholder="내용을 입력해주세요." />
      <button className="p-1 rounded border-transparent bg-slate-800 hover:bg-slate-950 text-white text-sm">추가</button>
    </form>
  );
};
