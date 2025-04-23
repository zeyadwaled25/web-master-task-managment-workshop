'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import EmptyList from '@/components/tasks/EmptyList';
import Task from '@/components/tasks/Task';
import TopCards from '@/components/tasks/TopCards';
import TitleAndActions from '@/components/tasks/TitleAndActions';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import LoadingList from '@/components/tasks/LoadingList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeTasks, reset } from '@/store/features/tasks/tasksSlice';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import TaskClearControls from '@/components/tasks/TaskClearControls';
import { Separator } from '@/components/ui/separator';

export default function TaskList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();
  const { isInitialized, filteredTasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      dispatch(initializeTasks());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, router, user]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto w-full rounded-xl border p-4 shadow">
        <TopCards />
        <Separator className="my-4" />
        <TitleAndActions />
        <TaskFilters />

        <ScrollArea className="relative mb-6 space-y-4 sm:max-h-[360px]">
          <div className="relative sm:min-h-[360px]">
            <AnimatePresence mode="popLayout">
              {!isInitialized ? (
                <LoadingList />
              ) : filteredTasks.length === 0 ? (
                <EmptyList />
              ) : (
                <div className="flex h-full w-full flex-col gap-2 sm:absolute sm:min-h-[360px]">
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.map((task, idx) => (
                      <Task key={task._id} idx={idx} task={task} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <TaskClearControls />
      </div>
    </div>
  );
}
