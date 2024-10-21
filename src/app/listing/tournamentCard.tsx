import { h2Styles, largeStyles, pStyles, smallStyles } from "@/components/textStyles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const tempSrc = "https://raw.githubusercontent.com/didcreetsadgoku500/tournament.sh/refs/heads/main/src/assets/strafeSmoke.jpg?token=GHSAT0AAAAAACX7YTQR7HVEF55W3IWL4Q2UZYWUQEA"

export default function TournamentCard({ src = tempSrc, title = "Tournament Title", blurb = "This is a long blurb that will be truncated with an ellipsis if it exceeds the available space in thethat will be truncated with an ellipsis if it exceeds the available space in thethat will be truncated with an ellipsis if it exceeds the available space in thethat will be truncated with an ellipsis if it exceeds the available space in thethat will be truncated with an ellipsis if it exceeds the available space in thethat will be truncated with an ellipsis if it exceeds the available space in the card." }) {
    return (
      <div className="border rounded-lg p-3 flex flex-col w-[300px] h-60 hover:shadow-md">
        <img className="w-full h-20 object-cover rounded-lg" src={src} alt="Tournament Banner" />
        <div className="flex flex-col flex-grow overflow-hidden mt-2">
          <h3 className="text-md font-medium">{title}</h3>
          <p className="text-xs font-regular text-primary/75 line-clamp-3">{blurb}</p>
        </div>
        <div className="flex justify-end mt-2">
          <Button size="sm">Register</Button>
        </div>
      </div>
    )
  }