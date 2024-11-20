import { Routes, Route } from 'react-router-dom'
import { Home, Login, FoundItems, LostItems, Homepage } from './containers/Public'
import { path } from './ultils/constant'

function App() {
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<Homepage />} />
          <Route path={path.HOME__PAGE} element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.DO_NHAT_DUOC} element={<FoundItems />} />
          <Route path={path.DO_THAT_LAC} element={<LostItems />} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
