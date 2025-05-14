import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import BackToTop from "@/app/components/ui/back-to-top";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <BackToTop />
    </div>
  );
} 