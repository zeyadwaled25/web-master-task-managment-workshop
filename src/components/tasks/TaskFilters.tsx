import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  setSearchQuery,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortDirection,
  type SortOption,
} from "@/store/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Priority, Status } from "@/types/Task";

export function TaskFilters() {
  const dispatch = useAppDispatch();
  const { searchQuery, statusFilter, priorityFilter, sortBy, sortDirection } =
    useAppSelector((state) => state.tasks);

  // Handlers
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePriorityChange = (value: Priority) => {
    dispatch(setPriorityFilter(value));
  };

  const handleStatusChange = (value: Status) => {
    dispatch(setStatusFilter(value));
  };

  const handleSortByChange = (value: SortOption) => {
    dispatch(setSortBy(value));
  };

  const handleSortDirectionChange = () => {
    dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex flex-col justify-between sm:flex-row flex-wrap gap-4 mb-6 items-center">
      {/* Search */}
      <div className="flex flex-col w-full lg:w-2/5 md:w-auto">
        <label className="text-sm font-medium text-muted-foreground px-2 py-1.5">
          Search:
        </label>
        <Input
          placeholder="Search tasks..."
          defaultValue={searchQuery}
          onChange={handleSearchQueryChange}
          className="py-2 w-full"
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-col w-full sm:flex-1">
        <Select
          defaultValue={statusFilter}
          onValueChange={(value) => handleStatusChange(value as Status)}
        >
          <SelectGroup>
            <SelectLabel className="text-sm font-medium">Status:</SelectLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col w-full sm:flex-1">
        <Select
          defaultValue={priorityFilter}
          onValueChange={(value) => handlePriorityChange(value as Priority)}
        >
          <SelectGroup>
            <SelectLabel className="text-sm font-medium">Priority:</SelectLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {/* Sort By */}
      <div className="flex flex-col w-full sm:flex-1">
        <Select
          defaultValue={sortBy}
          onValueChange={(value) => handleSortByChange(value as SortOption)}
        >
          <SelectGroup>
            <SelectLabel className="text-sm font-medium">Sort by:</SelectLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {/* Sort Direction */}
      <div className="flex flex-col w-full sm:flex-1">
        <label className="text-sm font-medium text-muted-foreground px-2 py-1.5">
          Sort Direction:
        </label>
        <Button
          variant="outline"
          onClick={handleSortDirectionChange}
          className="flex justify-between"
        >
          {sortDirection === "asc" ? "Ascending" : "Descending"}
          {sortDirection === "asc" ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
    </div>
  );
}
