"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tournament } from "@prisma/client"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import updateTournament from "@/app/api/queries/updateTournament"

const schema = z.object({
  tourName: z.string().min(1, "Tournament name is required").max(50, "Tournament name must be 50 characters or less"),
  tourDesc: z.string(),
  minRank: z.coerce.number().int().optional(),
  maxRank: z.coerce.number().int().optional(),
  usesBWS: z.boolean()
}).refine((data) => {
  if (data.minRank && data.maxRank) {
    return data.minRank < data.maxRank
  }
  return true
}, {
  message: "Maximum rank must be greater than minimum rank",
  path: ["maxRank"]
})

type FormData = z.infer<typeof schema>

export default function DashboardClient({ tournamentDetails }: { tournamentDetails?: Tournament }) {
  const { register, handleSubmit, formState: { errors, dirtyFields, isSubmitting}, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tourName: tournamentDetails?.tourName || "",
      tourDesc: tournamentDetails?.tourDesc || "",
      minRank: tournamentDetails?.minRank || undefined,
      maxRank: tournamentDetails?.maxRank || undefined,
      usesBWS: tournamentDetails?.usesBWS || false
    }
  })

  return (
    <form onSubmit={handleSubmit((formdata) => onSubmitForm(tournamentDetails?.tournamentId, formdata))} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tourName">Tournament Name</Label>
        <Input
          id="tourName"
          {...register('tourName')}
          placeholder="Name of your tournament"
        />
        {errors.tourName && <p className="text-sm text-red-500">{errors.tourName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tourDesc">Description</Label>
        <Textarea
          id="tourDesc"
          {...register('tourDesc')}
          placeholder="Describe your tournament"
        />
        {errors.tourDesc && <p className="text-sm text-red-500">{errors.tourDesc.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Rank Range</Label>
        <div className="flex items-center space-x-2">
          <Input
            {...register('minRank')}
            placeholder="Min"
            type="number"
          />
          <span>-</span>
          <Input
            {...register('maxRank')}
            placeholder="Max"
            type="number"
          />
        </div>
        {errors.minRank && <p className="text-sm text-red-500">{errors.minRank.message}</p>}
        {errors.maxRank && <p className="text-sm text-red-500">{errors.maxRank.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="usesBWS">Use Badge Weighted Seeding</Label>
        <Controller
          control={control}
          name="usesBWS"
          render={({ field }) => (
            <Switch
              id="usesBWS"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button className="transition-all" type="submit" disabled={Object.keys(dirtyFields).length == 0 || isSubmitting}>Save changes</Button>
      </div>
    </form>
  )
}


async function onSubmitForm(tournamentID: bigint | undefined, formdata: FormData) {
    if (tournamentID) {
        await updateTournament(tournamentID, formdata);
        return;
    }

    // TODO: Handle creating a tournament
}