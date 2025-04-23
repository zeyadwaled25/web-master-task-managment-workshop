import { z } from "zod";

// Allowed dropdown values
export const priorities = ["Low", "Medium", "High"] as const;
export const statuses = ["Todo", "In Progress", "Done", "Cancelled"] as const;

// Zod schema for validating task form data
export const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Description must be at least 3 characters",
    }),
  priority: z.enum(priorities, { required_error: "Priority is required" }),
  status: z.enum(statuses, { required_error: "Status is required" }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

