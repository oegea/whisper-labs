"use client"
import {MeetingForm} from "@/components/meeting-form";
import {MeetingRecording} from "@/components/meeting-recording";
import {useEffect, useState} from 'react'
import { getLocalStorage } from "@/lib/utils";

export default function Home() {

  const [meeting, setMeeting] = useState(null);

  const onNewMeeting = (meeting) => {
    setMeeting(meeting);
  }

  if (getLocalStorage().getItem("openai-key") === null || getLocalStorage().getItem("openai-key") === ""){
    return <p>Please configure your OpenAI credentials in order to start a new meeting.</p>
  }

  return (
    <>
      {meeting === null ? <MeetingForm onSubmit={onNewMeeting}/> : <MeetingRecording meeting={meeting}/>}
    </>
  );
}
