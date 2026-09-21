import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { DEMO_USERS } from "@/lib/auth";
import { UserRole } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, demoRole } = body;

    // Fast demo login path
    if (demoRole && DEMO_USERS[demoRole as UserRole]) {
      const demoUser = DEMO_USERS[demoRole as UserRole];

      // Upsert demo user into DB if not present
      let dbUser = await prisma.user.findUnique({
        where: { email: demoUser.email },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
            avatarUrl: demoUser.avatarUrl,
          },
        });
      }

      const response = NextResponse.json({
        success: true,
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          avatarUrl: dbUser.avatarUrl,
        },
      });

      response.cookies.set("haven_user_id", dbUser.id, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: false,
        sameSite: "lax",
      });

      response.cookies.set("haven_role", dbUser.role, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: false,
        sameSite: "lax",
      });

      response.cookies.delete("haven_logged_out");

      return response;
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address. Please check or sign up." },
        { status: 401 }
      );
    }

    // If user has a passwordHash, verify it
    if (user.passwordHash) {
      const isValid = verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }
    } else {
      // Seed user without passwordHash accepts any password for convenience
    }

    // Set auth cookies
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });

    response.cookies.set("haven_user_id", user.id, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
