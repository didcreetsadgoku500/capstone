'use client'

import { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { Gamemode } from '@prisma/client'


const gamemodes = [Gamemode.STANDARD, Gamemode.TAIKO, Gamemode.CTB, Gamemode.MANIA]

export default function GamemodeSelect({onGamemodeChange}: {onGamemodeChange?: (Gamemode: Gamemode) => void}) {
  const [selectedMode, setSelectedMode] = useState(0)

  if (onGamemodeChange) {

      useEffect(() => {
          onGamemodeChange(gamemodes[selectedMode])
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
            left: `${(selectedMode * 100) / 4}%`,
          }}
        />
        <button
            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === 0 ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5' 
            }`}
            onClick={() => setSelectedMode(0)}
            aria-label={"Standard"}
          >
            <img src="/mode-osu.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === 0 ? 'brightness-0' : 'brightness-[0.25]'}`} />
          </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>
          <button
            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === 1 ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5' 
            }`}
            onClick={() => setSelectedMode(1)}
            aria-label={"Standard"}
          >
            <img src="/mode-taiko.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === 1 ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === 2 ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5'
            }`}
            onClick={() => setSelectedMode(2)}
            aria-label={"Standard"}
          >
            <img src="/mode-fruits.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === 2 ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
            className={`flex-1 p-2 rounded-lg z-10 transition-colors duration-200 px-5 ${
              selectedMode === 3 ? 'text-gray-800' : 'text-gray-400 hover:bg-primary/5'
            }`}
            onClick={() => setSelectedMode(3)}
            aria-label={"Standard"}
          >
            <img src="/mode-mania.png" className={`aspect-square w-6 h-6 transition-all mx-auto ${selectedMode === 3 ? 'brightness-0' : 'brightness-[0.25]'}`} />
            </button>

        </div>
      </div>
  )
}