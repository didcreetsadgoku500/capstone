import { Loader2 } from "lucide-react";

export default function Loading() {
    return (<div className="mx-auto">
        <div className="animate-spin">
        <Loader2/>
        </div>
        </div>)
}