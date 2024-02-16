/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/nvJVjxVmSqf
 */
import {useState} from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MeetingForm({onSubmit}) {
  const [meetingTitle, setMeetingTitle] = useState('')
  const [meetingGoals, setMeetingGoals] = useState([])
  return (
    (<main
      className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Configure a New Meeting
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={ (e) => {
          e.preventDefault();
          onSubmit({ title: meetingTitle, goals: meetingGoals, totalTime: meetingGoals.reduce((acc, goal) => acc + parseInt(goal.time), 0)});
        }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="meeting-title">Meeting Title</Label>
              <Input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                id="meeting-title"
                name="meeting-title"
                placeholder="Enter the meeting title"
                required
                type="text"
                value = {meetingTitle}
                onChange = {(e) => setMeetingTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="meeting-goals">Meeting Goals</Label>
              <div className="space-y-4">
                {meetingGoals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input className="flex-1" id={`goal-${index + 1}`} placeholder="Goal Description" type="text" value={goal.description} onChange={(e) => {
                      const goals = meetingGoals.slice();
                      goals[index].description = e.target.value;
                      setMeetingGoals(goals);
                    }} />
                    <Input className="w-24" id={`time-${index + 1}`} placeholder="Time (mins)" type="number" value={goal.time} onChange={(e) => {
                      const goals = meetingGoals.slice();
                      goals[index].time = e.target.value;
                      setMeetingGoals(goals);
                    }} />
                    <Button className="ml-2" variant="outline" onClick={() => {
                      const goals = meetingGoals.slice();
                      goals.splice(index, 1);
                      setMeetingGoals(goals);
                    }}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button className="mt-2" variant="outline" onClick={(e) => {
                  e.preventDefault();
                  const goals = meetingGoals.slice();
                  goals.push({ description: '', time: 0 });
                  setMeetingGoals(goals);
                }}>
                  Add Goal
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="total-duration">Total Duration</Label>
              <Input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-200 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:border-gray-800"
                disabled
                id="total-duration"
                name="total-duration"
                placeholder="Calculated automatically"
                type="text" 
                value = {meetingGoals.reduce((acc, goal) => acc + parseInt(goal.time), 0)} />
            </div>
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-800"
              type="submit">
              Start the meeting
            </Button>
          </div>
        </form>
      </div>
    </main>)
  );
}