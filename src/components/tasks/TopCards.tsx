import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TopCards() {
  const { tasks, selectedDay } = useAppSelector((state) => state.tasks);
  const [scope, setScope] = useState<"all" | "day">("all");

  const dateLabel = format(new Date(selectedDay), "MMM dd, yyyy");

  const scopedTasks =
    scope === "day" ? tasks.filter((task) => task.date === selectedDay) : tasks;

  const completed = scopedTasks.filter((task) => task.status === "Done").length;
  const pending = scopedTasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const total = scopedTasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      {/* Section Title and Toggle Container */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start mb-4">
        <h2 className="text-xl font-semibold text-muted-foreground">
          Stats Overview:
        </h2>

        {/* Desktop Toggle */}
        <div className="hidden sm:flex gap-2">
          <Button
            variant={scope === "all" ? "outline" : "secondary"}
            onClick={() => setScope("all")}
            className="w-full sm:w-auto"
            aria-pressed={scope === "all"}
          >
            <span className="text-sm">All Tasks</span>
          </Button>
          <Button
            variant={scope === "day" ? "outline" : "secondary"}
            onClick={() => setScope("day")}
            className="w-full sm:w-auto"
            aria-pressed={scope === "day"}
          >
            <span className="text-sm">Tasks for {dateLabel}</span>
          </Button>
        </div>

        {/* Mobile Dropdown */}
        <div className="w-full sm:hidden">
          <Select
            value={scope}
            onValueChange={(val) => setScope(val as "all" | "day")}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="day">Tasks for {dateLabel}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Completed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">
              {scope === "all"
                ? "Completed (All Tasks)"
                : `Completed (Tasks for ${dateLabel})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={completed} /> Tasks
            </p>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">
              {scope === "all"
                ? "Pending (All Tasks)"
                : `Pending (Tasks for ${dateLabel})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={pending} /> Tasks
            </p>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">
              {scope === "all"
                ? "Progress (All Tasks)"
                : `Progress (Tasks for ${dateLabel})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              <AnimatedCounter value={progress} /> %
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
