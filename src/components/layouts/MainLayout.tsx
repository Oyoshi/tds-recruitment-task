interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
