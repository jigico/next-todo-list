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
