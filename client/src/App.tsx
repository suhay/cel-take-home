import { ToastContainer } from 'react-toastify'
import { EventList } from './Events/EventList'
import { NewEvent } from './Events/NewEvent'
import { useEvents } from './Events/useEvents'
import './index.css'

export function App() {
  const { events, refetch } = useEvents()

  return (
    <div className='max-w-7xl mx-auto p-8 text-center relative z-10'>
      <div className='flex justify-center items-center gap-8 mb-8'></div>

      <h1 className='text-5xl font-bold my-4 leading-tight'>CEL Events</h1>

      <h2 className='text-2xl font-bold my-4 leading-tight'>Add New Event</h2>
      <NewEvent refetch={refetch} />

      <h2 className='text-2xl font-bold my-4 leading-tight'>This Week's Events</h2>
      <EventList events={events.Su} label='Sunday' />
      <EventList events={events.Mo} label='Monday' />
      <EventList events={events.Tu} label='Tuesday' />
      <EventList events={events.We} label='Wednesday' />
      <EventList events={events.Th} label='Thursday' />
      <EventList events={events.Fr} label='Friday' />
      <EventList events={events.Sa} label='Saturday' />
      <ToastContainer />
    </div>
  )
}

export default App
