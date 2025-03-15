
import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form"
import { addTodo } from "@/redux/features/todoSlice";

type Inputs = {
    title: string
    description: string
  }

const AddTodoModal = () => {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        const randomId = Math.random().toString(36).substring(2);
        const time = new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const taskData = {
            id: randomId,
            title: data.title,
            description: data.description,
            time,
        }
        dispatch(addTodo(taskData))
    }

  return (
    <Dialog>
    <DialogTrigger asChild>
       <Button className="bg-primary-gradient">Add todo</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
        <DialogDescription>
          Add your task that you want to finish!
        </DialogDescription>
      </DialogHeader>
  <form onSubmit={handleSubmit(onSubmit)}>
  <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="task" className="text-right">
            Task
          </Label>
          <Input
          {...register("title", { required: true })}
            id="task"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
              {...register("description", { required: true })}
            id="description"
            className="col-span-3"
          />
        </div>
      </div>
      <div className="flex justify-end">
        {/* <DialogClose asChild> */}
        <Button type="submit" className="bg-primary-gradient">Save changes</Button>
        {/* </DialogClose> */}
      </div>
  </form>
    </DialogContent>
  </Dialog>
  )
}

export default AddTodoModal;