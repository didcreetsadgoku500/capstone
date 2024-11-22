import { Skeleton } from "./ui/skeleton";

const styleArrays = ["w-3/4 h-4", "w-2/3 h-4", "w-full h-4", "w-1/2 h-4", "w-5/12 h-4", "w-3/5 h-4", "w-6/12 h-4", "w-full h-4", "w-3/4 h-4", "w-2/3 h-4", "w-3/4 h-4"]


export function FallbackSkeleton(lines: number) {
    const skeletons = []
    for (let i = 0; i < lines; i++) {
        skeletons.push(<Skeleton key={i} className={styleArrays[i % styleArrays.length]}/>)
    }

    return (
        <div className="flex flex-col gap-2">
            {skeletons}
            
        </div>
    )
}