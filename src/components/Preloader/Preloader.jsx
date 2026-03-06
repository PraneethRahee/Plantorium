import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import './Preloader.css'

gsap.registerPlugin(CustomEase, SplitText)

const PlantSvg = () => (
  <svg className="pl-plant-svg" viewBox="0 0 48 64" fill="none" aria-hidden>
    <path
      className="pl-plant-stem"
      d="M24 56 L24 8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <ellipse className="pl-plant-leaf pl-plant-leaf-1" cx="24" cy="14" rx="8" ry="5" fill="currentColor" />
    <ellipse className="pl-plant-leaf pl-plant-leaf-2" cx="18" cy="24" rx="6" ry="4" fill="currentColor" transform="rotate(-25 18 24)" />
    <ellipse className="pl-plant-leaf pl-plant-leaf-3" cx="30" cy="24" rx="6" ry="4" fill="currentColor" transform="rotate(25 30 24)" />
    <ellipse className="pl-plant-leaf pl-plant-leaf-4" cx="16" cy="36" rx="7" ry="4" fill="currentColor" transform="rotate(-15 16 36)" />
    <ellipse className="pl-plant-leaf pl-plant-leaf-5" cx="32" cy="36" rx="7" ry="4" fill="currentColor" transform="rotate(15 32 36)" />
  </svg>
)

export const Preloader = ({ onComplete }) => {
  const hasCompleted = useRef(false)

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden'

    const mainEl = document.querySelector('.main-content')
    if (mainEl) {
      mainEl.style.clipPath = 'polygon(0 50%, 0 50%, 0 50%, 0 50%)'
    }

    CustomEase.create('hop', '0.8,0,.3,1')

    const splitTitle = new SplitText('.pl-preloader .pl-title h1', {
      type: 'words,chars',
      wordsClass: 'pl-word',
      charsClass: 'pl-char',
    })

    splitTitle.chars.forEach((char) => {
      const text = char.textContent
      char.innerHTML = `<span class="pl-char-inner">${text}</span>`
    })

    const splitTags = []
    document.querySelectorAll('.pl-tags-overlay .pl-tag p').forEach((el) => {
      splitTags.push(new SplitText(el, { type: 'words', wordsClass: 'pl-word' }))
    })

    const isMobile = window.innerWidth <= 1000
    const tl = gsap.timeline({ defaults: { ease: 'hop' } })
    const tags = gsap.utils.toArray('.pl-tag')

    gsap.set('.pl-plant-wrap', { scaleY: 0, transformOrigin: 'center bottom' })
    gsap.set('.pl-plant-stem', { strokeDasharray: 50, strokeDashoffset: 50 })
    gsap.set('.pl-plant-leaf', { scale: 0, transformOrigin: 'center center' })

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll('p .pl-word'),
        { y: '0%', duration: 0.75 },
        0.5 + index * 0.1
      )
    })

    tl.to(
      '.pl-preloader .pl-char-inner',
      { y: '0%', duration: 0.8, stagger: 0.03 },
      0.5
    )

    tl.to(
      '.pl-line',
      { width: isMobile ? '120px' : '200px', duration: 2.5, ease: 'power2.inOut' },
      0.5
    )

    tl.to('.pl-preloader .pl-title h1', {
      color: '#6b8f3c',
      duration: 1,
      ease: 'power2.inOut',
    }, 2)

    tl.to('.pl-preloader .pl-title h1', {
      color: '#a7c463',
      duration: 0.8,
    }, 3)

    tl.to('.pl-plant-wrap', {
      scaleY: 1,
      duration: 2.5,
      ease: 'power2.out',
    }, 3)

    tl.to('.pl-plant-stem', {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
    }, 3.2)

    tl.to('.pl-plant-leaf', {
      scale: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'back.out(1.4)',
    }, 4.2)

    tl.to('.pl-line', { width: 0, opacity: 0, duration: 0.5 }, 5.5)

    tl.to(
      '.pl-preloader .pl-char-inner',
      { y: '100%', duration: 0.75, stagger: 0.025 },
      5.5
    )

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll('p .pl-word'),
        { y: '100%', duration: 0.75 },
        5.5 + index * 0.1
      )
    })

    tl.add(() => {
      gsap.set('.pl-preloader', {
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0% 50%)',
      })
      gsap.set('.pl-split-overlay', {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
      })
    }, 6.5)

    tl.to(
      '.main-content',
      {
        clipPath: 'polygon(0 48%, 100% 48%, 100% 52%, 0% 52%)',
        duration: 0.5,
      },
      6.5
    )

    tl.to(
      ['.pl-preloader', '.pl-split-overlay'],
      {
        y: (i) => (i === 0 ? '-50%' : '50%'),
        duration: 1,
      },
      7
    )

    tl.to(
      '.main-content',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        onComplete: () => {
          hasCompleted.current = true
          document.body.style.overflow = ''
          if (mainEl) mainEl.style.clipPath = ''
          onComplete?.()
        },
      },
      7
    )

    return () => {
      tl.kill()
      document.body.style.overflow = ''
      if (!hasCompleted.current && mainEl) {
        mainEl.style.clipPath = ''
      }
      splitTitle.revert()
      splitTags.forEach((s) => s.revert())
    }
  }, [onComplete])

  return (
    <>
      <div className="pl-preloader">
        <div className="pl-title">
          <h1>Plantorium</h1>
        </div>
        <div className="pl-line" />
        <div className="pl-plant-wrap">
          <PlantSvg />
        </div>
      </div>
      <div className="pl-split-overlay" />
      <div className="pl-tags-overlay">
        <div className="pl-tag pl-tag-1">
          <p>Landscape Design</p>
        </div>
        <div className="pl-tag pl-tag-2">
          <p>Planting Execution</p>
        </div>
        <div className="pl-tag pl-tag-3">
          <p>Garden Architecture</p>
        </div>
      </div>
    </>
  )
}
