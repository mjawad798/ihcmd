import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyIfExists(source, destination) {
  if (!(await pathExists(source))) {
    console.warn(`[prepare-cpanel] Skipping missing path: ${source}`);
    return;
  }

  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.cp(source, destination, { recursive: true, force: true });
  console.log(`[prepare-cpanel] Copied ${source} -> ${destination}`);
}

async function run() {
  const standaloneRoot = path.join(".next", "standalone");

  // Next.js standalone server does not include these automatically.
  await copyIfExists("public", path.join(standaloneRoot, "public"));
  await copyIfExists(path.join(".next", "static"), path.join(standaloneRoot, ".next", "static"));

  // The standalone server loads its own env files relative to server.js —
  // it does NOT inherit the project root's .env. Without this, UPLOAD_DIR,
  // PUBLIC_MEDIA_URL, DB_* etc. are all undefined at runtime and silently
  // fall back to wrong defaults (broken uploaded images, DB using defaults).
  await copyIfExists("cpanel.env.production", path.join(standaloneRoot, ".env.production"));

  // Install external packages directly in the standalone build folder locally
  console.log("[prepare-cpanel] Installing external packages (mysql2, sequelize) into the standalone folder...");
  try {
    execSync("yarn add mysql2 sequelize", { cwd: standaloneRoot, stdio: "inherit" });
    console.log("[prepare-cpanel] External packages installed successfully.");
  } catch (error) {
    console.warn("[prepare-cpanel] Failed to install external packages. You might need to install them manually in the standalone folder.", error.message);
  }

  console.log("[prepare-cpanel] cPanel standalone package is ready.");
}

run().catch((error) => {
  console.error("[prepare-cpanel] Failed:", error);
  process.exitCode = 1;
});
