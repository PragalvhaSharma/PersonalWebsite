import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 max-w-full mx-auto bg-[#0e0e0e]/70 backdrop-blur-xl border-none shadow-none">
    <div className="text-xl font-black tracking-tighter text-white">CURATOR</div>
    <div className="hidden md:flex gap-10">
      {['Work', 'Blog', 'Contact'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="font-headline uppercase tracking-widest text-[11px] font-bold text-gray-400 hover:text-white transition-colors duration-300">
          {item}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-4 text-white">
      <Mail className="w-5 h-5 hover:opacity-80 transition-opacity cursor-pointer" />
    </div>
  </nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-32 pb-20">
    <motion.h1 
      initial="hidden" animate="visible" variants={fadeUpVariant}
      className="font-headline font-extrabold text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter mb-12 text-white"
    >
      Prag.
    </motion.h1>
    <motion.div 
      initial="hidden" animate="visible" variants={fadeUpVariant} transition={{ delay: 0.2 }}
      className="max-w-2xl"
    >
      <p className="font-headline text-2xl md:text-4xl font-light leading-tight text-on-surface-variant">
        Designing systems that <span className="italic text-white">breathe</span>. Creating work that demands a pause in an age of infinite scroll.
      </p>
      <div className="mt-12 flex items-center gap-6">
        <div className="h-[1px] w-20 bg-outline-variant"></div>
        <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">Independent Curator & Designer</span>
      </div>
    </motion.div>
  </section>
);

const SelectedWorks = () => {
  const projects = [
    {
      id: 1,
      title: 'Aura Ecosystem',
      tags: ['Digital Design', '2024'],
      desc: 'A discovery engine for the next generation of AI tools. Redefining how we find and interact with artificial intelligence.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlpGAWVADPNCrceFdXV33bsEzr4GJBcGPi8XMtoA0mbLN5WJiPeA-8p-U6k_q_EU49UCVATTBG_0BEwJWdcJwyK9kfcYwO6RDOUzFh3GS91Jeuhx6xok4gbFwYGSD9buJE8ryRxJs6Ez1rskRXB5Io_dw4gPpcMX9H7uJVht9NvGSRFX0-pNQ7Mf-3qYJ5r9uAbLI7bqFGGfzaLJ5O0vpELTK8Zm7-LBjGQ8QgGP_yVaZu4rj9mpaPz0GFWhrLSrz1vBd_SJH6VDM',
      className: 'md:mt-0'
    },
    {
      id: 2,
      title: 'Kinetic Monolith',
      tags: ['Branding', '2023'],
      desc: 'Architectural concept for orbital habitats. Award-winning submission exploring the future of human life beyond Earth.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfw-IJZpqWxALweGNsRttkNYwpB5-txicKmb_9vLfTmXBgvkU1rS34zPyLQq2cRMrfIfYf-0zcahuWJgCyoglYzWUiDQVknVx-hx8nJOZkzrNTEdhVkNnw7aRXe0UASYWCiFLwnSgjzB9Uxjuartuc1n4me6d8_IRU_0wFhL4712Axh3e8I6J6Ywd_46GxmeZzqZK6_yg71T8TvjSVeUv3RyjLpsJtNferaN9NUEPtoTUJWzTIwzjgxehw8-BhFWX5sCggSAe7k4s',
      className: 'md:mt-32'
    },
    {
      id: 3,
      title: 'Obsidian OS',
      tags: ['Interface', '2023'],
      desc: 'A focused, text-first social layer built on privacy and distributed systems. Designing for silence in a noisy world.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1FiKpIey_7jl8VFiKGH_yeRHkRerGqbXxNvvMqSn7oMGwAyeERdibxGTp98hdDwHCDHg-CsX2sLQefKw3bKcuqvFpq50EDjE6NMxqMEjbM8ufT7oqz1xMnjuNB9J18YHfDvYDBCMcXaRnz4ww-J3UOHU2ovRJYMbPLW-2R5RPi798g0vf_8MSWiw2WfkDK5tNqJsGxv3-zZ8W0kSgcCWAqt0EnTMpYxn5dhgVf2tijQH9SuWp2wHhSx1EzxiSV9UsDnpUrtExPZE',
      className: 'md:-mt-16'
    }
  ];

  return (
    <section id="work" className="py-24 px-8 md:px-24 bg-surface-container-lowest">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4"
      >
        <h2 className="font-headline text-5xl font-bold tracking-tight text-white">Selected Works</h2>
        <span className="font-label text-xs uppercase tracking-widest text-outline">01 — PROJECT EXHIBITION</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">
        {projects.map((p, i) => (
          <motion.div 
            key={p.id} 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className={`space-y-6 ${p.className}`}
          >
            <div className="group relative overflow-hidden rounded-lg">
              <img alt={p.title} src={p.img} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                {p.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-surface-container-highest/50 rounded text-[9px] font-label text-tertiary uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-headline text-3xl font-bold tracking-tight text-white">{p.title}</h3>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed max-w-sm">
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const RecentThoughts = () => {
  const articles = [
    {
      date: 'Mar 12, 2024',
      readTime: '6 min read',
      title: 'The Cult of Convenience: Why good design should be difficult.',
      excerpt: "In an era where every click is optimized for speed, we've lost the friction that makes experiences memorable and human."
    },
    {
      date: 'Feb 28, 2024',
      readTime: '4 min read',
      title: 'The Digital Void: Designing for silence in a noisy world.',
      excerpt: "Minimalism isn't just about white space; it's about the intentional removal of the unnecessary to find meaning."
    }
  ];

  return (
    <section id="blog" className="py-32 px-8 md:px-24 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          className="mb-20"
        >
          <h2 className="font-headline text-5xl font-bold tracking-tight mb-4 text-white">Recent Thoughts</h2>
          <p className="font-body text-on-surface-variant max-w-md">Fragments of thought on design, culture, and the ethics of creation.</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-16">
          {articles.map((article, i) => (
            <motion.article 
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
              className="group"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest text-tertiary">{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline-variant">{article.readTime}</span>
              </div>
              <a href="#" className="block">
                <h3 className="font-headline text-3xl md:text-4xl font-semibold mb-6 text-white group-hover:text-tertiary transition-colors">
                  {article.title}
                </h3>
                <p className="font-body text-on-surface-variant line-clamp-2 text-lg">
                  {article.excerpt}
                </p>
              </a>
              <div className="mt-8">
                <a href="#" className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-tertiary transition-colors">
                  Read Fragment
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section className="py-24 px-8 md:px-24 bg-surface-container-low overflow-hidden">
    <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="w-full md:w-1/2 relative"
      >
        <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-xl">
          <img 
            alt="Portrait of the curator" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlV7ErnrKiVWPJDyNMB27OJ9HrPrgp_gRhfnfiV8_UAsTCWvy203dsmEPu9Z-5HKSXWYvndfCVbYoUib3B8EpZDporAn_vpXUOZ0loPHpm-zhXE0Ywx9yZ_O92fGxT8riRvcczQmL4k_u7ftTIUuSMA7L0ETOCUNjmeF2OZ1s9EgaPKefbOZVqFE8E_BerzlTbBjkeX8gZQ2Ep6WiXbRT7TzyG13E1mrVdk8ESmQ7KmWxeusxV4_7GEZBtia-TMFs03fpN0UIPmBo" 
            className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
          />
        </div>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-tertiary/20 flex items-center justify-center backdrop-blur-md bg-surface-container-lowest/30 rounded-full hidden md:flex">
          <span className="font-label text-[10px] uppercase tracking-widest text-center text-tertiary p-8">Available for select collaborations 2024</span>
        </div>
      </motion.div>
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        className="w-full md:w-1/2 space-y-8"
      >
        <span className="font-label text-[10px] uppercase tracking-widest text-outline">Philosophy</span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight text-white">
          I don't build websites. I curate digital experiences that last longer than a trend.
        </h2>
        <p className="font-body text-on-surface-variant text-lg leading-relaxed">
          The web has become a series of templates. I believe in the bespoke, the intentional, and the beautifully complex. Every project is an exhibition of craft.
        </p>
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 px-8 md:px-24 bg-background">
    <motion.div 
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
      className="text-center max-w-3xl mx-auto space-y-12"
    >
      <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter text-white">Let's talk.</h2>
      <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
        <a href="mailto:hello@prag.design" className="group flex flex-col items-center">
          <span className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Inquiries</span>
          <span className="font-headline text-2xl md:text-3xl font-light text-white border-b border-outline-variant group-hover:text-tertiary group-hover:border-tertiary transition-all">hello@prag.design</span>
        </a>
        <a href="#" className="group flex flex-col items-center">
          <span className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">Network</span>
          <span className="font-headline text-2xl md:text-3xl font-light text-white border-b border-outline-variant group-hover:text-tertiary group-hover:border-tertiary transition-all">LinkedIn</span>
        </a>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-20 px-8 border-t border-white/5 bg-[#0e0e0e] flex flex-col md:flex-row justify-between items-center gap-8">
    <div className="text-lg font-bold text-white">DIGITAL CURATOR</div>
    <div className="font-label text-[10px] uppercase tracking-widest text-gray-600">
      © 2024 DIGITAL CURATOR. ALL RIGHTS RESERVED.
    </div>
    <div className="flex gap-8">
      {['Instagram', 'LinkedIn', 'Dribbble'].map(social => (
        <a key={social} href="#" className="font-label text-[10px] uppercase tracking-widest text-gray-600 hover:text-tertiary transition-colors ease-in-out duration-300">
          {social}
        </a>
      ))}
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="font-body bg-background text-[#ffdde0] min-h-screen selection:bg-tertiary selection:text-surface-container-lowest">
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <RecentThoughts />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
