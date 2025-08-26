// src/app/keystatic/layout.tsx
import { type Metadata } from 'next'
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: 'Keystatic CMS',
  description: 'Content Management System',
}

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <KeystaticApp />;
}
