import { motion } from "framer-motion"; // Import motion
import { Button } from "../ui/button";
import { useRemoveTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { Loader } from "lucide-react";
import UpdateTodoModal from "./UpdateTodoModal";
import { Input } from "../ui/input";

interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  dateTime: string;
}

const TodoCard = ({
  _id,
  title,
  description,
  isCompleted,
  dateTime,
  priority,
}: Todo) => {
  // const dispatch = useAppDispatch();
  const [updateTodo, { isLoading, isError }] = useUpdateTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();

  console.log(isCompleted);

  const toggleState = () => {
    // dispatch(toggleComplete(id));
    const taskData = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    }
    const options = {
      id: _id,
      data: taskData,
    }
    updateTodo(options);
  };

  const handleRemove = (id: string) => {
    removeTodo(id);
  }

  if (isError) return <div className="text-red-500 text-center font-semibold">An error has occurred!</div>;
  if (isLoading) return <div className="flex justify-center items-center"><Loader size={48} className="text-indigo-600" /></div>;

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-6 w-full mx-auto border border-gray-300 space-y-6"
      initial={{ opacity: 0, y: 20 }} // Initial state (faded and slightly below)
      animate={{ opacity: 1, y: 0 }} // Final state (fully visible and in place)
      exit={{ opacity: 0, y: 20 }} // Exit animation (faded and slightly below)
      transition={{ duration: 0.5 }} // Duration of the animation
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.98 }} 
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Input
            onChange={toggleState}
            checked={isCompleted}
            type="checkbox"
            id="terms"
            className="w-5 h-5 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xl font-semibold text-gray-800">{title}</p>
        </div>
        <p className="text-sm text-gray-400">{dateTime}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${priority === "high"
                ? "bg-red-500"
                : priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
          ></div>
          <p className="text-sm text-gray-600 capitalize">{priority}</p>
        </div>
        <p className="text-sm text-gray-500">
          {isCompleted ? (
            <span className="text-green-500 font-medium">Completed</span>
          ) : (
            <span className="text-red-500 font-medium">Pending</span>
          )}
        </p>
      </div>

      <p className="text-gray-700 text-lg">{description}</p>

      <div className="flex justify-center space-x-5 mt-6">
        <Button
          onClick={() => handleRemove(_id)}
          variant="outline"
          className="flex items-center justify-center  text-red-500 py-2 px-6 rounded-lg shadow-sm  transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Remove
        </Button>
        <UpdateTodoModal id={_id} title={title} description={description} isCompleted={isCompleted}/>
      </div>
    </motion.div>
  );
};

export default TodoCard;
