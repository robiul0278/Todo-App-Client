import { useAppSelector } from "@/redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
    const {todos} = useAppSelector((state)=> state.todos)
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
               
                <AddTodoModal/>
               <TodoFilter/>

            </div>
            <div className="bg-primary-gradient w-full h-full rounded-lg p-1">
                {/* <div className="flex justify-center bg-white rounded-md p-5">
            <h1 className="font-bold">There are no task pending!</h1>
        </div> */}
                <div className="bg-white rounded-lg space-y-2 p-2">
                    {
                        todos.map((todo) => (
                            <TodoCard key={todo.id} {...todo} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoContainer;