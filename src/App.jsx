import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Download, FileText, FileArchive, Network, X } from "lucide-react";

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section = ({ id, children, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`py-16 ${className}`}
  >
    <Container>{children}</Container>
  </motion.section>
);

const Hero = () => (
  <Section id="home" className="pb-12">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Travis Bresa</h1>
     <p className="mt-4 max-w-2xl text-slate-600">
  Ethnographer. Systems Thinker. Explorer.
</p>
      <a
        href="/CV.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900"
      >
        <Download className="h-4 w-4" /> View CV
      </a>
    </div>
  </Section>
);

const ProjectCard = ({ title, description, onOpen, imageUrl }) => (
  <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
    <div className="w-full h-48 bg-slate-100">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
      <button
        onClick={onOpen}
        className="mt-2 inline-flex items-center text-sm font-medium text-slate-800 hover:underline"
      >
        View more <ExternalLink className="ml-1 h-4 w-4" />
      </button>
    </div>
  </div>
);

const Popout = ({ isOpen, onClose, title, extraLinks, coverImage, caption, context, insights }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg flex flex-col"
        >
          <div className="flex items-center justify-between border-b px-4 py-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6 bg-slate-50">
            {coverImage && (
              <div className="text-center">
                <img src={coverImage} alt={title} className="mx-auto max-h-64 rounded shadow" />
                {caption && <p className="mt-2 text-sm text-slate-500 italic">{caption}</p>}
              </div>
            )}
            {context && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Context</h3>
                <p className="text-slate-700">{context}</p>
              </div>
            )}
            {insights && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Insights</h3>
                <p className="text-slate-700">{insights}</p>
              </div>
            )}
          </div>

          {extraLinks && extraLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 border-t bg-slate-100 px-4 py-3 justify-center">
              {extraLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900"
                >
                  <FileText className="h-4 w-4" /> Download {link.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Projects Section ---
const Projects = () => {
  const [popout, setPopout] = useState({
    isOpen: false,
    title: "",
    extraLinks: [],
    coverImage: "",
    caption: "",
    context: "",
    insights: ""
  });

  const openPopout = (title, extraLinks = [], coverImage = "", caption = "", context = "", insights = "") => {
    setPopout({ isOpen: true, title, extraLinks, coverImage, caption, context, insights });
  };

  const closePopout = () =>
    setPopout({ isOpen: false, title: "", extraLinks: [], coverImage: "", caption: "", context: "", insights: "" });

  return (
    <Section id="projects" className="pt-8">
      <div className="grid gap-6 md:grid-cols-3">

        {/* --- Constructing Futures --- */}
        <ProjectCard
          title="Constructing Futures"
          description="My first foray into the world of ethnographic research, featuring fieldwork at a Special Economic Zone in Honduras where a group of hopeful technologists are looking to 'Make Death Optional'."
          imageUrl="/IMG_8581.jpeg"
          onOpen={() =>
            openPopout(
              "Constructing Futures",
              [{ label: "Full Dissertation", url: "/constructing-futures.pdf" }],
              "/IMG_8581.jpeg",
              "A hand crafted Paper-mâché skull, burned by the Vitalia community as a proclamation of 'La muerte de la muerte', the death of death.",
              "My dissertation explored how emerging technologies shape our understanding of 'the Human.' Through ethnographic research at Vitalia, a transhumanist community in Próspera, Honduras, I studied both biotechnological self-enhancement and political infrastructures designed for radical experimentation.",
              "What can this intriguing group tell us about the way emerging technologies are changing our understanding of our own species — 'the Human'? The project shows how technologies of the self and political infrastructures together generate new imaginaries of human futures, while also producing exclusions."
            )
          }
        />

        {/* --- Opportunity Barriers --- */}
        <ProjectCard
          title="Opportunity Barriers"
          description="We use systems mapping to examine the problem of opportunity barriers faced by young first and second generation migrants in the UK."
          imageUrl="/MTS-Map.jpeg"
          onOpen={() =>
            openPopout(
              "Opportunity Barriers",
              [
                { label: "Report", url: "/opportunity-report.pdf" },
                { label: "Reference List", url: "/opportunity-refs.pdf" },
                { label: "Systems Map", url: "/systems-map.pdf" }
              ],
              "/MTS-Map.jpeg",
              "A systems visualisation of the contributing factors to opportunity barriers faced by young migrants, created in Kumo.io.",
              "This project mapped the systemic barriers faced by young migrants in the UK, reframing integration as a dynamic process of opportunity-building. Using systems mapping and community research, we analysed how bridging social capital, contradictory policies, and delayed access to education reinforced intergenerational disadvantage.",
              "This powerful tool helps us uncover the feedback loops that sustain inequality and demonstrates how integration is less about assimilation and more about addressing systemic opportunity gaps. The work highlighted both the importance and the limitations of grassroots and policy interventions."
            )
          }
        />

        {/* --- The Emergence of COVID-19 --- */}
        <ProjectCard
          title="The Emergence of COVID-19"
          description="A short 2023 essay, submitted for my Human Sciences coursework, which tracks the key factors that led to the emergence of the pandemic."
          imageUrl="/covid.jpeg"
          onOpen={() =>
            openPopout(
              "The Emergence of COVID-19",
              [{ label: "Full Essay", url: "/covid-essay.pdf" }],
              "/covid.jpeg",
              "A digital rendering of the SARS-CoV-2 virion.",
              "This essay examined the ecological and social factors that enabled the emergence of the pandemic, situating it within broader human–environment systems. Drawing on interdisciplinary sources, I explored how urbanisation, wildlife–human interfaces, and political fragility contributed to the crisis.",
              "For many, the question is framed as a debate between 'Natural' and 'Man-made.' My analysis sought to uncover their commonalities, showing that regardless of origin, systemic vulnerabilities explain why the virus became a pandemic."
            )
          }
        />

      </div>
      <Popout {...popout} onClose={closePopout} />
    </Section>
  );
};

export default function PortfolioSite() {
  return (
    <div className="min-h-screen scroll-smooth bg-white text-slate-900">
      <main>
        <Hero />
        <Projects />
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Travis Bresa
      </footer>
    </div>
  );
}


