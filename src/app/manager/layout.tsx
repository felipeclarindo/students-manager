import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students Manager | Manager",
  description: "Web Application for managing students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
