import { Label } from "@/components/ui/label";

export default async function Page({ params }: { params: { tournamentId: string } }) {
    
    return (

        <div className="space-y-2">
           <Label>Tournament Name</Label>
           </div>
    )

}