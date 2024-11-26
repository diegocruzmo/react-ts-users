import { useState, useMemo } from 'react'
import { useFetchData } from '../src/hooks/useFetchData'
import { UsersList } from './components/UsersList'
import { User } from './types'

const App = () => {
  const { data, error, loading, updateData, originalArray } = useFetchData(
    'https://randomuser.me/api/?results=100'
  )

  const [showTableColors, setShowTableColors] = useState(false)
  const [orderByCountry, setOrderByCountry] = useState(false)
  const [search, setSearch] = useState<string | null>(null)

  const toggleColors = () => {
    setShowTableColors(!showTableColors)
  }

  const toggleOrderByCountry = () => {
    setOrderByCountry((previous) => !previous)
  }

  const filteredUsers = useMemo(() => {
    return typeof search === 'string' && search.length > 0
      ? data.filter((user) =>
          user.location.country.toLowerCase().includes(search.toLowerCase())
        )
      : data
  }, [data, search])

  const usersOrdered = useMemo(() => {
    return orderByCountry
      ? [...filteredUsers].sort((a: User, b: User) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, orderByCountry])

  const deleteUser = (user: User) => {
    const newArray = data.filter(
      (currentUser) => user.email !== currentUser.email
    )
    updateData(newArray)
  }

  const restoreArray = () => {
    updateData(originalArray.current)
  }

  const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <main className='container'>
        <header>
          <h1 className='title is-1 custom-h1 has-text-centered'>
            User's List
          </h1>
          <div className='has-text-centered'>
            <button className='button is-centered' onClick={toggleColors}>
              Color Rows
            </button>
            <button
              onClick={toggleOrderByCountry}
              className='button is-centered'
            >
              {orderByCountry ? 'Reset' : 'Oder By Country'}
            </button>
            <button className='button is-centered' onClick={restoreArray}>
              Restore
            </button>
          </div>
          <div className='has-text-centered m-3 '>
            <input
              onChange={searchCountry}
              placeholder='Search by Country...'
              className='input custom-input'
              type='text'
            />
          </div>
        </header>
        <section>
          <UsersList
            users={usersOrdered}
            showTableColors={showTableColors}
            deleteUser={deleteUser}
          />
        </section>
      </main>
    </>
  )
}

export default App
