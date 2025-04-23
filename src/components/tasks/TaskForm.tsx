import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority, Status } from "@/types/Task";
import {
  priorities,
  statuses,
  TaskFormData,
} from "@/utils/validations/taskFormValidation";
import useTaskForm from "@/hooks/tasks/useTaskForm";

export default function TaskForm({ closeModal }: { closeModal: () => void }) {
  const { form, submitTask } = useTaskForm(closeModal);

  const handleFormSubmit = async (data: TaskFormData) => {
    submitTask(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      {/* Task Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Name</label>
        <Input placeholder="Enter task name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          placeholder="Optional description..."
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      {/* Priority and Status Dropdowns */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Priority:</label>
          <Select
            value={form.watch("priority")}
            onValueChange={(value: Priority) =>
              form.setValue("priority", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((p) => (
                <SelectItem key={p} value={p}>
                  <div className="flex items-center">
                    {p === "Low" && (
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    )}
                    {p === "Medium" && (
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                    )}
                    {p === "High" && (
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                    )}
                    {p}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.priority && (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.priority.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Status:</label>
          <Select
            value={form.watch("status")}
            onValueChange={(value: Status) => form.setValue("status", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.status && (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.status.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  );
}
