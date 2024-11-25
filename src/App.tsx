import { useState } from 'react'
import { useFetchData } from '../src/hooks/useFetchData'
import { UsersList } from './components/UsersList'

const App = () => {
  const { data, error, loading } = useFetchData(
    'https://randomuser.me/api/?results=100'
  )

  const [showTableColors, setShowTableColors] = useState(false)

  const toggleColors = () => {
    setShowTableColors(!showTableColors)
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
          </div>
        </header>
        <section>
          <UsersList users={data} showTableColors={showTableColors} />
        </section>
      </main>
    </>
  )
}

export default App
