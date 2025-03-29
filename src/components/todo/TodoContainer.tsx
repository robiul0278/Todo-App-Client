import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";
import TodoSkeleton from "./TodoSkeleton";
import { ModeToggle } from "../mode-toggle";
import { useTheme } from "../theme-provider";

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
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    
    // Fetch data from server
    const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

    if (isError) return <div className="text-red-500 text-center font-semibold">Data fetching has occurred!</div>;

    return (
        <div className={`mx-auto max-w-7xl p-1 space-y-2 rounded-xl transition-all duration-300 
            ${isDarkMode ? "bg-gray-900" : "bg-primary-gradient"}`}>
            {/* Header Section */}
            <div className={`flex justify-between items-center shadow-lg rounded-lg p-6 transition-all duration-300 
                ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                    Your Todo List
                </h1>
                <div className="flex space-x-1 md:space-x-4 ld:space-x-4">
                    <AddTodoModal />
                    <TodoFilter priority={priority} setPriority={setPriority} />
                    <ModeToggle />
                </div>
            </div>

            {/* Todo Grid */}
            {!isLoading ? (
                <div className={`p-6 rounded-lg shadow-md transition-all duration-300 
                    ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    {/* Placeholder when there are no todos */}
                    {todos?.data?.length === 0 ? (
                        <div className={`flex justify-center items-center rounded-md p-8 shadow-md transition-all duration-300 
                            ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}>
                            <h2 className="text-xl font-semibold">There are no tasks pending!</h2>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {todos?.data?.map((todo: Todo) => (
                                <TodoCard key={todo._id} {...todo} isLoading={isLoading} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <TodoSkeleton />
                </div>
            )}
        </div>
    );
};

export default TodoContainer;
