import { FallbackSkeleton } from "@/components/textSkeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="max-w-screen-sm w-full items-center justify-center">

        {FallbackSkeleton(10)}
        </div>)
}