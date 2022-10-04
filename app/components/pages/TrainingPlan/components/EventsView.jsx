import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {useMemo} from 'react'

import EventCard from './EventCard'

const weekDays = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA']

const EventsView = props => {
  const {date, events} = props

  const sortedEvents = useMemo(() => {
    return (
      Array(7)
        .fill(0)
        // eslint-disable-next-line id-length
        .map((_, ind) => {
          const date1 = new Date(date).addDays(ind)
          return events
            ?.filter(event => new Date(event?.startDate).sameDay(date1))
            .sort((eventA, eventB) => {
              // eslint-disable-next-line no-unused-expressions
              return eventA?.startDate - eventB?.startDate
            })
        })
    )
  }, [date, events])

  return (
    <div
      className={`h-full grid grid-cols-[${sortedEvents
        ?.map(dayEventList =>
          // eslint-disable-next-line no-ternary
          dayEventList.length ? '1.3fr' : '1fr'
        )
        .join(',')}]`}
      style={{
        gridTemplateColumns: sortedEvents
          ?.map(dayEventList =>
            // eslint-disable-next-line no-ternary
            dayEventList.length ? '1.3fr' : '1fr'
          )
          .join(' ')
      }}
    >
      {Array(7)
        .fill(0)
        // eslint-disable-next-line id-length
        .map((_, ind) => {
          const curDate = new Date(date).addDays(ind)
          return (
            <div
              key={`event-day-${ind}`}
              className="border-solid border overflow-auto"
            >
              <div className="p-1 sticky top-0 shadow bg-white">
                <div
                  className={`top-1 h-1 mb-2 rounded ${
                    // eslint-disable-next-line no-ternary
                    curDate.sameDay(new Date()) ? 'bg-[#0A3064]' : 'bg-white'
                  }`}
                />
                <p className="text-sm mb-2">
                  <b>{weekDays[curDate.getDay()]}</b>&nbsp;
                  {format(curDate, 'dd.MM')}
                </p>
              </div>

              <div className="m-2">
                {sortedEvents[ind]?.map((dayEvent, eventId) => (
                  <EventCard
                    key={`event-${format(curDate, 'dd.MM')}-${eventId}`}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...dayEvent}
                  />
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}

EventsView.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.arrayOf(PropTypes.object)
}

EventsView.defaultProps = {
  date: new Date(),
  events: []
}

export default EventsView
