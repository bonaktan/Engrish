import "@/app/globals.css";

export const metadata = {
    title: "Engrish",
    description: "English: the Right Way",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
