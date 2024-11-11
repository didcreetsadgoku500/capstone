import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-screen-xl w-full">
            <Card className="max-w-screen-xl grid grid-cols-4">
                <div className="col-span-1">

                    <CardHeader>
                        <CardTitle>Navigate</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </div>
                <div className="col-span-3">

                    <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </div>

            </Card></div>)
}