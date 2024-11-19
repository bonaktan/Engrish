import "@/app/globals.css";
import Footer from "./ui/footer";

export const metadata = {
  title: "Engrish",
  description: "English: the Right Way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overscroll-y-none">{children}</body>
    </html>
  );
}
