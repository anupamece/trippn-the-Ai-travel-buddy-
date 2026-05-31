import Hero from '@/components/Hero'
import AIFeaturesSection from '@/components/home/AIFeaturesSection'
import FAQSection from '@/components/home/FAQSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import PopularDestinationsSection from '@/components/home/PopularDestinationsSection'
import React from 'react'

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10 sm:gap-14 lg:gap-18">
      <Hero />
      
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-14 lg:gap-18">
        <PopularDestinationsSection />

        <div id="ai-features">
          <AIFeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="faqs">
          <FAQSection />
        </div>
      </div>
    </div>
  )
}

export default Home
