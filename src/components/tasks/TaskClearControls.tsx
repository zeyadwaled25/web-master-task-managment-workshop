import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { clearDayTasks, clearTasks } from '@/store/features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { format } from 'date-fns';
import { ListChecks, CalendarDays } from 'lucide-react';
import { useState } from 'react';

export default function TaskClearControls() {
  const dispatch = useAppDispatch();
  const { isInitialized, tasks, selectedDay } = useAppSelector((state) => state.tasks);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const clearTasksForDay = () => {
    dispatch(clearDayTasks(selectedDay));
    setIsConfirmOpen(false);
  };

  const clearAllTasks = () => {
    dispatch(clearTasks());
    setIsConfirmOpen(false);
  };

  const formatedDate = format(new Date(), "yyyy-MM-dd");
  const dayTasksCount = tasks.filter((task) => task.date === selectedDay).length;

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-muted bg-muted/50 px-4 py-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            <div className="text-center flex items-center">
              <div className="text-sm text-muted-foreground">
                All Tasks:&nbsp;
              </div>
              <div className="font-medium text-base">{tasks.length}</div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div className="text-center flex items-center">
              <div className="text-sm text-primary">
                Tasks for {formatedDate}:&nbsp;
              </div>
              <div className="font-medium text-base">{dayTasksCount}</div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={tasks.length === 0 || !isInitialized}
            className="w-full sm:w-auto"
            title={tasks.length === 0 ? "No tasks to clear" : ""}
          >
            Clear All
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete your tasks? You can delete all tasks
            or just the ones from <strong>{selectedDay}</strong>.
          </p>

          <Separator />

          <DialogFooter className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button variant="secondary" onClick={clearTasksForDay}>
              Delete for this day only
            </Button>
            <Button variant="destructive" onClick={clearAllTasks}>
              Delete all tasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
