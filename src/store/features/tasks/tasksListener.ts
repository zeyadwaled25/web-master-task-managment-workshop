import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  addNewTask,
  addTask,
  clearDayTasks,
  clearTasks,
  deleteAllTasks,
  deleteMultipleTasks,
  deleteTask,
  deleteTaskById,
  initialize,
  initializeTasks,
  setAllTasks,
  setFilteredTasks,
  updateTask,
  updateTaskData,
} from './tasksSlice';
import type { AppDispatch, RootState } from '@/store/store';
import {
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  deleteAllTasksApi,
  deleteMultipleTasksApi,
} from '@/services/tasks';
import { toast } from 'sonner';
import type Task from '@/types/Task';

// Create listener middleware
const tasksListener = createListenerMiddleware();
const listen = tasksListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for tasks initialization and fetch user tasks
listen({
  actionCreator: initializeTasks,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isInitialized, selectedDay } = getState().tasks;

    if (isInitialized) return;

    const initialTasks = await fetchTasksApi();
    dispatch(setAllTasks(initialTasks));
    dispatch(
      setFilteredTasks(initialTasks.filter((task) => task.date === selectedDay))
    );
    dispatch(initialize());
  },
});

// Listen for delete all tasks
listen({
  actionCreator: clearTasks,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const currentTasks = getState().tasks.tasks;

    try {
      dispatch(deleteAllTasks());
      await deleteAllTasksApi();
    } catch (err) {
      dispatch(setAllTasks(currentTasks));
      console.error(err);
      toast.error('Failed to delete all tasks');
    }
  },
});

// Listen for delete all tasks in a specific day
listen({
  actionCreator: clearDayTasks,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const selectedDay = action.payload;

    const currentTasks = getState().tasks.tasks;
    const tasksToDeleteIds = currentTasks
      .filter((task) => task.date === selectedDay)
      .map((task) => task._id);

    try {
      dispatch(deleteMultipleTasks(tasksToDeleteIds));
      await deleteMultipleTasksApi(tasksToDeleteIds);
    } catch (err) {
      dispatch(setAllTasks(currentTasks));
      console.error(err);
      toast.error('Failed to delete all tasks');
    }
  },
});

// Listen for new task creation
listen({
  actionCreator: addNewTask,

  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    const taskData = action.payload;

    try {
      const taskDataWithNewId = await toast
        .promise(createTaskApi(taskData), {
          loading: 'Creating task...',
        })
        .unwrap();
      dispatch(addTask(taskDataWithNewId));
    } catch (err) {
      dispatch(deleteTask(taskData._id));
      console.error(err);
      toast.error('Task creation failed');
    }
  },
});

// Listen for task updates
listen({
  actionCreator: updateTaskData,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const taskData = action.payload;
    const prevData = getState().tasks.tasks.find((task) => task._id === taskData._id) as Task;

    try {
      dispatch(updateTask(taskData));
      await updateTaskApi(taskData);
    } catch (err) {
      dispatch(updateTask(prevData));
      console.error(err);
      toast.error('Task update failed');
    }
  },
});

// Listen for task deletion
listen({
  actionCreator: deleteTaskById,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const taskId = action.payload;
    const task = getState().tasks.tasks.find((task) => task._id === taskId) as Task;

    try {
      dispatch(deleteTask(taskId));
      await deleteTaskApi(taskId);
    } catch (err) {
      dispatch(addTask(task));
      console.error(err);
      toast.error('Task deletion failed');
    }
  },
});

// Listen for filter changes
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.tasks.selectedDay !== previousState.tasks.selectedDay ||
    currentState.tasks.searchQuery !== previousState.tasks.searchQuery ||
    currentState.tasks.statusFilter !== previousState.tasks.statusFilter ||
    currentState.tasks.priorityFilter !== previousState.tasks.priorityFilter ||
    currentState.tasks.sortBy !== previousState.tasks.sortBy ||
    currentState.tasks.sortDirection !== previousState.tasks.sortDirection ||
    currentState.tasks.tasks !== previousState.tasks.tasks,

  effect: (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const {
      isInitialized,
      tasks,
      selectedDay,
      searchQuery,
      statusFilter,
      priorityFilter,
      sortBy,
      sortDirection,
    } = getState().tasks;

    if (!isInitialized) return;

    let filteredTasks = [...tasks];

    // Date Filter
    filteredTasks = filteredTasks.filter((task) => task.date === selectedDay);

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.name.toLowerCase().includes(query) || task.description?.toLowerCase().includes(query)
      );
    }

    // Completion Filter
    if (statusFilter !== 'all') {
      filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
    }

    // // Priority Filter
    if (priorityFilter !== 'all') {
      filteredTasks = filteredTasks.filter((task) => task.priority === priorityFilter);
    }

    // Sorting
    filteredTasks.sort((a, b) => {
      const isAsc = sortDirection === 'asc';

      if (sortBy === 'name') {
        return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }

      if (sortBy === 'priority') {
        const order = { High: 3, Medium: 2, Low: 1 };
        return isAsc
          ? order[a.priority] - order[b.priority]
          : order[b.priority] - order[a.priority];
      }

      return 0;
    });

    // Dispatch to update tasks
    dispatch(setFilteredTasks(filteredTasks));
  },
});

export default tasksListener;
