import { lazy, Suspense, useState } from "react";
import { Link, useNavigate } from "react-router";
import Loader from "./Loader";
import { Star } from "lucide-react";
const AllSurahsInOnePlace = lazy(() => import("./AllSurahsInOnePlace"));
// import AllSurahsInOnePlace from

const QuranNav = () => {
  const navigate = useNavigate();
  const [lastAyah] = useState(() => localStorage.getItem("last_ayah"));
  return (
    <Suspense fallback={<Loader />}>
      <>
        <section className="flex items-center gap-2 mb-4 mx-4">
          {lastAyah && (
            <div
              onClick={() => {
                const localS = JSON.parse(localStorage.getItem("last_ayah")!);
                navigate(`${localS.surahName}?ayah=${localS.ayahNumber}`);
              }}
              className={`p-3 flex gap-2 text-sm cursor-pointer border-solid rounded-md border border-2 border-green-400/20 hover:bg-green-400/50 transition duration-300 ease-out mt-3`}
            >
              <Star className="text-green-600" fill="green" />
              اخر اية تم قرائتها
            </div>
          )}
        </section>
      </>
    </Suspense>
  );
};

export default QuranNav;
