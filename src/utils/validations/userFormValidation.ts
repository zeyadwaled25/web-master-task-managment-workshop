import { z } from "zod";


// Enhanced Zod schema for validating signup form data
export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
  });
  
  export type LoginFormData = z.infer<typeof loginSchema>;
