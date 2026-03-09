import { useEffect, useState, useCallback, useRef, memo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'
import { ContentProvider } from './context/ContentContext'
import { ContentErrorBanner } from './components/ContentErrorBanner'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import './components/ScrollProgress/ScrollProgress.css'
import { HeroSection } from './screens/HomePage/sections/HeroSection'
import { FeaturesSection } from './screens/HomePage/sections/FeaturesSection'
import { ProjectAndInquirySection } from './screens/HomePage/sections/ProjectAndInquirySection'
import { LatestProjectSnapshotSection } from './screens/HomePage/sections/LatestProjectSnapshotSection'
import { ContactFormSection } from './screens/HomePage/sections/ContactFormSection'
import { SiteReviewSection } from './screens/HomePage/sections/SiteReviewSection'
import { FooterSection } from './screens/HomePage/sections/FooterSection'

gsap.registerPlugin(ScrollTrigger)

const queryClient = new QueryClient()

const MemoHero = memo(HeroSection)
const MemoFeatures = memo(FeaturesSection)
const MemoProject = memo(ProjectAndInquirySection)
const MemoLatest = memo(LatestProjectSnapshotSection)
const MemoContact = memo(ContactFormSection)
const MemoSiteReview = memo(SiteReviewSection)
const MemoFooter = memo(FooterSection)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const progressFillRef = useRef(null)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const fill = progressFillRef.current
      if (fill) fill.style.transform = `scaleX(${e.progress})`
    })

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <>
          <ContentErrorBanner />
          <ScrollProgress fillRef={progressFillRef} />
          <div className="main-content flex flex-col w-full">
            <MemoHero />
            <MemoFeatures />
            <MemoProject />
            <MemoLatest />
            <MemoContact />
            <MemoSiteReview />
            <MemoFooter />
          </div>
        </>
      )}
      </ContentProvider>
    </QueryClientProvider>
  )
}

export default App
