import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS } from './query/user'
import { CREATE_USER } from './mutation/user'

function App() {
  // const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, { pollInterval: 500 })
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const [createNewUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = async (e) => {
    e.preventDefault()
    const { data } = await createNewUser({
      variables: {
        input: { username, age }
      }
    })
    console.log('data', data)
    setUsername('')
    setAge(0)
  }

  const getAll = (e) => {
    e.preventDefault()
    refetch()
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <form>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={e => setAge(e.target.value)} type="number" />
        <div>
          <button onClick={addUser}>Create user</button>
          <button onClick={getAll}>Get users</button>
        </div>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.username}, {user.age} years old</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
