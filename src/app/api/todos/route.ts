export async function GET(request: Request) {
  try {
    const response = await fetch("http://localhost:4000/todos");
    const todos = await response.json();

    if (!todos) {
      return new Response("todos is not found", {
        status: 404
      });
    }

    return Response.json(todos);
  } catch (error) {
    // 에러 처리
    console.error("An error occurred while fetching todos:", error);
    return new Response("An error occurred while fetching todos", {
      status: 500
    });
  }
}

export async function POST(request: Request) {
  try {
    const { title, contents } = await request.json();

    if (!title) {
      return new Response("title is not found", {
        status: 404
      });
    }

    if (!contents) {
      return new Response("contents is not found", {
        status: 404
      });
    }

    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, contents, isDone: false })
    });

    const todo = await response.json();
    return Response.json(todo);
  } catch (error) {
    // 에러 처리
    console.error("An error occurred while fetching todos:", error);
    return new Response("An error occurred while fetching todos", {
      status: 500
    });
  }
}
