export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    // 에러 처리
    console.error("An error occurred while fetching todos:", error);
    return new Response("An error occurred while fetching todos", {
      status: 500
    });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
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
  } catch (error) {
    // 에러 처리
    console.error("An error occurred while fetching todos:", error);
    return new Response("An error occurred while fetching todos", {
      status: 500
    });
  }
}
