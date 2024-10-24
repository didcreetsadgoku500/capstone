import { Button } from "@/components/ui/button";


interface TournamentDetails {
  title: string,
  description: string,
  bannerSrc: string,
  tournamentId: number,
}


interface TournamentCardProps {
  details: TournamentDetails
  action?: "register" | "unregister"
}

export default function TournamentCard({ details, action = "register"}: TournamentCardProps) {
    return (
      <div className="border rounded-lg p-3 flex flex-col w-[300px] h-60 hover:shadow-md bg-card cursor-pointer">
        <img className="w-full h-20 object-cover rounded-lg" src={details.bannerSrc} alt="Tournament Banner" />
        <div className="flex flex-col flex-grow overflow-hidden mt-2">
          <h3 className="text-md font-medium">{details.title}</h3>
          <p className="text-xs font-regular text-primary/75 line-clamp-3">{details.description}</p>
        </div>
        <div className="flex justify-end mt-2">
          <Button className="py-1 px-2 text-xs font-medium" size={null}>Register</Button>
        </div>
      </div>
    )
  }