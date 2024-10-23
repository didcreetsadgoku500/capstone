export default function Page({ params }: { params: { tournamentId: string } }) {
    return <div>My Post: {params.tournamentId}</div>
  }