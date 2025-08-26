"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading reset form...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
