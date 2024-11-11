export function Unauthenticated() {
    return <div className="mx-auto">You are not signed in</div>
  }


export function Unauthorized({tournamentId}: {tournamentId: string}) {
    return (<div className="mx-auto">Missing required permissions for tournament ID {tournamentId}. </div>)  }    