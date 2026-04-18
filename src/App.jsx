import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, FileArchive, Network, Mail, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

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
      <h1 className="text-5xl font-bold tracking-wide sm:text-6xl">
        Travis Bresa
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Ethnographer. Systems Thinker. Explorer.
      </p>
      <a
        href="mailto:Travis.bresa@gmail.com"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900"
      >
        <Mail className="h-4 w-4" /> Get in touch
      </a>
    </div>
  </Section>
);

const ProjectCard = ({ title, description, onOpen, imageUrl }) => (
  <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
    <div className="h-48 w-full bg-slate-100">
      <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
    </div>
    <div className="flex flex-1 flex-col justify-between p-4">
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <button
        onClick={onOpen}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900"
      >
        View more <ExternalLink className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const Popout = ({
  isOpen,
  onClose,
  title,
  extraLinks,
  coverImage,
  caption,
  context,
  insights,
}) => (
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
          className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b px-4 py-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-auto bg-slate-50 p-6">
            {coverImage && (
              <div className="text-center">
                <img
                  src={coverImage}
                  alt={title}
                  className="mx-auto max-h-64 rounded shadow"
                />
                {caption && (
                  <p className="mt-2 text-sm italic text-slate-500">{caption}</p>
                )}
              </div>
            )}

            {context && (
              <div>
                <h3 className="mb-1 font-semibold text-slate-800">Context</h3>
                <p className="whitespace-pre-line text-slate-700">{context}</p>
              </div>
            )}

            {insights && (
              <div>
                <h3 className="mb-1 font-semibold text-slate-800">Insights</h3>
                <p className="whitespace-pre-line text-slate-700">{insights}</p>
              </div>
            )}
          </div>

          {extraLinks && extraLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 border-t bg-slate-100 px-4 py-3">
              {extraLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-900 sm:w-auto"
                >
                  {link.label.toLowerCase().includes("map") && (
                    <Network className="h-4 w-4" />
                  )}
                  {link.label.toLowerCase().includes("reference") && (
                    <FileArchive className="h-4 w-4" />
                  )}
                  {(link.label.toLowerCase().includes("dissertation") ||
                    link.label.toLowerCase().includes("essay") ||
                    link.label.toLowerCase().includes("report")) && (
                    <FileText className="h-4 w-4" />
                  )}
                  Download {link.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const [popout, setPopout] = useState({
    isOpen: false,
    title: "",
    extraLinks: [],
    coverImage: "",
    caption: "",
    context: "",
    insights: "",
  });

  const openPopout = (
    title,
    extraLinks = [],
    coverImage = "",
    caption = "",
    context = "",
    insights = ""
  ) => {
    setPopout({
      isOpen: true,
      title,
      extraLinks,
      coverImage,
      caption,
      context,
      insights,
    });
  };

  const closePopout = () =>
    setPopout({
      isOpen: false,
      title: "",
      extraLinks: [],
      coverImage: "",
      caption: "",
      context: "",
      insights: "",
    });

  return (
    <Section id="projects" className="pt-8">
      <div className="grid gap-6 md:grid-cols-3">
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
              "This research project engages with a unique collective, in a unique environment. My first foray into the world of ethnographic research, it’s a rough first attempt at addressing the question of how emerging technologies impact the way we represent our species ('the Human'). This project was submitted as my dissertation for my Human Sciences degree.",
              "I offer an original ethnography of Vitalia, an intentional community located strategically within Próspera on the Honduran island of Roatan. I originally visited Vitalia only to gain a better understanding of transhumanist imaginaries of the Human, of how biotechnology had been enabling the redefinition of the human body and mind. Indeed these technologies of the self are revealed to extend definitions of the body, adding additional ways to perceive and sense the external world. However, while there, I became fascinated by a second class of technology present: the unique political technology of Próspera.\n\nPróspera meanwhile is an ambitious attempt at creating a decentralised, technology focused society within the borders of Honduras. Its residents enjoy exemption from the civil legal codes followed by everyone else in the country. Its legal infrastructure is set up to create, as they state, “the future we want”, creating a low regulation environment for AI researchers, experimental gene therapy trials and medical tourism. Stepping back reveals however that Próspera creates just as many new borders as its founders claim to eliminate. It overlooks and excludes Honduran indigenous voices, creating an ‘encrypted geography’ in which a newly redefined 'Human' is taking shape."
            )
          }
        />

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
                { label: "Systems Map", url: "/systems-map.pdf" },
              ],
              "/MTS-Map.jpeg",
              "A systems visualisation of the contributing factors to opportunity barriers faced by young migrants, created in Kumo.io.",
              "I led a team to the final of the Map the System Oxford campus competition, a research contest inviting participants to utilise systems mapping to outline a particular problem. This project was important personally, as the child of an immigrant. Barriers to integration fuel intergenerational inequality while also causing society to miss out on considerable human capital.",
              "The powerful tool of systems mapping helps us uncover the feedback loops that sustain inequality. We show that factors underlying this include the difficulty many migrant families face in building what sociologists call 'bridging social capital', ties that facilitate connections with (social, ethnic or class-based) groups other than your own. As we illustrate, children and young migrants are also between contradictory policy areas in the UK, often unable to access education for months after they arrive."
            )
          }
        />

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
              "This essay examined the factors that enabled the emergence of the pandemic, situating it within broader human–environment systems. Drawing on interdisciplinary sources, I explored how social and environmental factors contributed to the crisis.",
              "For many, the question is framed as a debate between 'Natural' and 'Man-made'. However, regardless of the exact 'origin' of SARS-CoV-2, systemic vulnerabilities account for why the virus became a pandemic."
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
      <Analytics />
    </div>
  );
}
