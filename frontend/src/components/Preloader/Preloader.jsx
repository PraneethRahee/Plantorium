import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import './Preloader.css'

gsap.registerPlugin(CustomEase, SplitText)

const HumanSvg = () => (
  <svg viewBox="0 0 44 58" fill="none" className="pl-human-svg" aria-hidden>
    <ellipse cx="22" cy="6" rx="10" ry="4" fill="#3d2c1f" />
    <path d="M12 6 Q22 0 32 6 L30 10 Q22 14 14 10 Z" fill="#5a3d28" stroke="#3d2c1f" strokeWidth="0.5" />

    <circle cx="22" cy="12" r="5" fill="#d4a574" />

    <rect x="20" y="17" width="4" height="4" rx="1" fill="#d4a574" />
    <path d="M14 21 L12 36 L22 38 L32 36 L30 21 Z" fill="#4a6b3c" stroke="#3d5a30" strokeWidth="0.5" />
    <path d="M12 24 L4 38" stroke="#4a6b3c" strokeWidth="2.5" strokeLinecap="round" className="pl-human-arm-plant" />
    <path d="M30 25 L38 30" stroke="#4a6b3c" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 28 L40 28 L40 34 L36 34 Z" fill="#5a4a3a" stroke="#4a3a2a" strokeWidth="0.5" rx="1" />
    <circle cx="38" cy="26" r="1.5" fill="#6b5a4a" />
    <path d="M14 36 L12 52 M30 36 L32 52" stroke="#2d3a1f" strokeWidth="3.5" strokeLinecap="round" />
    <ellipse cx="12" cy="53" rx="3" ry="1.5" fill="#3d2c1f" />
    <ellipse cx="32" cy="53" rx="3" ry="1.5" fill="#3d2c1f" />
  </svg>
)

const PlantSvg = () => (
  <svg viewBox="0 0 48 64" fill="none" className="pl-sapling-svg" aria-hidden>
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

const PLANT_SPOTS = [
  { left: '22%' },
  { left: '48%' },
  { left: '74%' },
]

export const Preloader = ({ onComplete }) => {
  const hasCompleted = useRef(false)
  const humanRef = useRef(null)
  const seedRefs = useRef([])
  const treeRefs = useRef([])

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
      char.innerHTML = `<span class="pl-char-inner">${text}</span><span class="pl-char-fill" aria-hidden="true">${text}</span>`
    })

    const charFills = gsap.utils.toArray('.pl-preloader .pl-char-fill')
    gsap.set(charFills, { clipPath: 'inset(0 0 100% 0)' })

    const splitTags = []
    document.querySelectorAll('.pl-tags-overlay .pl-tag p').forEach((el) => {
      splitTags.push(new SplitText(el, { type: 'words', wordsClass: 'pl-word' }))
    })

    const isMobile = window.innerWidth <= 1000
    const tl = gsap.timeline({ defaults: { ease: 'hop' } })
    const tags = gsap.utils.toArray('.pl-tag')
    const human = humanRef.current
    const seeds = seedRefs.current.filter(Boolean)
    const trees = treeRefs.current.filter(Boolean)

    gsap.set(human, { left: '-8%' })
    gsap.set(seeds, { y: -20, opacity: 0 })
    gsap.set(trees, { scaleY: 0, transformOrigin: 'center bottom' })
    gsap.set('.pl-sapling .pl-plant-stem', { strokeDasharray: 50, strokeDashoffset: 50 })
    gsap.set('.pl-sapling .pl-plant-leaf', { scale: 0, transformOrigin: 'center center' })

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll('p .pl-word'),
        { y: '0%', duration: 0.8 },
        0.4 + index * 0.12
      )
    })

    tl.to(
      '.pl-preloader .pl-char-inner',
      { y: '0%', duration: 0.9, stagger: 0.04 },
      0.4
    )

    tl.to(
      '.pl-line',
      { width: isMobile ? '120px' : '200px', duration: 2.5, ease: 'power2.inOut' },
      0.4
    )

    tl.to(charFills, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.8,
      stagger: 0.16,
      ease: 'power2.inOut',
    }, 3.5)

    tl.to(human, { left: '22%', duration: 0.5, ease: 'power2.inOut' }, 3)

    tl.to(human, { rotation: 25, transformOrigin: 'center bottom', duration: 0.08 }, 3.5)
    tl.to('.pl-human-arm-plant', { rotation: 45, transformOrigin: '12px 24px', duration: 0.08 }, 3.5)
    tl.to(seeds[0], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.in' }, 3.55)
    tl.to(human, { rotation: 0, duration: 0.06 }, 3.65)
    tl.to('.pl-human-arm-plant', { rotation: 0, duration: 0.06 }, 3.65)

    tl.to(human, { left: '48%', duration: 0.45, ease: 'power2.inOut' }, 3.72)
    tl.to(human, { rotation: 25, transformOrigin: 'center bottom', duration: 0.08 }, 4.17)
    tl.to('.pl-human-arm-plant', { rotation: 45, transformOrigin: '12px 24px', duration: 0.08 }, 4.17)
    tl.to(seeds[1], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.in' }, 4.22)
    tl.to(human, { rotation: 0, duration: 0.06 }, 4.32)
    tl.to('.pl-human-arm-plant', { rotation: 0, duration: 0.06 }, 4.32)

    tl.to(human, { left: '74%', duration: 0.45, ease: 'power2.inOut' }, 4.39)
    tl.to(human, { rotation: 25, transformOrigin: 'center bottom', duration: 0.08 }, 4.84)
    tl.to('.pl-human-arm-plant', { rotation: 45, transformOrigin: '12px 24px', duration: 0.08 }, 4.84)
    tl.to(seeds[2], { opacity: 1, y: 0, duration: 0.12, ease: 'power2.in' }, 4.89)
    tl.to(human, { rotation: 0, duration: 0.06 }, 4.99)
    tl.to('.pl-human-arm-plant', { rotation: 0, duration: 0.06 }, 4.99)

    tl.to(human, { left: '105%', duration: 0.4, ease: 'power2.in' }, 5.05)

    trees.forEach((tree, i) => {
      const stem = tree.querySelector('.pl-plant-stem')
      const leaves = tree.querySelectorAll('.pl-plant-leaf')
      tl.to(tree, {
        scaleY: 1,
        duration: 0.9,
        ease: 'power2.out',
      }, 5.5 + i * 0.15)
      tl.to(stem, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      }, 5.6 + i * 0.15)
      tl.to(leaves, {
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      }, 6.1 + i * 0.15)
    })

    tl.to('.pl-line', { width: 0, opacity: 0, duration: 0.25 }, 7.2)

    tl.to('.pl-preloader .pl-char-inner', { y: '100%', duration: 0.4, stagger: 0.02 }, 7.2)
    tl.to('.pl-preloader .pl-char-fill', { y: '100%', duration: 0.4, stagger: 0.02 }, 7.2)

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll('p .pl-word'),
        { y: '100%', duration: 0.4 },
        7.2 + index * 0.06
      )
    })

    tl.add(() => {
      gsap.set('.pl-preloader', {
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0% 50%)',
      })
      gsap.set('.pl-split-overlay', {
        clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
      })
    }, 7.65)

    tl.to(
      '.main-content',
      {
        clipPath: 'polygon(0 48%, 100% 48%, 100% 52%, 0% 52%)',
        duration: 0.5,
      },
      7.65
    )

    tl.to(
      ['.pl-preloader', '.pl-split-overlay'],
      {
        y: (i) => (i === 0 ? '-50%' : '50%'),
        duration: 0.7,
      },
      8.15
    )

    tl.to(
      '.main-content',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.7,
        onComplete: () => {
          hasCompleted.current = true
          document.body.style.overflow = ''
          if (mainEl) mainEl.style.clipPath = ''
          onComplete?.()
        },
      },
      8.15
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
        <div className="pl-ground-scene">
          <div className="pl-ground" />
          {PLANT_SPOTS.map((_, i) => (
            <div
              key={`seed-${i}`}
              ref={(el) => (seedRefs.current[i] = el)}
              className="pl-seed"
              style={{ left: PLANT_SPOTS[i].left }}
            >
              <div className="pl-seed-dot" />
            </div>
          ))}
          {PLANT_SPOTS.map((_, i) => (
            <div
              key={`tree-${i}`}
              ref={(el) => (treeRefs.current[i] = el)}
              className="pl-sapling"
              style={{ left: PLANT_SPOTS[i].left }}
            >
              <PlantSvg />
            </div>
          ))}
          <div ref={humanRef} className="pl-human">
            <HumanSvg />
          </div>
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
