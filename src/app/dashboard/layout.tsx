import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students Manager | Dashboard",
  description: "Web Application for managing students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
