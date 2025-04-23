import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type Task from '@/types/Task';
import type { Priority, Status } from '@/types/Task';

export type SortOption = 'name' | 'priority' | 'status';
export type SortDirection = 'asc' | 'desc';

interface InitialState {
  isInitialized: boolean;

  tasks: Task[];
  filteredTasks: Task[];

  selectedDay: string;
  searchQuery: string;
  statusFilter: Status | 'all';
  priorityFilter: Priority | 'all';
  sortBy: SortOption;
  sortDirection: SortDirection;
}

const initialState: InitialState = {
  isInitialized: false,

  tasks: [],
  filteredTasks: [],

  selectedDay: new Date().toISOString().split('T')[0],
  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  sortBy: 'name',
  sortDirection: 'desc',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInitialized = true;
    },

    setFilteredTasks: (state, action: PayloadAction<Task[]>) => {
      state.filteredTasks = action.payload;
    },

    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
    },
    deleteMultipleTasks: (state, action: PayloadAction<Task['_id'][]>) => {
      state.tasks = state.tasks.filter((task) => !action.payload.includes(task._id));
    },

    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<Status | 'all'>) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priorityFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;

      state.tasks = [...state.tasks, newTask];
    },
    updateTask: (state, action: PayloadAction<Partial<Task> & { _id: Task['_id'] }>) => {
      const updatedTask = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return {
            ...task,
            ...updatedTask,
          };
        }
        return task;
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const _id = action.payload;

      state.tasks = state.tasks.filter((task) => task._id !== _id);
    },

    reset: () => initialState,
  },
});

export const initializeTasks = createAction<void>('tasks/initializeTasks');
export const clearTasks = createAction<void>('tasks/clearTasks');
export const clearDayTasks = createAction<string>('tasks/clearDayTasks');
export const addNewTask = createAction<Task>('tasks/addNewTask');
export const updateTaskData = createAction<Partial<Task> & { _id: Task['_id'] }>(
  'tasks/updateTaskData'
);
export const deleteTaskById = createAction<string>('tasks/deleteTaskById');

export const {
  initialize,
  setFilteredTasks,
  setAllTasks,
  deleteAllTasks,
  deleteMultipleTasks,
  setSelectedDay,
  setSearchQuery,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortDirection,
  addTask,
  updateTask,
  deleteTask,
  reset,
} = tasksSlice.actions;
export default tasksSlice.reducer;
