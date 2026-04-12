import {useEffect, useState} from 'react'
import { StepOne, StepTwo, StepThree } from '@/components/Forms'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { generateTripPlan, parseTripPlanResponse } from '@/Services/aiModel'
import { getTripImages } from '@/Services/pexelsService'
import { useNavigate } from 'react-router-dom'
import GeneratingSpinner from '@/components/GeneratingSpinner'
import LoginDialog from '../components/LoginDialog'
import CommonLoader from '../components/CommonLoader'
import Offers from '@/components/Offers'
import ApiErrorMessage from '@/components/ApiErrorMessage'

function getGeminiErrorMessage(error) {
    const fallbackMessage = 'We could not generate your trip plan right now. Please try again in a moment.';
    const message = error?.message || '';

    if (!message) {
        return fallbackMessage;
    }

    if (message.includes('VITE_GOOGLE_GEMINI_API_KEY')) {
        return 'The Gemini API key is missing. Add `VITE_GOOGLE_GEMINI_API_KEY` to your `.env` file and try again.';
    }

    if (message.includes('Empty Gemini response') || message.includes('Could not find valid JSON')) {
        return 'The AI returned an unreadable trip plan. Please try again so we can generate a cleaner response.';
    }

    return fallbackMessage;
}

const CreateTrip = () => {
    const navigate = useNavigate();
    const [preloader, setPreloader] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [steps, setSteps] = useState(1);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [tripData, setTripData] = useState({
        travelingFrom:null,
        travelingFromDetails:null,
        destination:null,
        destinationDetails:null,
        noOfDays:'',
        noOfTravelers:'',
        hasChildren:false,
        budget:'',
        interests:[],
        cuisinePreferences:[],
    })

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setPreloader(false);
        },2000)
        return ()=>clearTimeout(timer);
    },[]);

    const handleNextClick = async () => {
        if (steps < 3) {
            setSteps(steps + 1);
            return;
        }
        
        const user=localStorage.getItem('user')//this will only excecute when step===3 
        if(!user){
            setOpenDialog(true);
            return;
        }
        setApiError('');
        try {
            setLoading(true);
            const response = await generateTripPlan(tripData);
            const parsedTripPlan = parseTripPlanResponse(response);
            const hotelNames = (parsedTripPlan.hotelSuggestions || [])
              .slice(0, 3)
              .map((hotel) => hotel.name)
              .filter(Boolean);

            let tripImages = {
              destinationCover: null,
              restaurantImage: null,
              hotelImages: [],
              activityImages: [],
            };

            try {
              tripImages = await getTripImages(
                tripData.destination,
                hotelNames,
                parsedTripPlan.dailyPlan || []
              );
            } catch (imageError) {
              console.error('Failed to fetch trip images:', imageError);
            }

            navigate('/trip-result', {
                state: {
                    tripPlan: parsedTripPlan,
                    tripImages,
                },
            });
        } catch (error) {
            setApiError(getGeminiErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }
    const handlePrevClick = () => {
        if (steps > 1) {
            setApiError('');
            setSteps(steps - 1);
        }
    }

  return (
    preloader? <CommonLoader/>:
    <div className='flex min-h-screen items-center justify-center px-0 py-4 sm:px-4 sm:py-10'>
      {loading ? (
        <GeneratingSpinner />
      ) : (
        <div className='grid w-full max-w-[82rem] gap-3 sm:gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:items-start'>
        <div className='w-full xl:min-w-0'>
        <div className='w-full min-h-[64vh] sm:min-h-[60vh]
          rounded-none border-y border-white/8 bg-transparent shadow-none sm:rounded-[32px] sm:border sm:border-white/8 sm:bg-[#161616] sm:shadow-[0_20px_60px_rgba(0,0,0,0.28)]
          overflow-hidden flex flex-col'>
        {/* progress bar */}
            <div className='h-2 w-full bg-white/8'>
                <div
                className='h-full bg-linear-to-r from-amber-300 via-orange-500 to-orange-600 transition-all duration-500 ease-out'
                style={{width:`${(steps/3*100)}%`}}
                />
            </div>
            <div className='relative flex flex-1 flex-col overflow-hidden px-4 py-5 sm:p-6 md:p-10'>
                <div
                  className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-32 sm:block"
                  style={{ backgroundImage: "url('/card-bg.png')" }}
                />
                <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(16,16,16,0.3)_0%,rgba(16,16,16,0.48)_34%,rgba(16,16,16,0.72)_100%)] sm:block" />
                <div className="relative z-10 flex flex-1 flex-col">
                {/* steps  */}
                <div className='mb-8 flex items-center justify-center gap-2'>
                    {[1,2,3].map((s)=>(
                        <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s===steps ? 'w-6 bg-orange-500' : 'w-2 bg-white/20'}`}/>
                    ))}
                </div>

                <div className='mb-8 flex items-center justify-center'>
                  <div className='inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-white/64'>
                    <Sparkles className='size-4 text-blue-400' />
                    Step {steps} of 3
                  </div>
                </div>

                {apiError ? <ApiErrorMessage message={apiError} /> : null}

                {steps===1 && <StepOne tripData={tripData} setTripData={setTripData} />}
                {steps===2 && <StepTwo tripData={tripData} setTripData={setTripData} />}
                {steps===3 && <StepThree tripData={tripData} setTripData={setTripData} />}
                </div>
            </div>
            <div className='flex items-center justify-between border-t border-white/8 bg-transparent px-4 py-4 sm:bg-[#141414] sm:px-5 md:px-8'>
                <Button
                variant="outline"
                size="lg"
                className='cursor-pointer rounded-2xl border-white/10 bg-white/[0.03] px-5 text-white hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40'
                onClick={handlePrevClick}
                disabled={steps===1 || loading}>
                    <ArrowLeft className='size-4' />
                    Previous
                </Button>
                <Button
                size="lg"
                className='cursor-pointer rounded-2xl bg-blue-500 px-6 text-white shadow-[0_12px_35px_rgba(59,130,246,0.24)] hover:bg-blue-400'
                onClick={handleNextClick}
                disabled={loading}>
                    {steps===3 ?  'Finish': 'Next'}
                    {steps===3 ? <Check className='size-4' /> : <ArrowRight className='size-4' />}
                </Button>
            </div>
            
          </div>  
        </div>
        <div className="xl:sticky xl:top-28">
          <Offers />
        </div>
        </div>
      )}

      <LoginDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onLogin={() => setOpenDialog(false)}
      />
    </div>
  )
}

export default CreateTrip
