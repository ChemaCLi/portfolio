import { TechnologyTimeline } from './components/TechnologyTimeline';
import { ExperienceChart } from './components/ExperienceChart';
import { GalagaGame } from './components/GalagaGame';
import { projects, education, socialLinks, jobs } from './data/portfolio-data';
import { useState } from 'react';

export default function App() {
  // this stores the jobs that have their detail expanded
  const [openedJobs, setOpenedJobs] = useState<{ [key: string]: boolean }>({});

  // If the job detail is opened, it will be closed, and vice versa
  const toggleJobDetail = (jobId: string) => {
    setOpenedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  // If the job detail is opened, it will be closed, and vice versa
  const isJobDetailOpened = (jobId: string) => {
    return openedJobs[jobId] || false;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-black via-gray-900 to-black border-b border-red-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-6 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-red-400 to-yellow-400 bg-clip-text text-transparent">
                José María Chico López
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg blur opacity-20"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-medium">JavaScript FullStack Developer</p>
            <p className="text-red-400 text-lg">clz.chema@gmail.com</p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-4">
              {Object.entries({
                'Dev.to': socialLinks.devto,
                'Twitter': socialLinks.twitter,
                'LinkedIn': socialLinks.linkedin,
                'Instagram': socialLinks.instagram,
                'GitHub': socialLinks.github
              }).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-red-900 border border-red-500/30 rounded-lg transition-colors text-sm"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-red-400 mb-6 border-b border-red-500/30 pb-2">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-yellow-400">Professional</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate JavaScript developer who loves working across the full stack - from backend services to frontend web applications and mobile development. I'm deeply committed to fostering team collaboration and building strong professional relationships.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I enjoy programming as a hobby, staying current with tech blogs and newsletters, writing posts on dev.to, and actively participating in technology events. I'm particularly proud to be the co-founder of <a href="https://devu.community" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Devu Community</a>, our local tech community.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-yellow-400">Personal</h3>
              <p className="text-gray-300 leading-relaxed">
                Beyond coding, I'm passionate about digital and traditional illustrations, reading, and writing fiction. I love listening to music and playing my favorite songs. I also enjoy repairing old electronics devices - there's something deeply satisfying about bringing old technology back to life.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I'm naturally curious and creative, always eager to learn new things and explore different perspectives.
              </p>
            </div>
          </div>
          
          {/* Languages */}
          <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-yellow-400 mb-4">Languages</h3>
            <div className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white">Spanish (Native)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-white">English (B1 Level)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-red-400 mb-6 border-b border-red-500/30 pb-2">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition-colors">
                <h3 className="text-lg font-medium text-white mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-red-400 mb-6 border-b border-red-500/30 pb-2">Professional Experience</h2>
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">{job.position}</h3>
                    <p className="text-yellow-400">{job.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {job.startDate} - {job.endDate === "2025-07" ? "Present" : job.endDate}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {job.description.slice(0, isJobDetailOpened(job.id) ? job.description.length : 3).map((desc, index) => (
                    <p key={index} className="text-gray-300 text-sm">• {desc}</p>
                  ))}
                  {job.description.length > 3 && (
                    <p className="text-gray-400 text-sm italic cursor-pointer" onClick={() => {
                      toggleJobDetail(job.id);
                    }}>
                      {isJobDetailOpened(job.id) ? "(see less)" : "... and more"}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map(tech => (
                    <span 
                    key={tech} 
                    className={`px-3 py-1 rounded-full text-sm border text-gray-400 border-slate-800`}
                  >
                      {tech}
                    </span>
                  ))}
                  
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-red-400 mb-6 border-b border-red-500/30 pb-2">Education & Certifications</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white">{edu.degree}</h3>
                <p className="text-yellow-400">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Timeline */}
        <section className="mb-16">
          <TechnologyTimeline />
        </section>

        {/* Experience Chart */}
        <section className="mb-16">
          <ExperienceChart />
        </section>

        {/* Galaga Game Section */}
        <section className="mb-16">
          <GalagaGame />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-700">
          <p className="text-gray-400">
            Built with passion for technology and community. Co-founder of{' '}
            <a href="https://devu.community" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">
              Devu Community
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            🎮 Thanks for playing! This Galaga game was made with pure JavaScript and HTML5 Canvas.
          </p>
        </footer>
      </div>
    </div>
  );
}
