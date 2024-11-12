'use client'

import { useState } from 'react'
import { Separator } from './ui/separator'


export default function Component() {
  const [selectedMode, setSelectedMode] = useState(0)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Gamemode</h2>
      <div className="relative  rounded-full p-1 flex w-fit">
        <div className='relative flex'>

        <div
          className="absolute bg-white rounded-lg transition-all duration-300 ease-in-out shadow-md"
          style={{
            width: `${100 / 4}%`,
            height: 'calc(100% - 4px)',
            top: '2px',
            left: `${(selectedMode * 100) / 4}%`,
          }}
        />
        <button
            className={`flex-1 p-2 rounded-full z-10 transition-colors duration-200 px-5 ${
              selectedMode === 0 ? 'text-gray-800' : 'text-gray-400'
            }`}
            onClick={() => setSelectedMode(0)}
            aria-label={"Standard"}
          >
            <img src="/mode-osu.png" className="w-6 h-6 mx-auto brightness-0" />
          </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>
          <button
            className={`flex-1 p-2 rounded-full z-10 transition-colors duration-200 px-5 ${
              selectedMode === 1 ? 'text-gray-800' : 'text-gray-400'
            }`}
            onClick={() => setSelectedMode(1)}
            aria-label={"Standard"}
          >
            <img src="/mode-taiko.png" className="w-6 h-6 mx-auto brightness-0" />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
            className={`flex-1 p-2 rounded-full z-10 transition-colors duration-200 px-5 ${
              selectedMode === 2 ? 'text-gray-800' : 'text-gray-400'
            }`}
            onClick={() => setSelectedMode(2)}
            aria-label={"Standard"}
          >
            <img src="/mode-fruits.png" className="w-6 h-6 mx-auto brightness-0" />
            </button>

          <Separator className='h-1/2 mt-3' orientation='vertical' decorative/>


          <button
            className={`flex-1 p-2 rounded-full z-10 transition-colors duration-200 px-5 ${
              selectedMode === 3 ? 'text-gray-800' : 'text-gray-400'
            }`}
            onClick={() => setSelectedMode(3)}
            aria-label={"Standard"}
          >
            <img src="/mode-mania.png" className="w-6 h-6 mx-auto brightness-0" />
            </button>

        </div>
      </div>
    </div>
  )
}