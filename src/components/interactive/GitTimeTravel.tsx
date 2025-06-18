import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, RotateCcw, FastForward, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'commit' | 'branch' | 'merge' | 'tag';
  message: string;
  author: string;
  hash?: string;
  branch: string;
}

const GitTimeTravel: React.FC = () => {
  const [events] = useState<TimelineEvent[]>([
    {
      id: '1',
      timestamp: new Date('2024-01-01T10:00:00'),
      type: 'commit',
      message: 'Initial commit',
      author: 'John Doe',
      hash: 'a1b2c3d',
      branch: 'main'
    },
    {
      id: '2',
      timestamp: new Date('2024-01-02T14:30:00'),
      type: 'branch',
      message: 'Created feature/login branch',
      author: 'Jane Smith',
      branch: 'feature/login'
    },
    {
      id: '3',
      timestamp: new Date('2024-01-03T09:15:00'),
      type: 'commit',
      message: 'Add login form component',
      author: 'Jane Smith',
      hash: 'e4f5g6h',
      branch: 'feature/login'
    },
    {
      id: '4',
      timestamp: new Date('2024-01-03T16:45:00'),
      type: 'commit',
      message: 'Add form validation',
      author: 'Jane Smith',
      hash: 'i7j8k9l',
      branch: 'feature/login'
    },
    {
      id: '5',
      timestamp: new Date('2024-01-04T11:20:00'),
      type: 'merge',
      message: 'Merge feature/login into main',
      author: 'John Doe',
      hash: 'm1n2o3p',
      branch: 'main'
    },
    {
      id: '6',
      timestamp: new Date('2024-01-05T13:00:00'),
      type: 'tag',
      message: 'Release v1.0.0',
      author: 'John Doe',
      branch: 'main'
    }
  ]);

  const [currentEventIndex, setCurrentEventIndex] = useState(events.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const currentEvent = events[currentEventIndex];
  const visibleEvents = events.slice(0, currentEventIndex + 1);

  const goToEvent = (index: number) => {
    setCurrentEventIndex(Math.max(0, Math.min(events.length - 1, index)));
  };

  const playTimeline = () => {
    setIsPlaying(true);
    // Simulate playback
    const interval = setInterval(() => {
      setCurrentEventIndex(prev => {
        if (prev >= events.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);
  };

  const pauseTimeline = () => {
    setIsPlaying(false);
  };

  const resetTimeline = () => {
    setCurrentEventIndex(0);
    setIsPlaying(false);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'commit': return 'blue';
      case 'branch': return 'green';
      case 'merge': return 'purple';
      case 'tag': return 'orange';
      default: return 'gray';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'commit': return '●';
      case 'branch': return '⑃';
      case 'merge': return '⟲';
      case 'tag': return '🏷️';
      default: return '●';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Git Time Travel</h2>
        <p className="text-gray-300">Navigate through your repository's history</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline Controls */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Time Controls</h3>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-2">
              <Button size="sm" variant="ghost" onClick={resetTimeline}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => goToEvent(currentEventIndex - 1)}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              {isPlaying ? (
                <Button size="sm" onClick={pauseTimeline}>
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={playTimeline}>
                  <Play className="h-4 w-4" />
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => goToEvent(currentEventIndex + 1)}>
                <FastForward className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => goToEvent(events.length - 1)}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Timeline Slider */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Timeline Position</label>
              <input
                type="range"
                min="0"
                max={events.length - 1}
                value={currentEventIndex}
                onChange={(e) => goToEvent(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Start</span>
                <span>Event {currentEventIndex + 1} of {events.length}</span>
                <span>Latest</span>
              </div>
            </div>

            {/* Playback Speed */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Playback Speed</label>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="4">4x</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Timeline Visualization */}
        <div className="lg:col-span-2">
          <Card
            header={
              <h3 className="font-semibold text-white">Repository Timeline</h3>
            }
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>

              <div className="space-y-4">
                <AnimatePresence>
                  {visibleEvents.map((event, index) => {
                    const color = getEventColor(event.type);
                    const icon = getEventIcon(event.type);
                    const isCurrent = index === currentEventIndex;
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: isCurrent ? 1 : 0.6,
                          x: 0,
                          scale: isCurrent ? 1.02 : 1
                        }}
                        className={`relative flex items-start space-x-4 p-3 rounded-lg transition-all ${
                          isCurrent ? `bg-${color}-900/20 border border-${color}-500/30` : ''
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-12 h-12 bg-${color}-600 rounded-full flex items-center justify-center border-4 border-gray-900 text-white font-bold`}>
                          {icon}
                        </div>

                        {/* Event Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-white">{event.message}</h4>
                            <span className="text-xs text-gray-400">
                              {event.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{event.author}</span>
                            <span>{event.branch}</span>
                            {event.hash && (
                              <span className="font-mono bg-gray-800 px-2 py-1 rounded">
                                {event.hash}
                              </span>
                            )}
                          </div>
                        </div>

                        {isCurrent && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2"
                          >
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Current State Info */}
      <Card>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">Current Repository State</h3>
          <p className="text-gray-300">
            Viewing repository as of: <span className="font-mono text-blue-400">
              {currentEvent.timestamp.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Latest event: {currentEvent.message} by {currentEvent.author}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GitTimeTravel;