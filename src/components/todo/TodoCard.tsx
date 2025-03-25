import { motion } from "framer-motion"; // Import motion
import { Button } from "../ui/button";
import { useRemoveTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import UpdateTodoModal from "./UpdateTodoModal";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import TodoSkeleton from "./TodoSkeleton";

interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  dateTime: string;
  isLoading: boolean;
}

const TodoCard = ({
  _id,
  title,
  description,
  isCompleted,
  dateTime,
  priority,
  isLoading,
}: Todo) => {
  // const dispatch = useAppDispatch();
  const [updateTodo, {isLoading: isUpdating}] = useUpdateTodoMutation();
  const [removeTodo, {isLoading: isRemoving }] = useRemoveTodoMutation();

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

  if (isUpdating) return <TodoSkeleton/>
  if (isLoading) return <TodoSkeleton/>

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 w-full mx-auto border border-gray-300 space-y-6"
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
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{title}</p>
        </div>
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
      </div>

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-400">{dateTime}</p>
        <p className="text-sm text-gray-500">
          {isCompleted ? (
            <span className="text-green-500 font-medium">Completed</span>
          ) : (
            <span className="text-red-500 font-medium">Pending</span>
          )}
        </p>
      </div>

      <p className="text-gray-700 text-[16px]">{description}</p>

      <div className="flex justify-center space-x-5 mt-6">
        <Button
          onClick={() => handleRemove(_id)}
          variant="outline"
          className="flex items-center justify-center  text-red-500 py-2 px-6 rounded-lg shadow-sm  transition-all duration-200"
        >
        <Trash2 />
        {isRemoving ? "Removing..." : "Remove"}
        </Button>
        <UpdateTodoModal id={_id} title={title} description={description} priority={priority} isCompleted={isCompleted} />
      </div>
    </motion.div>
  );
};

export default TodoCard;
