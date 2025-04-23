import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { setSelectedDay } from "@/store/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

export default function TitleAndActions() {
  const dispatch = useAppDispatch();
  const { selectedDay } = useAppSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      dispatch(setSelectedDay(format(date, "yyyy-MM-dd")));
    }
  };

  const handleSelectToday = () => {
    dispatch(setSelectedDay(format(new Date(), "yyyy-MM-dd")));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Title and Date */}
      <div className="w-full flex flex-row gap-4 items-center sm:w-auto text-center sm:text-left">
        <h1 className="text-2xl text-center font-bold">Tasks for:</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDay ? (
                format(new Date(selectedDay), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(selectedDay)}
              onSelect={handleDateChange}
              initialFocus
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-[calc(100%-1.5rem)] justify-start mx-3 mb-1.5 text-foreground hover:text-primary"
              onClick={handleSelectToday}
            >
              Select Today
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Add Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm text-muted-foreground">
            Add a new task to your list by filling out the form below.
          </p>
          <TaskForm closeModal={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
