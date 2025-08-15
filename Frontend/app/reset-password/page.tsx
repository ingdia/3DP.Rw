// app/reset-password/page.js

import { Suspense } from "react";
import ResetPasswordForm from "@/app/components/ResetPasswordForm"; // Adjust path if needed

// A fallback component to show while the client component is loading
const Loading = () => {
  return <div>Loading...</div>;
};

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <Suspense fallback={<Loading />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
