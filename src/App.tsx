import "./lib/i18n"
import "./App.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Wrapper } from "./components/SurahByName"
import { lazy, Suspense } from "react"
import Loader from "./components/Loader"
const Header = lazy(() => import("./components/Header"))
const Home = lazy(() => import("./components/Home"))
const Quran = lazy(() => import("./components/Quran"))
const MwaketElsalaa = lazy(() => import("./components/MwaketElsalaa"))
const ReadFromPage = lazy(() => import("./components/ReadFromPage"))
const SurahText = lazy(() => import("./components/SurahText"))
const SurahByImage = lazy(() => import("./components/SurahByImage"))
const SurahByName = lazy(() => import("./components/SurahByName"))
const Azkar = lazy(() => import("./components/Azkar"))
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: (
        <>
          <Suspense fallback={<>
            <Loader />
            برجاء الانتظار ..
          </>}>

            <Header />
            <main className="md:w-[calc(100%-150px)] mx-auto mt-1 sm:px-5">
              <Outlet />
            </main>
          </Suspense>

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
            children: [{
              path: "", element: <>
                <Wrapper>
                  <SurahByName />
                </Wrapper>
              </>
            }, { path: ":id", element: <SurahText /> }]
          },
        ]
      },
      { path: "/prayer-times", element: <MwaketElsalaa /> },
      { path: "/azkar", element: <Azkar /> }
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