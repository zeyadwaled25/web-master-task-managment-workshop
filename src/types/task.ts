export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'In Progress' | 'Done' | 'Cancelled';

export default interface Task {
  _id: string;
  name: string;
  description?: string;
  priority: Priority;
  status: Status;
  date: string;
  userId: string;
}
