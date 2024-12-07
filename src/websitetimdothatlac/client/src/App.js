import { Route, Routes } from 'react-router-dom';
import { DetailPost, FoundItems, Home, Homepage, Login, LostItems } from './containers/Public';
import { path } from './ultils/constant';

function App() {
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.DO_NHAT_DUOC} element={<FoundItems />} />
          <Route path={path.DO_THAT_LAC} element={<LostItems />} />
          <Route path={path.DETAIL_POST__TITLE__POST} element={<DetailPost />} />
          <Route path={'chi-tiet/*'} element={<DetailPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
