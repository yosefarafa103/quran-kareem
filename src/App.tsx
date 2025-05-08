import "./lib/i18n"
import "./App.css"
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Wrapper } from "./components/SurahByName"
import { lazy, Suspense, useContext, useEffect, useState } from "react"
import Loader from "./components/Loader"
import Compass from "./components/Compass"
import ThemeWrapper, { ThemeContext } from "./context/ThemeContext"
import { Theme } from "./types/theme"
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
  const { theme } = useContext<Theme>(ThemeContext)
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <Suspense fallback={<><Loader /> برجاء الانتظار ..</>}>
            <Header />
            <main className={`${theme === "Dark" ? "dark" : "light"} transition-all duration-500`}>
              <section className="md:w-[calc(100%-150px)] min-h-screen mx-auto sm:px-5 ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quran" element={<Quran />} />
                  <Route path="/quran/by-page" element={<ReadFromPage />} />
                  <Route path="/quran/by-page/:pageNum" element={<SurahByImage />} />
                  <Route
                    path="/quran/by-surahs"
                    element={
                      <Wrapper>
                        <SurahByName />
                      </Wrapper>
                    }
                  />
                  <Route path="/quran/by-surahs/:id" element={<SurahText />} />
                  <Route path="/compass" element={<Compass />} />
                  <Route path="/prayer-times" element={<MwaketElsalaa />} />
                  <Route path="/azkar" element={<Azkar />} />
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