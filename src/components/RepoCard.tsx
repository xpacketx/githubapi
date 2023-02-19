import { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

export function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector(state => state.github)

  const [isInFav, setIsInFav] = useState(
    favourites.includes(repo.html_url)
  )

  const addToFavourite = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    addFavourite(repo.html_url)
    setIsInFav(prev => !prev)
  }

  const removeFromFavourite = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    setIsInFav(prev => !prev)
  }

  return (
    <div className="border py-2 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h3 className="text-lg font-bold">{repo.full_name}</h3>
      </a>
      <p className="text-sm">
        Forks: <span className="font-bold mr-2">{repo.forks}</span>
        Watchers: <span className="font-bold">{repo.watchers}</span>
      </p>
      <p className="text-sm font-thin">{repo?.description}</p>
      {!isInFav ? (
        <button
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all text-sm"
          onClick={addToFavourite}
        >
          Add
        </button>
      ) : (
        <button
          className="py-2 px-4 bg-green-400 rounded hover:shadow-md transition-all text-sm"
          onClick={removeFromFavourite}
        >
          Remove
        </button>
      )}
    </div>
  )
}
