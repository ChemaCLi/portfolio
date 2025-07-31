import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { technologies, generateTimelineMonths, jobs } from '../data/portfolio-data';
import { JobModal } from './JobModal';

export const TechnologyTimeline: React.FC = () => {
  const timelineMonths = generateTimelineMonths();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getJobsForTechnology = (techName: string) => {
    return jobs.filter(job => job.technologies.includes(techName));
  };

  const formatMonthHeader = (monthStr: string) => {
    const [, month] = monthStr.split('-');
    const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    return monthNames[parseInt(month) - 1];
  };

  const getYearFromMonth = (monthStr: string) => {
    return monthStr.split('-')[0];
  };

  // Group months by year for header
  const yearGroups = timelineMonths.reduce((acc, month) => {
    const year = getYearFromMonth(month);
    if (!acc[year]) acc[year] = [];
    acc[year].push(month);
    return acc;
  }, {} as Record<string, string[]>);

  const handleTechClick = (techName: string) => {
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
        <h3 className="text-lg font-medium text-white">Technology Experience Timeline</h3>
        <p className="text-gray-400 text-sm">Interactive timeline showing when I've worked with each technology. Click on technology names to see job details.</p>
      </div>
      
      <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-700">
        <table className="w-full text-xs">
          {/* Year headers */}
          <thead>
            <tr className="border-b border-gray-700">
              <th className="sticky left-0 bg-gray-900 text-left p-2 w-32 border-r border-gray-700">Technology</th>
              {Object.entries(yearGroups).map(([year, months]) => (
                <th 
                  key={year} 
                  className="text-center p-1 text-yellow-400 border-r border-gray-700 bg-gray-800" 
                  colSpan={months.length}
                >
                  {year}
                </th>
              ))}
            </tr>
            {/* Month headers */}
            <tr className="border-b border-gray-700">
              <th className="sticky left-0 bg-gray-900 p-2 border-r border-gray-700"></th>
              {timelineMonths.map(month => (
                <th key={month} className="text-center p-1 w-6 text-gray-400 bg-gray-800">
                  {formatMonthHeader(month)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {technologies.map(tech => (
              <tr 
                key={tech.name} 
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  !tech.highlighted ? 'opacity-60' : ''
                }`}
              >
                <td className="sticky left-0 bg-gray-900 p-2 border-r border-gray-700" style={{ backgroundColor: '#000', zIndex: 1 }}>
                  <button
                    onClick={() => handleTechClick(tech.name)}
                    className="flex items-center space-x-2 w-full text-left hover:bg-gray-800 rounded p-1 transition-colors cursor-pointer"
                  >
                    <div 
                      className="w-3 h-3 rounded flex items-center justify-center" 
                      style={{ backgroundColor: tech.color }}
                    >
                      <div className="text-white opacity-80" style={{ fontSize: '8px' }}>
                        {getIcon(tech.icon)}
                      </div>
                    </div>
                    <span className={`text-sm ${tech.highlighted ? 'text-white' : 'text-gray-400'}`}>
                      {tech.name}
                    </span>
                  </button>
                </td>
                {timelineMonths.map(month => (
                  <td key={month} className="p-0 w-6 h-8 border-r border-gray-800">
                    {tech.months.includes(month) && (
                      <div 
                        className="w-full h-full opacity-80 hover:opacity-100 transition-opacity cursor-help"
                        style={{ backgroundColor: tech.color }}
                        title={`${tech.name} - ${month}`}
                      ></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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