import "./App.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MwaketElsalaa from "./components/MwaketElsalaa"
import Quran from "./components/Quran"
import ReadFromPage from "./components/ReadFromPage"
import SurahByImage from "./components/SurahByImage"
import SurahByName from "./components/SurahByName"
import SurahText from "./components/SurahText"
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: (
        <>
          <Header />
          <main className="md:w-[calc(100%-150px)] mx-auto mt-1 sm:px-5">
            <Outlet />
          </main>
        </>
      ),
      children: [{ path: "/", element: <Home /> }, {
        path: "/quran", element: <Outlet />,
        children: [
          { path: "", element: <Quran /> },
          {
            path: 'by-page', element: <Outlet />,
            children: [{
              path: "", element: <ReadFromPage />,
            }, {
              path: ":pageNum",
              element: <SurahByImage />
            }]
          },
          {
            path: 'by-surahs', element: <Outlet />,
            children: [{ path: "", element: <SurahByName /> }, { path: ":id", element: <SurahText /> }]
          },
        ]
      },
      { path: "/prayer-times", element: <MwaketElsalaa /> }
      ]
    },
  ])
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}
export function Root() {
  return (
    <>ROOT PAGE</>
  )
}
export default App