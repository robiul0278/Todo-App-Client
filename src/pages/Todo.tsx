import Container from "@/components/todo/Container";
import TodoContainer from "@/components/todo/TodoContainer";


const Todo = () => {
  return (
    <Container>
        <h1 className="text-center font-semibold text-2xl">My Todos</h1>
        <TodoContainer/>
    </Container>
  )
}

export default Todo;