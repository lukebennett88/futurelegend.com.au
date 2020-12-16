import { Nav } from "@components/nav";
import { Footer } from "@components/footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />
      <main className="flex-1 bg-gray-100">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
