// src/app/keystatic/layout.tsx
import KeystaticApp from "./keystatic";

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
