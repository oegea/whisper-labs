"use client"
import {MeetingForm} from "@/components/meeting-form";
import {MeetingRecording} from "@/components/meeting-recording";
import {useState} from 'react'

export default function Home() {

  const [meeting, setMeeting] = useState(null);

  if (localStorage.getItem("openai-key") === null || localStorage.getItem("openai-key") === ""){
    window.href = "/configuration";
    return null
  }

  const onNewMeeting = (meeting) => {
    setMeeting(meeting);
  }

  return (
    <>
      {meeting === null ? <MeetingForm onSubmit={onNewMeeting}/> : <MeetingRecording meeting={meeting}/>}
    </>
  );
}
