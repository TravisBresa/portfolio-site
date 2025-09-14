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
        href="https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/078db8f4-5189-46b1-a34b-b3690b5d3d77/Travis_Bresa_CV_(1).pdf?table=block&id=26ee16bb-a140-8013-9ffe-cdbc47f16822&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=Itzhmy1eQsSYYaKdIvOLLe9I2-qVXULmcvuZ_W_XT8k&downloadName=Travis+Bresa+CV+%281%29.pdf"
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
          description="Ethnography of transhumanism in Honduras exploring futures and sociotechnical imaginaries."
          imageUrl="/IMG_8581.jpeg"
          onOpen={() =>
            openPopout("Constructing Futures", [
              { label: "Full Dissertation", url: "https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/a450f327-0f2f-4dd6-b442-2f289d0ff033/Dissertation_Constructing_Futures.pdf?table=block&id=26ee16bb-a140-800d-9d99-f5b73c18a9f7&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=XYC4QCY9hwZhXHGjvxMGrOqWRdvJaIDK2VCs1RELo8s&downloadName=Dissertation+Constructing+Futures.pdf" }
            ], "/IMG_8581.jpeg")
          }
        />
        <ProjectCard
          title="Opportunity Barriers"
          description="Systems map of barriers faced by young migrants in the UK, reframing integration as opportunity."
          imageUrl="/MTS-Map.jpeg"
          onOpen={() =>
            openPopout("Opportunity Barriers", [
              { label: "Report", url: "https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/1cca02e8-10bd-4862-b7ff-1ce10253bffa/Map_the_System_Report.pdf?table=block&id=26ee16bb-a140-8072-84a6-dccf3df55d05&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=OBS9pCF5qpKGWTxz1K9cKULmn1YbMzUc8kfS5wKy0Ao&downloadName=Map+the+System+Report.pdf" },
              { label: "Reference List", url: "https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/4b5e8a9c-4eab-4043-bc24-93ebb31b59b6/Reference_List.pdf?table=block&id=26ee16bb-a140-8093-a87c-ddf9975e4644&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=AQogqLlJAZs4VMhTWfTJJv_vTr_Qmllt4UehTAZbAFs&downloadName=Reference+List.pdf" },
              { label: "Systems Map", url: "https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/952186d6-4108-43c1-8356-49c79b09782e/Systems_Map.pdf?table=block&id=26ee16bb-a140-80a5-9b9f-cdf65ac2a19e&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=zG3PW4aQ6I_SJPNVo_2cO5hIW2mSMm9uP1SezqAAC0w&downloadName=Systems+Map.pdf" }
            ], "/MTS-Map.jpeg")
          }
        />
        <ProjectCard
          title="The Emergence of COVID-19"
          description="Interdisciplinary analysis of the ecological and social factors in the pandemic’s emergence."
          imageUrl="/covid.jpeg"
          onOpen={() =>
            openPopout("The Emergence of COVID-19", [
              { label: "Full Essay", url: "https://file.notion.so/f/f/c8f37012-1ccf-4d83-87c7-b308b417ebea/ef95cc37-e570-416c-ba2e-eaeb6a7d55e0/Human_Ecology_Essay_2023_(1).pdf?table=block&id=26ee16bb-a140-8071-872b-f3b0b3fc5416&spaceId=c8f37012-1ccf-4d83-87c7-b308b417ebea&expirationTimestamp=1757880000000&signature=HRsPzka2uxOTA8o-ry5D2NMrNmOuBg1uFEKdBSBHXFQ&downloadName=Human+Ecology+Essay+2023+%281%29.pdf" }
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


