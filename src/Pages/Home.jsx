import Hero from '@/components/Hero'
import AIFeaturesSection from '@/components/home/AIFeaturesSection'
import FAQSection from '@/components/home/FAQSection'
import Footer from '@/components/home/Footer'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import PopularDestinationsSection from '@/components/home/PopularDestinationsSection'
import React from 'react'

const Home = () => {
  return (
    <div className="space-y-8">
      <Hero />
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
      <Footer />
    </div>
  )
}

export default Home
