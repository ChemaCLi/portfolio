import React from 'react';
import { X } from 'lucide-react';
import { Job } from '../data/portfolio-data';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  technology?: string;
}

export const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, jobs, technology }) => {
  if (!isOpen) return null;

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate + "-01").toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    const end = endDate === "2025-07" ? "Present" : new Date(endDate + "-01").toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    return `${start} - ${end}`;
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate + "-01");
    const end = endDate === "2025-07" ? new Date() : new Date(endDate + "-01");
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 border border-red-500/30 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {technology ? `${technology} Experience` : 'Job Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">{job.company}</h3>
                    <p className="text-white font-medium">{job.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">{formatDateRange(job.startDate, job.endDate)}</p>
                    <p className="text-gray-400 text-xs">Duration: {calculateDuration(job.startDate, job.endDate)}</p>
                  </div>
                </div>
                
                {/* Responsibilities */}
                <div className="mb-4">
                  <h4 className="text-purple-400 font-medium mb-2">Key Responsibilities & Achievements:</h4>
                  <ul className="space-y-1">
                    {job.description.map((desc, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-red-400 mr-2 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-purple-400 font-medium mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className={`px-3 py-1 rounded-full text-sm border ${
                          tech === technology 
                            ? 'bg-red-900/50 text-red-300 border-red-500/50 ring-1 ring-red-500/30' 
                            : 'bg-gray-700 text-gray-300 border-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};