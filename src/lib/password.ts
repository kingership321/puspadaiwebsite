import crypto from "crypto";

/**
 * Hash a password using PBKDF2 with SHA-512 and a random salt.
 * Produces format: salt:hash
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;

    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    return crypto.timingSafeEqual(Buffer.from(key, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}
