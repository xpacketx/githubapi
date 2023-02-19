import { useEffect, useRef, useState } from 'react'
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery
} from '../store/github/github.api'
import useDebounce from '../hooks/debounce'
import Loader from '../components/ui/Loader'
import { RepoCard } from '../components/RepoCard'

export default function Home() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const { isLoading, isError, data } = useSearchUsersQuery(
    debounced,
    {
      skip: debounced.length < 3,
      refetchOnFocus: true
    }
  )

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery({})

  function clickHandler(username: string) {
    fetchRepos(username)
    setSearch('')
  }

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length !== 0)
  }, [debounced, data])

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">
          Something went wrong...
        </p>
      )}

      <div className="relative w-[560px]">
        <input
          onChange={e => setSearch(e.target.value)}
          value={search}
          type="text"
          className="border py-2 px-4 w-full mb-2 h-[42px]"
          placeholder="Search for a Github User..."
        />

        <div className="absolute mt-25 top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
          {dropdown ? (
            <ul className="list-none">
              {isLoading && <Loader />}
              {data?.map(user => (
                <li
                  onClick={() => clickHandler(user.login)}
                  key={user.id}
                  className="py-2 px-4 hover:bg-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                  {user.login}
                </li>
              ))}
            </ul>
          ) : (
            <div className="container">
              {areReposLoading && <Loader />}
              {repos?.map(repo => (
                <RepoCard repo={repo} key={repo.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
