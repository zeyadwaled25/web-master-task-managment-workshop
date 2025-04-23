import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaskFormData, taskSchema } from "@/utils/validations/taskFormValidation";
import { addNewTask } from "@/store/features/tasks/tasksSlice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type Task from "@/types/Task";
import { useAuthContext } from "@/context/AuthContext";
import { nanoid } from "@reduxjs/toolkit";

export default function useTaskForm(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const { selectedDay } = useAppSelector((state) => state.tasks);
  const { user } = useAuthContext();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "Low",
      status: "Todo",
    },
  });

  const submitTask = async (data: TaskFormData) => {
    if (!user?.userId) {
      toast.warning("Please make sure you are logged in to create a task");
      return;
    }

    const newTask: Task = {
      _id: nanoid(),
      name: data.name,
      description: data.description,
      priority: data.priority,
      status: data.status,
      date: selectedDay,
      userId: user.userId ?? "",
    };

    dispatch(addNewTask(newTask));

    form.reset();
    closeModal();
  };

  return { form, submitTask };
}
