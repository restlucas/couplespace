import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] animate-fade-right h-auto p-8 rounded-md bg-foreground-light shadow-md">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
