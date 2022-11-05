import {useState, useRef} from 'react'
import useFetch from './useFetch'
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" >
      <p className='wrong'>Something went wrong, you might want to fix up.</p>
      <pre className='wrong'>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button> 
     <p> <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigates"
        to="/"
      >
      </NavLink></p> 
    </div>
  )
}


function Navigation() {
  return (
    
    <section className="navigation">
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/Users"
      >
        Users
      </NavLink>

 <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/bomb"
      >
        Test_Error
      </NavLink>
      
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/where"
      >
        Error 404
      </NavLink>
    </section>
  );
}

export const Bomb=()=>{
   const [username, setUsername] = useState('')
  const usernameRef = useRef(null)


function Bomb({username}) {
  if (username === 'bomb') {
    throw new Error('Oops')
  }
  return <p>{`Hello ${username}`}</p>
}
  
  return( <div className="cabon">
    <label >
       <p>{`Username (don't type "bomb"): `}</p> 
        <input
          placeholder={`type "bomb"`}
          value={username}
          onChange={e => setUsername(e.target.value)}
          ref={usernameRef}
        />
      </label>
    <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setUsername('')
            usernameRef.current.focus()
          }}
          resetKeys={[username]}
        >
      <Bomb username={username} />
      </ErrorBoundary>
    
  </div>)
}

export function Users() {
  const[color, setColor] = useState(true)
 const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
  
  console.log({ loading, error, data });
  
  const pages = 30;

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Oops! Something went wrong.</>;
  }

  return (
    <div className="App">
      <h1 className="title">Users</h1>
      {data?.results
        .map((each, index) => {
          const name = `${each.name.first} ${each.name.last}`;
          return;
        })}
     
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
       {
        <button role="button"
          className="next_button"
          aria-pressed="false"
          tabindex="0"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}>
          prev
        </button>
      }
      {
        <button className="next_button"
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}>
          next
        </button>
      }
      
      <div className='Navigate'><Navigation /></div>
       <Outlet/>
    </div>
  );
}


const Notfound = () => {
  return (
    <div>
      <p className='wrong'>
        error 404, page Not found
      </p>
      <p className='errors'>Try again.</p>
        <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigates"
        to="/">
      </NavLink>
    </div>
  );
};
function Rout() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/bomb" element={<Bomb/>}/>
      
        <Route path="/Users" element={<Users />}>
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default Rout;