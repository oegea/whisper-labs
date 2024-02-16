/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/SKeH0DhlEko
 */
import {useEffect, useRef, useState} from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import {record} from "@/lib/recording"
import { Button } from "@/components/ui/button"

export function MeetingRecording({meeting}) {

  const [transcription, setTranscription] = useState([]);
  const [paused, setPaused] = useState(false);

  const timing = useRef({
    start: Date.now(),
    end: (meeting.totalTime * 60 * 1000) + Date.now()
  });

  useEffect(() => {
    if (paused) return; 
    record(onTranscription);
  }, [transcription, paused])

  const onTranscription = (text) => {
    const newTranscription = transcription.slice();
    newTranscription.unshift({
      text: text,
      time: new Date(Date.now() - timing.current.start).toISOString().substr(11, 8)
    });
    setTranscription(newTranscription);
  }
  return (
    (<main className="flex flex-col lg:flex-row gap-6 p-6 justify-center">
      <div className="flex flex-col gap-6 w-full lg:w-1/2 rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 w-full max-w-md p-8 space-y-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{meeting.title}</h1>
        </header>
        <div className="flex flex-col gap-4">
          {meeting.goals.map((goal, index) => (
            <div key={index} className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Goal {index + 1}: {goal.description}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Time: {goal.time} minutes</p>
            </div>
          ))}

          {meeting.goals.length === 0 && (
            <p className="text-lg font-medium">Oh no! No goals have been set for this meeting.</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <p className="text-lg font-medium">Timing: {Math.floor((timing.current.end - Date.now()) / 1000 / 60)} min / {meeting.totalTime} min</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full lg:w-1/2 rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 w-full max-w-md p-8 space-y-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Meeting Transcription</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Real-time transcription of the ongoing meeting</p>
          <Button
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume" : "Pause"}
          </Button>
        </header>
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="p-4 text-sm">
            {transcription.map((transcript, index) => (
              <p key={index} className="mt-4 leading-7">[{transcript.time}] - {transcript.text}</p>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>)
  );
}


function ClockIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 16 14" />
    </svg>)
  );
}
