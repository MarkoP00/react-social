// router imports
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
// components
import Sidebar from "./components/sidebar/Sidebar";
import UserPost from "./components/social/UserPost";
import { AppContextProvider } from "./context/app-context";
import CreatePost from "./components/social/create-post/CreatePost";
import GlobalLoader from "./global/GlobalLoader.jsx";

const Login = lazy(() => import("./pages/Login"));
const Create = lazy(() => import("./pages/CreateAccout"));
const MainPage = lazy(() => import("./pages/MainPage"));
const SingleUser = lazy(() =>
  import("./components/social/ViewSingleUser/SingleUser")
);

export default function App() {
  return (
    <Suspense fallback={<GlobalLoader></GlobalLoader>}>
      <AppContextProvider>
        <div className="flex">
          <Sidebar></Sidebar>
          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={<MainPage></MainPage>}></Route>
              <Route
                path="*"
                element={<MainPage />}
              />
              <Route
                path="/mainPage"
                element={<MainPage></MainPage>}></Route>
              <Route
                path="/login"
                element={<Login></Login>}></Route>
              <Route
                path="/create"
                element={<Create></Create>}></Route>
              <Route
                path="/post"
                element={<UserPost></UserPost>}></Route>
              <Route
                path="/singleUser/:id"
                element={<SingleUser></SingleUser>}></Route>
              <Route
                path="/createPost"
                element={<CreatePost></CreatePost>}></Route>
            </Routes>
          </div>
        </div>
      </AppContextProvider>
    </Suspense>
  );
}
