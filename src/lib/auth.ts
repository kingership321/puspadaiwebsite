import { cookies } from "next/headers";
import { AuthUser, UserRole } from "@/types";

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  SEEKER: {
    id: "user-seeker-1",
    name: "Alex Morgan",
    email: "alex.seeker@havenestate.com",
    role: "SEEKER",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  OWNER: {
    id: "user-owner-1",
    name: "David Sterling",
    email: "david.owner@havenestate.com",
    role: "OWNER",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  AGENT: {
    id: "user-agent-1",
    name: "Elena Rostova",
    email: "elena.agent@havenestate.com",
    role: "AGENT",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  ADMIN: {
    id: "user-admin-1",
    name: "Marcus Vance",
    email: "admin@havenestate.com",
    role: "ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = cookies();
  const roleCookie = cookieStore.get("haven_role")?.value as UserRole | undefined;

  if (roleCookie && DEMO_USERS[roleCookie]) {
    return DEMO_USERS[roleCookie];
  }

  // Default to Seeker for smooth first-time browsing experience
  return DEMO_USERS.SEEKER;
}
