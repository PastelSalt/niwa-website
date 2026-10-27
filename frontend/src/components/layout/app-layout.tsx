"use client";

import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { KeyboardShortcuts } from "@/components/feedback/keyboard-shortcuts";

export function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <KeyboardShortcuts
        onOpenSearch={() => {}}
        onCreateItem={() => {}}
        onClosePanel={() => {}}
      />
    </div>
  );
}
