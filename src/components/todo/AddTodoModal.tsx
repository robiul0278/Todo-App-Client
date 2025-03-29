import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAddTodoMutation } from "@/redux/api/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type Inputs = {
  title: string;
  description: string;
  priority: string;
};

const AddTodoModal = () => {
  const [addTodo,] = useAddTodoMutation();


  const {
    register,
    handleSubmit,
    reset,
    control, // Add control for Controller
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    const time = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const taskData = {
      title: data.title,
      description: data.description,
      dateTime: time,
      isCompleted: false,
      priority: data.priority,
    };

    addTodo(taskData);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add your task that you want to finish!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-4">
            <div className="space-y-1">
              <Label htmlFor="task" className="text-right">
                Title
              </Label>
              <Input 
              placeholder="write title"
              {...register("title", { required: true })} id="task" className="col-span-3" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea 
              placeholder="Type your message here."
              {...register("description", { required: true })} id="description" className="col-span-3" />
            </div>
            <div className="space-y-1">
              <Label className="text-right">Priority</Label>
              <Controller
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
           <Button type="submit" className="bg-primary-gradient">Submit</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
