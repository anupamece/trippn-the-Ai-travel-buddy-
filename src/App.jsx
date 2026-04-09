import React ,{useEffect, useState} from 'react'
import Header from './components/Header'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateTrip from './Pages/CreateTrip'
import TripResult from './Pages/TripResult'
import CommonLoader from './components/CommonLoader'
import GeneratingSpinner from './components/GeneratingSpinner'
const App = () => {

    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        const timer=setTimeout(()=>{
            setLoading(false);
        },2000)

        return ()=>clearTimeout(timer);
    },[]);

  return (
    loading ?
    <CommonLoader />:
    <>

     <Header/>
     <main className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
       <Routes>
           <Route path={'/'} element={<Home/>} />
           <Route path={'/create-trip'} element={<CreateTrip/>} />
           <Route path={'/trip-result'} element={<TripResult/>} />
       </Routes>
     </main>
    
    </>

  )
}

export default App
