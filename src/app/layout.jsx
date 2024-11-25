import "@/app/globals.css"

export default function Root({children}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}