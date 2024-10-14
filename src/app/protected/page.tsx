import { auth } from "@/lib/auth";
import { verifyRole } from "@/lib/permissions";

export default async function MyPage() {
    const session = await auth();
    if (!session || !session.user.id) {
        return (<div>You are not authenticated!</div>)
    }


    const permission = await verifyRole(session.user.id, "admin", "global")
    if (!permission) {
        return (<div>Missing required permission admin. {JSON.stringify(session)}</div>)
    }

    return <div>Access granted!</div>


}