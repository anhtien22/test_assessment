import { useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from ".";
import Login from './component/Login';
import Profile from './component/Profile';
import { loadUser } from "./redux/actions/userAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const isUser = JSON.parse(localStorage.getItem("userInfo"))
  return (
    <>
      <ToastProvider placement="bottom-left">
        <Router>
          <Routes>
            { user === null ? (
              <Route path="/" element={ <Login /> } />
            ) : (<>
              <Route path="/" element={ <Login /> } />
              <Route path="/profile" element={ <Profile /> } />
            </>) }
          </Routes>
        </Router>
      </ToastProvider>
    </>
  );
}

export default App;
