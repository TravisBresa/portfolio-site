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
        url="/CV.pdf"
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

const Popout = ({ isOpen, onClose, title, extraLinks, coverImage }) => (
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
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-50">
            {coverImage ? (
              <img src={coverImage} alt={title} className="max-h-[70vh] rounded shadow" />
            ) : (
              <p className="text-slate-500">No preview available</p>
            )}
          </div>
          {extraLinks && extraLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 border-t bg-slate-100 px-4 py-3 justify-center">
              {extraLinks.map((link, index) => {
                let Icon = FileText;
                if (link.label.toLowerCase().includes("map")) Icon = Network;
                if (link.label.toLowerCase().includes("reference")) Icon = FileArchive;
                if (link.label.toLowerCase().includes("dissertation") || link.label.toLowerCase().includes("essay")) Icon = FileText;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900"
                  >
                    <Icon className="h-4 w-4" /> Download {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const [popout, setPopout] = useState({ isOpen: false, title: "", extraLinks: [], coverImage: "" });

  const openPopout = (title, extraLinks = [], coverImage = "") => {
    setPopout({ isOpen: true, title, extraLinks, coverImage });
  };

  const closePopout = () => setPopout({ isOpen: false, title: "", extraLinks: [], coverImage: "" });

  return (
    <Section id="projects" className="pt-8">
      <div className="grid gap-6 md:grid-cols-3">
        <ProjectCard
          title="Constructing Futures"
          description="My first foray into the world of ethnographic research, featuring fieldwork at a Special Economic Zone in Honduras where a group of hopeful technologists are looking to 'Make Death Optional'. What can this intriguing group tell us about the way emerging technologies are changing our understanding of our own species - 'the Human'?"
          imageUrl="/IMG_8581.jpeg"
          onOpen={() =>
            openPopout("Constructing Futures", [
              { label: "Full Dissertation", url: "/constructing-futures.pdf" }
            ], "/IMG_8581.jpeg")
          }
        />
        <ProjectCard
          title="Opportunity Barriers"
          description="We use systems mapping to examine the problem of opportunity barriers faced by young first and second generation migrants in the UK. This powerful tool helps us uncover the feedback loops reinforcing intergenertational disadvantage, and re-frames the notion of 'integration' as a systems issue."
          imageUrl="/MTS-Map.jpeg"
          onOpen={() =>
            openPopout("Opportunity Barriers", [
              { label: "Report", url: "/opportunity-report.pdf" },
              { label: "Reference List", url: "/opportunity-refs.pdf" },
              { label: "Systems Map", url: "/systems-map.pdf" }
            ], "/MTS-Map.jpeg")
          }
        />
        <ProjectCard
          title="The Emergence of COVID-19"
          description="A short 2023 essay, submitted for my Human Sciences coursework, which tracks the key factors which led to the emergence of the pandemic. For many, it's a debate between 'Natural' and 'Man-made', but I look to uncover the commonalities to both narratives. No matter how this virus came into existance, it's clear why it turned into a pandemic."
          imageUrl="/covid.jpeg"
          onOpen={() =>
            openPopout("The Emergence of COVID-19", [
              { label: "Full Essay", url: "/covid-essay.pdf" }
            ], "/covid.jpeg")
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


