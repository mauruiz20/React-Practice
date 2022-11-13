import './App.css'
import { Link, Route, Routes, useParams, Outlet } from 'react-router-dom'
import { NavLink } from './NavLink'

const Home = () => <h1>Home</h1>

const SearchPage = () => {
  const tacos = [
    'cochinita',
    'chili',
    'carnita',
    'quesdilla'
  ]
  return (
    <div>
      <h1>Search Page</h1>
      <ul>
        {tacos.map(taco => (<li key={taco}><Link to={`/tacos/${taco}`}>{taco}</Link></li>))}
      </ul>
    </div>
  )
}

const Tacos = () => {
  const { taco } = useParams()
  return (
    <div><h1>Tacos</h1>
      {taco}
      <Link to='details'>Ir a detalles</Link>
      <Outlet />
    </div>
  )
}

const TacoDetails = () => {
  const { taco } = useParams()
  return (
    <h1>Taco Details {taco}</h1>
  )
}

const TacoIndex = () => {
  return (
    <h1>Index Route de Tacos</h1>
  )
}

function App () {
  return (
    <div className='App'>
      <header>
        <h1>miduchollo 💵</h1>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/search-page'>Search Page</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search-page' element={<SearchPage />} />
        <Route path='/tacos' element={<Tacos />}>
          <Route index element={<TacoIndex />} />
          <Route path='details' element={<TacoDetails />} />
        </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
