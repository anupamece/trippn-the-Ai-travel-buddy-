import React ,{useEffect, useState} from 'react'
import Header from './components/Header'
import Footer from './components/home/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './Pages/Home'
import CreateTrip from './Pages/CreateTrip'
import TripResult from './Pages/TripResult'
import MyTrips from './Pages/MyTrips'
import CommonLoader from './components/CommonLoader'
import GeneratingSpinner from './components/GeneratingSpinner'
import TravelPreloader from './components/TravelPreloader'
const App = () => {

    const [loading,setLoading]=useState(true);


    const location = useLocation();
    const showHeader = location.pathname === '/';

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setLoading(false);
        },2000)

        return ()=>clearTimeout(timer);
    },[]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <TravelPreloader key="preloader" />
      ) : (
        <div key="main-app" className="flex flex-col min-h-screen bg-[#080b11]">
          {showHeader && <Header/>}
          <main className="flex-1 w-full">
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/create-trip'} element={<CreateTrip/>} />
                <Route path={'/trip-result'} element={<TripResult/>} />
                <Route path={'/my-trips'} element={<MyTrips/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App
