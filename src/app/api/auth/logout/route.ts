import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Delete session cookies
  response.cookies.delete("haven_user_id");
  response.cookies.delete("haven_role");

  // Set explicit logged-out marker
  response.cookies.set("haven_logged_out", "true", {
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}
