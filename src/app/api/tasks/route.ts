import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDb";
import Task from "@/lib/models/Task";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    await connectDB();

    const tasks = await Task.find({ userId: decoded.userId });

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { taskIds } = await req.json();
    
    await connectDB();

    if (Array.isArray(taskIds) && taskIds.length > 0) {
      const deleteResult = await Task.deleteMany({ _id: { $in: taskIds } });

      return NextResponse.json({
        status: 200,
        success: true,
        message: `${deleteResult.deletedCount} task(s) deleted successfully`,
      });
    }

    const deleteAllResult = await Task.deleteMany({});
    return NextResponse.json({
      status: 200,
      success: true,
      message: `${deleteAllResult.deletedCount} task(s) deleted (all)`,
    });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
