import "@/app/globals.css"
import { EngrishProvider } from "./frontend/useEngrish"
export default function Root({children}) {
    return (
        <html>
            <body>
                <EngrishProvider>
                    {children}
                </EngrishProvider>
            </body>
        </html>
    )
}