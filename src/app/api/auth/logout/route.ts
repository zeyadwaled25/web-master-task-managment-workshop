import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "User signed out" },
      { status: 200 }
    );

    // Delete the token cookie
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Sign-out error:", error);
    return NextResponse.json({ message: "Error signing out" }, { status: 500 });
  }
}
