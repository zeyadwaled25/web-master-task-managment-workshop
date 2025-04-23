import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDb";
import Task from "@/lib/models/Task";
import mongoose from "mongoose";
import type TaskType from "@/types/Task";

type UpdateTaskData = Partial<TaskType>;

export async function POST(req: NextRequest) {
  try {
    const taskData: TaskType = await req.json();

    const { name, description, priority, status, date, userId } = taskData;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (!name || !userId) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Name and userId are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid user ID",
      });
    }

    await connectDB();

    const newTask = new Task({
      name,
      description,
      priority,
      status,
      date,
      userId: new mongoose.Types.ObjectId(userId),
    });

    const savedTask = await newTask.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: TaskType["_id"] }> }
) {
  try {
    const { id } = await params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid task ID",
      });
    }

    const updateData: UpdateTaskData = await req.json();

    await connectDB();

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Task not found",
      });
    }

    // Update only provided fields
    if (updateData.name) task.name = updateData.name;
    if (updateData.description) task.description = updateData.description;
    if (updateData.priority) task.priority = updateData.priority;
    if (updateData.status) task.status = updateData.status;
    if (updateData.userId) {
      if (!mongoose.Types.ObjectId.isValid(updateData.userId)) {
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Invalid user ID",
        });
      }
      task.userId = new mongoose.Types.ObjectId(updateData.userId);
    }

    const updatedTask = await task.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: TaskType["_id"] }> }
) {
  try {
    const { id } = await params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid task ID",
      });
    }

    await connectDB();

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Task not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
