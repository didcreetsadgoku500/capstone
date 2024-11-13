'use client'

import { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { Gamemode } from '@prisma/client'


const gamemodes = [Gamemode.STANDARD, Gamemode.TAIKO, Gamemode.CTB, Gamemode.MANIA]

export default function GamemodeSelect({gamemode, onGamemodeChange}: {gamemode?: Gamemode, onGamemodeChange?: (Gamemode: Gamemode) => void}) {
  const [selectedMode, setSelectedMode] = useState(gamemode || Gamemode.STANDARD)

  if (onGamemodeChange) {

      useEffect(() => {
          onGamemodeChange(selectedMode)
        }, [selectedMode])
    }

  return (
      <div className="relative  rounded-full p-1 flex w-fit">
        <div className='relative flex'>

        <div
          className="absolute bg-white border rounded-lg transition-all duration-300 ease-in-out shadow-md"
          style={{
            width: `${100 / 4}%`,
            height: '100%',
            left: `${(gamemodes.indexOf(selectedMode) * 100) / 4}%`,
          }}
        />
        <button
          type='button'
            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === Gamemode.STANDARD ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5' 
            }`}
            onClick={() => setSelectedMode(Gamemode.STANDARD)}
            aria-label={"Standard"}
          >
            <img src="/mode-osu.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === Gamemode.STANDARD ? 'brightness-0' : 'brightness-[0.25]'}`} />
          </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>
          <button
                    type='button'

            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === Gamemode.TAIKO ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5' 
            }`}
            onClick={() => setSelectedMode(Gamemode.TAIKO)}
            aria-label={"Standard"}
          >
            <img src="/mode-taiko.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === Gamemode.TAIKO ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
                    type='button'

            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === Gamemode.CTB ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5'
            }`}
            onClick={() => setSelectedMode(Gamemode.CTB)}
            aria-label={"Standard"}
          >
            <img src="/mode-fruits.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === Gamemode.CTB ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
                    type='button'

            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === Gamemode.MANIA ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5'
            }`}
            onClick={() => setSelectedMode(Gamemode.MANIA)}
            aria-label={"Standard"}
          >
            <img src="/mode-mania.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === Gamemode.MANIA ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

        </div>
      </div>
  )
}