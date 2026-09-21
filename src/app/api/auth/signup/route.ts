import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role = "SEEKER", phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // Validate allowed roles
    const validRoles = ["SEEKER", "OWNER", "AGENT"];
    const assignedRole = validRoles.includes(role) ? role : "SEEKER";

    // Hash password
    const passwordHash = hashPassword(password);

    // Create user in Supabase database
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: assignedRole,
        phone: phone ? phone.trim() : null,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        actorName: user.name,
        action: "USER_SIGNUP",
        entityType: "User",
        entityId: user.id,
        metadata: JSON.stringify({ role: user.role }),
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set authentication cookies
    response.cookies.set("haven_user_id", user.id, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.set("haven_role", user.role, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: false,
      sameSite: "lax",
    });

    response.cookies.delete("haven_logged_out");

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
