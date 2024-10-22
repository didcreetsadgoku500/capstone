import { Button } from "@/components/ui/button";



interface TournamentCardProps {
  title: string,
  description: string,
  bannerSrc: string,
  tournamentId: number,
  action: "register" | "unregister"
}

export default function TournamentCard({ bannerSrc, title, description, action = "register"}: TournamentCardProps) {
    return (
      <div className="border rounded-lg p-3 flex flex-col w-[300px] h-60 hover:shadow-md">
        <img className="w-full h-20 object-cover rounded-lg" src={bannerSrc} alt="Tournament Banner" />
        <div className="flex flex-col flex-grow overflow-hidden mt-2">
          <h3 className="text-md font-medium">{title}</h3>
          <p className="text-xs font-regular text-primary/75 line-clamp-3">{description}</p>
        </div>
        <div className="flex justify-end mt-2">
          <Button size="sm">Register</Button>
        </div>
      </div>
    )
  }