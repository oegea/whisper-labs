"use client"
import {MeetingForm} from "@/components/meeting-form";
import {MeetingRecording} from "@/components/meeting-recording";
import {useState} from 'react'
import { getLocalStorage, getWindow } from "@/lib/utils";

export default function Home() {

  const [meeting, setMeeting] = useState(null);

  if (getLocalStorage().getItem("openai-key") === null || getLocalStorage().getItem("openai-key") === ""){
    getWindow().href = "/configuration";
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
