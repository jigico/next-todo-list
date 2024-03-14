"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";

export const TodoForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" ref={titleRef} />
      <input type="text" name="contents" ref={contentsRef} />
      <button>추가</button>
    </form>
  );
};
