export function Unauthenticated() {
    return <div className="mx-auto">You are not signed in.</div>
  }


export function Unauthorized({tournamentId}: {tournamentId: string}) {
    return (<div className="mx-auto">Missing required permissions for tournament ID {tournamentId}. </div>)  }    

export function OtherError() {
  return <div className="mx-auto">An unexpected error occurred.</div>

}