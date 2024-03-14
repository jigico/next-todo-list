export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return Response.json({ data });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { isDone } = await request.json();
  const { id } = params;
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ isDone })
  });

  const updateTodo = await response.json();
  return new Response(JSON.stringify(updateTodo), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
