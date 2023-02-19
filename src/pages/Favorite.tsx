import React from 'react'
import { useAppSelector } from '../hooks/redux'

export default function Favorite() {
  const { favourites } = useAppSelector(state => state.github)

  if (favourites.length === 0)
    <p className="text-center">No favourites repos</p>

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map(f => (
          <li className="text-center text-blue-400" key={f}>
            <a href={f} target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
