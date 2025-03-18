import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface TodoFilterProps {
  priority: string;
  setPriority: (value: string) => void;
}

const TodoFilter = ({priority, setPriority}: TodoFilterProps) => {

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="bg-primary-gradient">Filter</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
        <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default TodoFilter;