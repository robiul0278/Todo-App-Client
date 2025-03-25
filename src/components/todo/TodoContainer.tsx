import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

interface Todo {
    _id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    isCompleted: boolean;
    dateTime: string;
}


const TodoContainer = () => {
    const [priority, setPriority] = useState<string>("");
    // Fetch data from server
    const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

    if (isError) return <div className="text-red-500 text-center font-semibold">Data fetching has occurred!</div>;
    // if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader size={48} className="text-indigo-600" /></div>;

    return (
        <div className="bg-primary-gradient mx-auto max-w-7xl p-1 space-y-2 rounded-xl">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">
                    Your Todo List
                </h1>

                <div className="flex space-x-4">
                    <AddTodoModal />
                    <TodoFilter priority={priority} setPriority={setPriority} />
                </div>
            </div>

            {/* Todo Grid */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Placeholder when there are no todos */}
                {todos?.data?.length === 0 ? (
                    <div className="flex justify-center items-center bg-white rounded-md p-8 shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">There are no tasks pending!</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {todos?.data?.map((todo: Todo) => (
                            <TodoCard key={todo._id} {...todo} isLoading={isLoading} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoContainer;
