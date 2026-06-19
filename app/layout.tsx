import AuthProvider from "@/components/AuthProvider";
import type { ReactNode } from "react";
import "@/assets/css/main.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
