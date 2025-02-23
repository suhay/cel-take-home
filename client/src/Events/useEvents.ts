import React from 'react'

import { DateTime } from 'luxon'

export type Event = {
  id: number
  name: string
  startTime: string
  duration: number
  daysOfWeek: string
}

export type EventBuckets = {
  Su: Event[]
  Mo: Event[]
  Tu: Event[]
  We: Event[]
  Th: Event[]
  Fr: Event[]
  Sa: Event[]
}

export function useEvents() {
  const [events, setEvents] = React.useState<EventBuckets>({
    Su: [],
    Mo: [],
    Tu: [],
    We: [],
    Th: [],
    Fr: [],
    Sa: [],
  })

  const getEvents = async () => {
    const eventsByDays: EventBuckets = {
      Su: [],
      Mo: [],
      Tu: [],
      We: [],
      Th: [],
      Fr: [],
      Sa: [],
    }

    const response = await fetch('/api/getEvents')
    const events = (await response.json()) as { events: Event[] }

    events.events.forEach((event) => {
      event.startTime = DateTime.fromISO(event.startTime).toLocaleString(
        DateTime.TIME_24_WITH_SECONDS,
      )

      event.daysOfWeek.split(',').forEach((day: string) => {
        switch (day) {
          case 'Su':
            eventsByDays.Su.push(event)
            break
          case 'Mo':
            eventsByDays.Mo.push(event)
            break
          case 'Tu':
            eventsByDays.Tu.push(event)
            break
          case 'We':
            eventsByDays.We.push(event)
            break
          case 'Th':
            eventsByDays.Th.push(event)
            break
          case 'Fr':
            eventsByDays.Fr.push(event)
            break
          case 'Sa':
            eventsByDays.Sa.push(event)
            break
        }
      })
    })

    eventsByDays.Su.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.Mo.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.Tu.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.We.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.Th.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.Fr.sort((a, b) => a.startTime.localeCompare(b.startTime))
    eventsByDays.Sa.sort((a, b) => a.startTime.localeCompare(b.startTime))

    setEvents(eventsByDays)
  }

  React.useEffect(() => {
    getEvents()
  }, [])

  return { events, refetch: getEvents }
}
