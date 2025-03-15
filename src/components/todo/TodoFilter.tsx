import { useState } from "react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

const TodoFilter = () => {
    const [position, setPosition] = useState("bottom")

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="bg-primary-gradient">Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top">High</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Medium</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Low</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default TodoFilter