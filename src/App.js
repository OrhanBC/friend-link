import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import Root from "./components/Root";
import UserContext from "./contexts/UserContext";
import { auth } from "./lib/firebase";
import { useState } from "react";


function App() {
  const [user, setUser] = useState();
  auth.onAuthStateChanged(user => {
    setUser(user);
  });
  if (user === undefined) return (<></>)
  return (
    <UserContext.Provider value={ {currentUser: user} }>
     <RouterProvider router={ router }>
        <Root/>
      </RouterProvider>
    </UserContext.Provider>
   
  );
}

export default App;
