import { useEffect, useState } from 'react';

export default function ZoneDetailsDrawer({ zone, isOpen, onClose }) {
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);
  const [isRendered, setIsRendered] = useState(false);
  const [animateShow, setAnimateShow] = useState(false);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      // Schedule render state asynchronously to satisfy lint guidelines
      const renderTimer = setTimeout(() => {
        setIsRendered(true);
      }, 0);
      const animateTimer = setTimeout(() => {
        setAnimateShow(true);
      }, 20);
      return () => {
        clearTimeout(renderTimer);
        clearTimeout(animateTimer);
      };
    } else {
      const animateTimer = setTimeout(() => {
        setAnimateShow(false);
      }, 0);
      const renderTimer = setTimeout(() => {
        setIsRendered(false);
        setExpandedFeatureIndex(null);
      }, 300); // match transition duration
      return () => {
        clearTimeout(animateTimer);
        clearTimeout(renderTimer);
      };
    }
  }, [isOpen]);

  // Handle Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered || !zone) return null;

  const toggleFeature = (idx) => {
    setExpandedFeatureIndex(expandedFeatureIndex === idx ? null : idx);
  };

  // Resolve classification colors
  let categoryColor = 'border-zinc-800 text-zinc-400 bg-zinc-900/50';
  let dotColor = 'bg-zinc-500';
  if (zone.type === 'Core Seeker') {
    categoryColor = 'border-blue-500/20 text-blue-400 bg-blue-500/10';
    dotColor = 'bg-blue-400';
  } else if (zone.type === 'Map / GIS') {
    categoryColor = 'border-green-500/20 text-green-400 bg-green-500/10';
    dotColor = 'bg-green-400';
  } else if (zone.type === 'Provider') {
    categoryColor = 'border-amber-500/20 text-amber-400 bg-amber-500/10';
    dotColor = 'bg-amber-400';
  } else if (zone.type === 'System / Admin') {
    categoryColor = 'border-zinc-500/20 text-zinc-400 bg-zinc-500/10';
    dotColor = 'bg-zinc-400';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          animateShow ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Slide-over container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-lg bg-zinc-950/95 border-l border-zinc-800/80 backdrop-blur-xl shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            animateShow ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="zone-icon">
                {zone.icon}
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  {zone.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColor}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                    {zone.type}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {zone.featureCount} features
                  </span>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200"
              aria-label="Close panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {/* Summary */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/40">
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                Overview
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {zone.summary}
              </p>
            </div>

            {/* Feature Accordions list */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                Written Reference & Features List
              </h3>
              <div className="space-y-3">
                {zone.features.map((feat, index) => {
                  const isExpanded = expandedFeatureIndex === index;
                  return (
                    <div
                      key={index}
                      className={`border rounded-xl transition-all duration-200 ${
                        isExpanded
                          ? 'border-zinc-700 bg-zinc-900/60 shadow-lg'
                          : 'border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-800 hover:bg-zinc-900/30'
                      }`}
                    >
                      {/* Accordion trigger header */}
                      <button
                        onClick={() => toggleFeature(index)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-semibold text-zinc-100 text-sm md:text-base leading-snug pr-4">
                          {feat.title}
                        </span>
                        <svg
                          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-white' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Accordion content */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-zinc-800/40 text-xs md:text-sm text-zinc-400 leading-relaxed">
                          {feat.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800/60 text-center text-xs text-zinc-600 font-medium">
            YouthConnex Reference Framework • Click a feature to toggle details
          </div>
        </div>
      </div>
    </div>
  );
}
