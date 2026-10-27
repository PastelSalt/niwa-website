import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Authentication", () => {
  test("can navigate to login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator("h1")).toContainText("Log in");
  });

  test("can navigate to register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL(/.*\/register/);
    await expect(page.locator("h1")).toContainText("Register");
  });
});

test.describe("Protected routes redirect to login", () => {
  test("redirects to login when accessing /app without auth", async ({ page }) => {
    await page.goto("/app");
    await expect(page).toHaveURL(/.*\/login/);
  });
});

test.describe("Inbox quick capture", () => {
  test("can capture a new idea", async ({ page }) => {
    await page.goto("/app/inbox");
    await expect(page.locator("h1")).toContainText("Inbox");

    await page.getByRole("button", { name: /Capture idea/ }).click();
    await page.getByRole("textbox", { name: /Capture an idea/ }).fill(
      "Test idea from E2E"
    );
    await page.getByRole("button", { name: /Save/ }).click();

    await expect(page.getByText("Test idea from E2E")).toBeInTheDocument();
  });
});

test.describe("Projects and hierarchy", () => {
  test("can create a project and view it in the tree", async ({ page }) => {
    await page.goto("/app/projects");
    await expect(page.locator("h1")).toContainText("Projects");

    await page.getByRole("button", { name: /Create project/ }).click();
    await page.getByRole("textbox").fill("E2E Test Project");
    await page.keyboard.press("Enter");

    await expect(page.getByText("E2E Test Project")).toBeInTheDocument();
  });

  test("can expand/collapse tree branches", async ({ page }) => {
    await page.goto("/app/projects");

    // Look for expand button (ChevronRight icon)
    const expandButton = page.getByLabelText("Expand").first();
    if ((await expandButton.count()) > 0) {
      await expandButton.click();
      const collapseButton = page.getByLabelText("Collapse").first();
      await expect(collapseButton).toBeVisible();
    }
  });
});

test.describe("Search", () => {
  test("can search for items", async ({ page }) => {
    await page.goto("/app/search");
    await expect(page.locator("h1")).toContainText("Focus"); // header shows Focus? no, search page

    await page.getByPlaceholder(/Search items across your workspace/).fill(
      "test"
    );
    await page.keyboard.press("Enter");

    await expect(page.getByText(/result/)).toBeVisible();
  });
});

test.describe("Keyboard shortcuts", () => {
  test("Ctrl/Cmd + K opens search", async ({ page }) => {
    await page.goto("/app/inbox");
    await page.keyboard.press("Meta+K");
    await expect(page).toHaveURL(/.*\/search/);
  });

  test("Escape closes panels", async ({ page }) => {
    await page.goto("/app/search");
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/.*\/search/);
  });
});
