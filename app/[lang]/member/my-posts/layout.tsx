import { SelectedBookProvider } from "@/app/_components/features/posts/create-post-form/book.context";
import { SidebarProvider } from "@/app/_components/ui/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SelectedBookProvider>{children}</SelectedBookProvider>;
}
