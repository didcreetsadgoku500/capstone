"use client"

import { ITournament } from "@/app/api/queries/getTournaments"
import { Button } from "./ui/button"
import { register } from "@/app/api/queries/register"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { unregister } from "@/app/api/queries/unregister"



// Button for registering for a tournament


export default function RegisterButton({details, isDefaultRegistered}: {details: ITournament, isDefaultRegistered: boolean}) {
    const [isRegistered, setRegistered] = useState(isDefaultRegistered || false)
    const [isLoading, setLoading] = useState(false)
    const {toast} = useToast()

    const buttonText = isLoading ? <Loader2 className="animate-spin w-4 h-4"/> : isRegistered ? "Withdraw" : "Register"

    return <Button 
        className="py-1 px-2 text-xs font-medium min-w-16" 
        variant={isRegistered ? "destructive" : "default"} 
        size={null} 
        disabled={isLoading}
        onClick={async (e) => {
            e.preventDefault(); 
            setLoading(true)

            if (isRegistered) {
                const res = await unregister(details.tournamentId)
                if (res.error) {
                    toast({
                        title: "Error",
                        description: res.error,
                        variant: "destructive"
                    })
                }

                else {
                    setRegistered(false)
                }
            }
            else {
                const res = await register(details.tournamentId)
                if (res.error) {
                    toast({
                        title: "Error",
                        description: res.error,
                        variant: "destructive"
                    })
                }

                else {
                    setRegistered(true)
                }
            }

            setLoading(false)
    
        }
    }>
        {buttonText}
    </Button>
}
