import { Event } from './useEvents'

export function EventList({ events, label }: { events: Event[]; label: string }) {
  if (events.length === 0) {
    return <div></div>
  }

  return (
    <div>
      <h3>{label}</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.startTime} for {event.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  )
}
