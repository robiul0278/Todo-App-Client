import { useTheme } from "../theme-provider";
import CardSkeleton from "./CardSkeleton";

const TodoSkeleton = () => { 
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
};

export default TodoSkeleton;
