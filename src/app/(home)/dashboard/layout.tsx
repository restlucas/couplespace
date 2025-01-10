export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] animate-fade-right h-auto p-8 rounded-md bg-foreground-light shadow-md">
        {children}
      </div>
    </div>
  );
}
