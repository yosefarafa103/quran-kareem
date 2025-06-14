import "./lib/i18n"
import "./App.css"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Wrapper } from "./components/SurahByName"
import { lazy, Suspense, useContext, } from "react"
import Loader from "./components/Loader"
import { ThemeContext } from "./context/ThemeContext"
import { Theme } from "./types/theme"
import Sebha from "./components/Sebha"
import Settings from "./components/Settings"
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
  const theme = useContext(ThemeContext) as Theme
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <Suspense fallback={<><Loader /> برجاء الانتظار ..</>}>
            <Header />
            <main style={{ fontSize: localStorage.getItem("font_size") ? `${+localStorage.getItem("font_size")}px` : "16px", fontFamily: localStorage.getItem("font_type") ? localStorage.getItem("font_type") : "cairo" }} className={`${theme?.theme === "Dark" ? "dark" : "light"} transition-all duration-500`}>
              <section className="md:w-[calc(100%-150px)] min-h-[calc(100svh-70px)] mx-auto sm:px-5  border-x-2 border-x-primary">
                <Routes>
                  <Route element={<Outlet />}>
                    <Route index element={<Navigate to="/quran" replace />} />
                    <Route path="quran" element={<Quran />} />
                    <Route path="quran/by-page" element={<ReadFromPage />} />
                    <Route path="quran/by-page/:pageNum" element={<SurahByImage />} />
                    <Route
                      path="/quran/by-surahs"
                      element={
                        <Wrapper>
                          <SurahByName />
                        </Wrapper>
                      }
                    />
                    <Route path="/quran/by-surahs/:id" element={<SurahText />} />
                    <Route path="/prayer-times" element={<MwaketElsalaa />} />
                    <Route path="/azkar" element={<Azkar />} />
                    <Route path="/sebha" element={<Sebha />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Routes>
              </section>
            </main>
          </Suspense>
        </BrowserRouter>
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