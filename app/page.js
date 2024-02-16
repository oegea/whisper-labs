"use client"
import {MeetingForm} from "@/components/meeting-form";
import {MeetingRecording} from "@/components/meeting-recording";
import {useEffect, useState} from 'react'
import { getLocalStorage } from "@/lib/utils";

export default function Home() {

  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    if (getLocalStorage().getItem("openai-key") === null || getLocalStorage().getItem("openai-key") === ""){
      window.href = "/configuration";
      return null
    }
  }, []);

  const onNewMeeting = (meeting) => {
    setMeeting(meeting);
  }

  return (
    <>
      {meeting === null ? <MeetingForm onSubmit={onNewMeeting}/> : <MeetingRecording meeting={meeting}/>}
    </>
  );
}
