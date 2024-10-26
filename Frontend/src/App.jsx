import './index.css';
import Layout from './dashboard';
import Auth from './auth/index';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import Homepage from './Home/homepage';
// import NotFound from './NotFound/NotFound';
import 'regenerator-runtime/runtime'

function App() {
  const token = window.localStorage.getItem('token');  // Corrected this line
  return (
    <>
      {token != null ? (
        <>
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
