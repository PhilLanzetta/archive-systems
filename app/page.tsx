import Image from 'next/image'
import ContactForm from './components/ContactForm'
import styles from './page.module.css'

const SERVICES = [
  {
    title: 'Archive Experiences',
    body: 'Every institution has a history. We design and build public-facing archive experiences that make decades of exhibitions, performances, commissions, and acquisitions visible for the first time — image-led, editorially considered, and built directly into your existing website.',
  },
  {
    title: 'Collections & Database Integration',
    body: 'We connect to your existing collections management systems — ArchivesSpace, TMS, Argus, PastPerfect — and build the public-facing experience layer on top. Your data stays where it is. The public sees something designed.',
  },
  {
    title: 'Website Design & Development',
    body: 'We design and build full institutional websites from the ground up — identity-coherent, CMS-integrated, and built to the standard your institution deserves. Custom-designed for how you work, not configured from a template.',
  },
  {
    title: 'Digital Partnership',
    body: 'We work with institutions as long-term digital partners — evolving the experience as the institution grows, adding new collections, new programs, new interfaces as they emerge.',
  },
]

const CLIENTS = [
  'A24 Films',
  'AIA NY',
  'Aperture',
  'the Armory Show | Frieze',
  'Baltimore Museum of Art',
  'BAMPFA',
  'BlackStar',
  'BMW',
  'Central Saint Martins',
  'Cooper Hewitt Smithsonian Design Museum',
  'David Zwirner',
  'Fondation Cartier',
  'Gagosian',
  'Gladstone Gallery',
  'Google',
  'Hauser & Wirth',
  'Hill Art Foundation',
  'Jack Shainman Gallery',
  'Jeffrey Deitch',
  'Norton Museum of Art',
  'Performa',
  'Serpentine Galleries',
  'Studio Museum in Harlem',
  'Swiss Institute',
  'The Drawing Center',
  'The Met',
  'The Kitchen',
]

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Background image */}
      <div className={styles.backgroundWrap}>
        <Image
          src='/background/hero-bg.png'
          alt=''
          fill
          priority
          className={styles.backgroundImage}
          aria-hidden='true'
        />
      </div>

      {/* Nav */}
      <header className={styles.nav}>
        <span className={styles.wordmark}>Archive Systems</span>
        <a href='#schedule-call' className={styles.navButton}>
          Schedule a Call
        </a>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>
          We design and build digital infrastructure for museums, galleries, and
          cultural institutions.
        </h1>
        <p className={styles.heroSubtext}>
          From archives and collections to full website experiences — we are the
          design and development partner for institutions that believe their
          digital presence should be as considered as their physical one.
        </p>
      </section>

      {/* Services grid */}
      <section className={styles.services}>
        <div className={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <div key={service.title} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <div className={styles.serviceDivider} />
              <p className={styles.serviceBody}>{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id='schedule-call' className={styles.contactSection}>
        <h2 className={styles.contactHeading}>Work with us.</h2>
        <div className={styles.contactFormWrap}>
          <ContactForm />
        </div>
      </section>

      {/* Pacific blurb + client list */}
      <section className={styles.about}>
        <p className={styles.aboutBlurb}>
          Archive Systems is an initiative by Pacific, a New York based creative
          agency and publisher with decades of experience across the
          world&apos;s leading cultural institutions and galleries.
        </p>
        <p className={styles.clientList}>{CLIENTS.join(', ')}.</p>
      </section>

      {/* Project images */}
      <section className={styles.projects}>
        <div className={styles.projectsGrid}>
          <div className={styles.projectFrame}>
            <Image
              src='/projects/project-1.png'
              alt='Project preview on laptop screen'
              fill
              sizes='(min-width: 768px) 50vw, 100vw'
              className={styles.projectImage}
            />
          </div>
          <div className={styles.projectFrame}>
            <Image
              src='/projects/project-2.png'
              alt='Gladstone Gallery website on laptop screen'
              fill
              sizes='(min-width: 768px) 50vw, 100vw'
              className={styles.projectImage}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <a href='#' className={styles.footerLink}>
          Pacific
        </a>
        <a href='#' className={styles.footerLink}>
          Instagram
        </a>
        <a href='#' className={styles.footerLink}>
          Contact
        </a>
      </footer>
    </div>
  )
}
