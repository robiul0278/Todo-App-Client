import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUpdateTodoMutation } from "@/redux/api/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type Inputs = {
    id: string;
    title: string;
    description: string;
    priority?: string;
    isCompleted?: boolean | undefined;
};

const UpdateTodoModal = ({id, title, description,priority, isCompleted}: Inputs) => {
    const [updateTodo] = useUpdateTodoMutation();


    const {
        register,
        handleSubmit,
        reset,
        control, // Add control for Controller
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        const taskData = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            isCompleted,
        }
        const options = {
            id: id,
            data: taskData,
        }

        updateTodo(options);
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center text-blue-500 py-2 px-6 rounded-lg shadow-sm transition-all duration-200">
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogDescription>Update your task that you want to finish!</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2 py-4">
                        <div className="space-y-1">
                            <Label htmlFor="task" className="text-right">
                                Task
                            </Label>
                            <Input defaultValue={title} {...register("title", { required: true })} id="task" className="col-span-3" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea defaultValue={description} {...register("description", { required: true })} id="description" className="col-span-3" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-right">Priority</Label>
                            <Controller
                            defaultValue={priority}
                                name="priority"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <DialogClose asChild>
                            <Button type="submit" className="bg-primary-gradient">Update</Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateTodoModal;
