import { User } from '../types'

interface Props {
  users: User[]
  showTableColors: boolean
  deleteUser: (user: User) => void
}

export const UsersList: React.FC<Props> = ({
  users,
  showTableColors,
  deleteUser
}) => {
  return (
    <div className='columns is-centered'>
      <div className='column is-four-fifths'>
        <table className='table is-fullwidth'>
          <thead>
            <tr>
              <th>Photo</th>
              <th>First Name </th>
              <th>Last Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const backgroundColor =
                index % 2 === 0 ? '	#555555' : 'transparent'

              const color = showTableColors ? backgroundColor : 'transparent'

              return (
                <tr key={user.email} style={{ background: color }}>
                  <td>
                    <img
                      className='image-table'
                      src={user.picture.thumbnail}
                      alt={user.name.first}
                    />
                  </td>
                  <td>{user.name.first} </td>
                  <td>{user.name.last} </td>
                  <td>{user.location.country} </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user)}
                      className='button is-small is-danger'
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
