import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    // Clear the admin session cookie
    const response = NextResponse.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}