"use client";

import { toast } from "sonner";

export function toastSuccess(message: string, description?: string) {
  return toast.success(message, { description });
}

export function toastError(message: string, description?: string) {
  return toast.error(message, { description });
}

export function toastInfo(message: string, description?: string) {
  return toast.info(message, { description });
}

export function toastWarning(message: string, description?: string) {
  return toast.warning(message, { description });
}
