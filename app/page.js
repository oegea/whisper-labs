"use client"
import {MeetingForm} from "@/components/meeting-form";
import {MeetingRecording} from "@/components/meeting-recording";
import {useEffect, useState} from 'react'
import { getLocalStorage } from "@/lib/utils";

export default function Home() {

  const [meeting, setMeeting] = useState(null);
  const [hasOpenAiKey, setHasOpenAiKey] = useState(false);

  useEffect(() => {
    if (getLocalStorage().getItem("openai-key") !== null && getLocalStorage().getItem("openai-key") !== "")
      setHasOpenAiKey(true)
  }, [])

  const onNewMeeting = (meeting) => {
    setMeeting(meeting);
  }

  if (hasOpenAiKey === false){
    return <p className="text-center">Please configure your OpenAI credentials in order to start a new meeting.</p>
  }

  return (
    <>
      {meeting === null ? <MeetingForm onSubmit={onNewMeeting}/> : <MeetingRecording meeting={meeting}/>}
    </>
  );
}
