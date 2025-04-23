import type Task from "@/types/Task";

const API_BASE_URL = "/api/tasks";

export async function fetchTasksApi(): Promise<Task[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data.data;
};

export async function deleteAllTasksApi(): Promise<void> {
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error("Failed to delete all tasks");
  }
};

export async function deleteMultipleTasksApi(taskIds: Task["_id"][]): Promise<void> {  
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskIds }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete multiple tasks");
  }
};

export async function createTaskApi(task: Task): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/${task._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  const data = await response.json();
  return data.data;
};

export async function updateTaskApi(task: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/${task._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  const data = await response.json();
  return data.data;
};

export async function deleteTaskApi(taskId: Task["_id"]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
