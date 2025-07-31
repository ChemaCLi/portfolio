import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { technologies, jobs } from '../data/portfolio-data';
import { JobModal } from './JobModal';

export const ExperienceChart: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate experience in months for each technology
  const techExperience = technologies.map(tech => ({
    ...tech,
    months: tech.months.length
  })).sort((a, b) => b.months - a.months);

  const maxMonths = techExperience[0]?.months || 0;

  const getJobsForTechnology = (techName: string) => {
    return jobs.filter(job => job.technologies.includes(techName));
  };

  const formatExperience = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else if (years > 0) {
      return `${years}y`;
    } else {
      return `${remainingMonths}m`;
    }
  };

  const handleBarClick = (techName: string) => {
    setSelectedTech(techName);
    setIsModalOpen(true);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <Icons.Code className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Technology Experience Overview</h3>
        <p className="text-gray-400 text-sm">Accumulated experience sorted by time. Click on bars to see detailed job information.</p>
      </div>

      <div className="space-y-3">
        {techExperience.map(tech => (
          <div key={tech.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-5 h-5 rounded flex items-center justify-center" 
                  style={{ backgroundColor: tech.color }}
                >
                  <div className="text-white opacity-90" style={{ fontSize: '12px' }}>
                    {getIcon(tech.icon)}
                  </div>
                </div>
                <span className={`text-sm font-medium ${tech.highlighted ? 'text-white' : 'text-gray-400'}`}>
                  {tech.name}
                </span>
              </div>
              <span className="text-gray-400 text-xs font-mono">
                {formatExperience(tech.months)}
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-800 rounded-full h-7 overflow-hidden border border-gray-700">
                <button
                  className={`h-full transition-all duration-300 hover:brightness-110 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer transform-gpu ${
                    !tech.highlighted ? 'opacity-40' : ''
                  } relative group`}
                  style={{
                    backgroundColor: tech.color,
                    width: `${(tech.months / maxMonths) * 100}%`,
                    minWidth: '20px'
                  }}
                  onClick={() => handleBarClick(tech.name)}
                  title={`${tech.name} - ${formatExperience(tech.months)} - Click for details`}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  
                  {/* Progress indicator */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.round((tech.months / maxMonths) * 100)}%
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobs={selectedTech ? getJobsForTechnology(selectedTech) : []}
        technology={selectedTech || undefined}
      />
    </div>
  );
};