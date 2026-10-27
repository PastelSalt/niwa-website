import { writeFile } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const config = {
    test: {
      matchTextMedia: { "(prefers-color-scheme: dark)": false },
    },
  };

  await writeFile(join(process.cwd(), "playwright.config.ts"), `
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
    { name: "firefox", use: devices["Desktop Firefox"] },
    { name: "webkit", use: devices["Desktop Safari"] },
  ],
  webServer: {
    command: "pnpm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
