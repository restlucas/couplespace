export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] animate-fade-right bg-gradient-to-r from-violet-500 to-blue-500 p-1 rounded-md">
        <div className="h-auto p-8 rounded-md bg-foreground-light shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
