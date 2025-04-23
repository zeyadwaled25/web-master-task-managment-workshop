import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { deleteTaskById, updateTaskData } from '@/store/features/tasks/tasksSlice';
import { useAppDispatch } from '@/store/hooks';
import type TaskType from '@/types/Task';
import type { Priority, Status } from '@/types/Task';
import { motion } from 'framer-motion';
import { Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Task({ idx, task }: { idx: number; task: TaskType }) {
  const dispatch = useAppDispatch();
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
  const [isDescEditing, setIsDescEditing] = useState<boolean>(false);

  // Handlers
  const handleQuickToggle = (_id: TaskType['_id']) => {
    if (task.status === 'Done') {
      dispatch(updateTaskData({ _id, status: 'In Progress' }));
    } else {
      dispatch(updateTaskData({ _id, status: 'Done' }));
    }
  };

  const handleNameChange = (_id: TaskType['_id'], name: string) => {
    dispatch(updateTaskData({ _id, name }));
    setIsNameEditing(false);
  };

  const handleDescriptionChange = (_id: TaskType['_id'], description: string) => {
    dispatch(updateTaskData({ _id, description }));
    setIsDescEditing(false);
  };

  const handlePriorityChange = (_id: TaskType['_id'], priority: Priority) => {
    dispatch(updateTaskData({ _id, priority }));
  };

  const handleStatusChange = (_id: TaskType['_id'], status: Status) => {
    dispatch(updateTaskData({ _id, status }));
  };

  const handleDelete = (_id: TaskType['_id']) => {
    dispatch(deleteTaskById(_id));
  };

  return (
    <motion.div
      key={task._id}
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: idx * 0.05, duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'bg-card group hover:bg-card/70 flex flex-col items-start justify-between gap-4 rounded-lg border p-4 transition-colors duration-200 sm:flex-row sm:items-center'
      )}
    >
      <div className="flex w-full items-center gap-3 sm:w-auto">
        <Checkbox
          checked={task.status === 'Done'}
          onCheckedChange={() => handleQuickToggle(task._id)}
          className="h-6 w-6"
        />
        <div className="flex min-w-xs flex-1 flex-col">
          {isNameEditing ? (
            <Input
              defaultValue={task.name}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                handleNameChange(task._id, (e.target as HTMLInputElement).value)
              }
              autoFocus
              className="w-full sm:w-40"
            />
          ) : (
            <div className="flex items-center">
              <p className="font-medium" onTouchEnd={() => setIsNameEditing(true)}>
                {task.name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNameEditing(true)}
                className={cn(
                  'text-muted-foreground hover:text-foreground shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                )}
              >
                <Pen className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center">
            {isDescEditing ? (
              <Textarea
                defaultValue={task.description}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  handleDescriptionChange(task._id, (e.target as HTMLTextAreaElement).value)
                }
                autoFocus
                className="w-full sm:w-40"
              />
            ) : (
              <>
                {task.description ? (
                  <p
                    className="text-muted-foreground text-sm"
                    onTouchEnd={() => setIsDescEditing(true)}
                  >
                    {task.description}
                  </p>
                ) : (
                  <p
                    className="text-muted-foreground text-sm"
                    onTouchEnd={() => setIsDescEditing(true)}
                  >
                    No description
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDescEditing(true)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                  )}
                >
                  <Pen className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center gap-3 sm:w-auto">
        <div className="flex w-full flex-col items-end gap-2 sm:w-auto">
          <Select
            value={task.priority}
            onValueChange={(value: Priority) => handlePriorityChange(task._id, value)}
          >
            <SelectGroup className="flex w-full items-center justify-between">
              <SelectLabel className="text-sm">Priority:</SelectLabel>
              <SelectTrigger className="w-full sm:w-[145px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                    Low
                  </div>
                </SelectItem>
                <SelectItem value="Medium">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="High">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                    High
                  </div>
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <Select
            value={task.status}
            onValueChange={(value: Status) => handleStatusChange(task._id, value)}
          >
            <SelectGroup className="flex w-full items-center justify-between">
              <SelectLabel className="text-sm">Status:</SelectLabel>
              <SelectTrigger className="w-full sm:w-[145px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                    Low
                  </div>
                </SelectItem>
                <SelectItem value="Medium">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="High">
                  <div className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                    High
                  </div>
                </SelectItem>
                <SelectContent>
                  <SelectItem value="Todo">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
                      Todo
                    </div>
                  </SelectItem>
                  <SelectItem value="In Progress">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="Done">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      Done
                    </div>
                  </SelectItem>
                  <SelectItem value="Cancelled">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                      Cancelled
                    </div>
                  </SelectItem>
                </SelectContent>
              </SelectContent>
            </SelectGroup>
          </Select>
        </div>
        <Button variant="destructive" size="icon" onClick={() => handleDelete(task._id)}>
          <Trash2 />
        </Button>
      </div>
    </motion.div>
  );
}
