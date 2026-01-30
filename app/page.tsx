import { FaEnvelope, FaHtml5, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { BsCursorFill } from "react-icons/bs";
import { FaNpm } from "react-icons/fa";
import { SiC } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiAssemblyscript } from "react-icons/si";

import Slideshow from "@/components/resume/slide-show";
import SkillsGrid from "@/components/resume/skills-grid"; // Client component for interactivity
import ExperienceGrid from "@/components/resume/experience-grid";
import FunFacts from "@/components/resume/fun-facts";
import { calculateAge } from "@/lib/functions";

export default function ResumePage() {
  const logosMain = [
    { name: "HTML", icon: FaHtml5, color: "#E34C26" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572b6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    { name: "JS", icon: FaJsSquare, color: "#F0DB4F" },
    { name: "TS", icon: BiLogoTypescript, color: "#3178c6" },
    { name: "React", icon: FaReact, color: "#61DBFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Node.js", icon: FaNode, color: "#68a063" },
    { name: "SQL", icon: SiMysql, color: "#00758F" },
    { name: "MongoDB", icon: BiLogoMongodb, color: "#47a248" },
    { name: "GitHub", icon: FaGithub, color: "#F1502F" },
    { name: "Cursor AI", icon: BsCursorFill, color: "#ffffff" },
    { name: "NPM libraries", icon: FaNpm, color: "#CB3837" },
    { name: "C", icon: SiC, color: "#00599C" },
    { name: "Android", icon: FcAndroidOs, color: "#3DDC84" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "Assembly Script", icon: SiAssemblyscript, color: "#ffffff" },
  ];

  const projects = [
    {
      title: "My Portfolio",
      description:
        "A portfolio website built with Next.js and Tailwind CSS. It showcases my projects and skills.",
      tech: ["Next.js", "Tailwind CSS", "React", "TypeScript", "SQLite"],
      link: "#",
    },
  ];

  const experience = [
    {
      title: "React Native developer",
      place: "Aquantom, Ra'anana, Israel",
      period: "2025 - 2025",
      description:
        "Key member of the core team responsible for developing the frontend of the application from the ground up. Converted figma designs into a functional application, exercising creative freedom in the page development process.",
    },
  ];

  const education = [
    {
      title: "Full Stack development",
      place: "IITC, Ramat Gan, Israel",
      period: "2024 - 2025",
      description: `An intensive 8 months bootcamp, part of ״לוחמים להייטק״ program. The bootcamp covered a wide range of technologies, including React Node.js, TypeScript, MongoDB, and more.`,
    },
    {
      title: "Software Engineering - Technician Diploma studies",
      place: "Gymenasia Re-alit, Rishon Le-Zion, Israel",
      period: "2019 - 2020",
      description: `Graduated with honors. Deffered my military service due to my studies in כיתה י׳ג. `,
    },
    {
      title: "High School",
      place: "Gymenasia Re-alit, Rishon Le-Zion, Israel",
      period: "2016 - 2019",
      description: `Graduated with honors. Majored 10 units in Computer Science and 5 units in Physics.`,
    },
  ];

  const militaryService = [
    {
      title: "Career Military Service (NCO)",
      place: "Unit 846, Giva'ati Brigade, IDF",
      period: "2023 - 2023",
      description: `Instructed and mentored junior soldiers.`,
    },
    {
      title: "NAMER's electronic system feild technician",
      place: "Unit 846, Giva'ati Brigade, IDF",
      period: "2020 - 2023",
      description: `Managed and maintained electronic systems for 'Namer' armored vehicles. Specialized in diagnosing and resolving complex technical issues. .שירתתי על תקן לוחם`,
    },
  ];

  const funFacts = [
    "I have 36 funko pop figures, 26 rubber ducks, 16 lego sets and I also collecting Kinder's chocolates eggs.",
    "In my free time I'm working out in calisthenics. ",
    `I'm a big fan of the TV show "South Park" and the whole Marvel cinematic universe.`,
    "I first started learning programming in my 7th grade, and I'm aspiring to keep learning and growing as a developer.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {`Liraz :)`}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-2">Full Stack Developer</p>
            <p className="text-gray-400 mb-8">
              My name is Liraz Bar-Nir, a {calculateAge()} years old from Rishon
              Le-Zion, Israel. <br />
              I'm a Full Stack Developer and I'm Passionate about building
              modern web applications with clean code and excellent user
              experiences.
              <br /> my email:{" "}
              <span className="text-blue-400">lirazbarnir15@gmail.com</span>
              <br />
              phone: <span className="text-green-400">+972525724163</span>
            </p>

            <div className="flex gap-4 mb-8">
              <a
                href="https://github.com/lirazbarney"
                target="_blank"
                // rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaGithub size={20} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/lirazbarnir"
                target="_blank"
                // rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <FaLinkedin size={20} />
                LinkedIn
              </a>
              <a
                href="mailto:lirazbarnir15@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <FaEnvelope size={20} />
                Email me
              </a>
              <a
                href="tel:+972525724163"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <FaPhone size={20} />
                Call me
              </a>
            </div>

            {/* TODO: Add resume download */}
            <a
              href="/your-resume.pdf"
              download
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Download Resume
            </a>
          </div>

          <div className="flex justify-center">
            <Slideshow className="max-h-[533px] max-w-[400px]  bg-transparent" />
          </div>
        </div>
      </section>

      {/* Skills Section - Using client component for hover effects */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>

        <SkillsGrid logos={logosMain} />
      </section>

      {/* Projects Section - Static, no client needed */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-blue-500/10 border border-gray-700 hover:border-blue-500/50"
            >
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceGrid
        type="experience"
        title="Work Experience"
        items={experience}
      />

      <ExperienceGrid type="education" title="Education" items={education} />

      <ExperienceGrid
        type="militaryService"
        title="Military Service"
        items={militaryService}
      />

      <FunFacts facts={funFacts} />

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 text-center border border-blue-500/30">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:lirazbarnir15@gmail.com"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Get In Touch
            </a>
            {/* TODO: Add resume download */}
            <a
              href="/your-resume.pdf"
              download
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors border border-gray-600"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-400">
          <p>
            © 2026 Liraz Bar-Nir. Built with Next.js & React with SQLite
            database and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
