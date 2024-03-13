export async function GET(request: Response) {
  const response = await fetch("http://localhost:4000/todos");
  const todos = await response.json();

  if (!todos) {
    return new Response("todos is not found", {
      status: 404
    });
  }

  return Response.json(todos);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const response = await fetch("http://localhost:4000/todos", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content, isDone: false })
  });

  const todo = await response.json();
  return Response.json(todo);
}
