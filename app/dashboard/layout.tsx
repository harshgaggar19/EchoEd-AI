import { TabProvider } from "@/components/hooks/tab-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabProvider>{children}</TabProvider>
    </>
  );
}
