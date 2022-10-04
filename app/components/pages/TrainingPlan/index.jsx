import React, {useMemo, useState} from 'react'

import Button from '@/components/atoms/Button'
import DateRangeIcon from '@/components/atoms/Icon/DateRange'
import DateCyclePicker from '@/components/molecules/DateCyclePicker'
import ModalRouter from '@/components/molecules/ModalRouter'
import PageHeader from '@/components/molecules/PageHeader'
import {TRAINING_PLAN_MODULE_ID} from '@/components/pages/TrainingPlan/constants'
import {ROUTE_IDS} from '@/components/routes'
import {
  TRAINING_PLAN_BRANCH_ID,
  TRAINING_PLAN_ROUTE_IDS
} from '@/components/routes/training-plan'
import {getPathById} from '@/components/routes/utils'
import useEventResults from '@/hooks/event/use-event-results'
import EventResultsInjector from '@/injectors/event/ResultsInjector'

import EventsView from './components/EventsView'
import messages from './messages'
import createRoutes from './modal-routes'

const BASE_PATH = getPathById([
  ROUTE_IDS.HOME,
  TRAINING_PLAN_BRANCH_ID,
  TRAINING_PLAN_ROUTE_IDS.ROOT
])
const ROUTES = createRoutes(BASE_PATH)

// eslint-disable-next-line func-names
Date.prototype.getFirstDayOfWeek = function () {
  return new Date(this.setDate(this.getDate() - this.getDay() + 1))
}
// eslint-disable-next-line func-names
Date.prototype.getLastDayOfWeek = function () {
  // eslint-disable-next-line no-magic-numbers
  return new Date(this.setDate(this.getDate() - this.getDay() + 7))
}
// eslint-disable-next-line func-names
Date.prototype.sameDay = function (compareDate) {
  return (
    this.getFullYear() === compareDate.getFullYear() &&
    this.getDate() === compareDate.getDate() &&
    this.getMonth() === compareDate.getMonth()
  )
}
// eslint-disable-next-line func-names
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

const TrainingPlan = () => {
  const [date, setDate] = useState(new Date().getFirstDayOfWeek())

  const filterDates = useMemo(() => {
    // eslint-disable-next-line sort-keys
    return {startDate: date, endDate: new Date(date).getLastDayOfWeek()}
  }, [date])

  const isCurrentWeek = useMemo(() => {
    return new Date().getFirstDayOfWeek().sameDay(date)
  }, [date])

  // eslint-disable-next-line no-unused-vars
  const [state, events] = useEventResults({
    id: TRAINING_PLAN_MODULE_ID,
    shouldLoadOnMount: true,
    // eslint-disable-next-line no-use-before-define, sort-keys
    filter: filterDates
  })

  return (
    <ModalRouter base={BASE_PATH} routes={ROUTES}>
      <EventResultsInjector />
      <div className="h-full flex flex-col">
        <PageHeader
          className="relative z-20"
          title={messages.pageTitle}
          leftSlot={
            <div className="flex">
              <div className="mr-2">
                <DateCyclePicker value={date} onChange={setDate} />
              </div>
              <Button
                startIcon={<DateRangeIcon />}
                type={'outlined'}
                isDisabled={isCurrentWeek}
                onClick={() => {
                  setDate(new Date().getFirstDayOfWeek())
                }}
              >
                Heute
              </Button>
            </div>
          }
          rightSlot={
            <div className="flex">
              <div className="mr-2">
                <Button type={'outlined'}>+</Button>
              </div>
              <div>
                <Button type={'outlined'}>Übungen</Button>
              </div>
            </div>
          }
        />

        <div className="grow overflow-auto">
          <EventsView date={date} events={state.entities} />
        </div>
      </div>
    </ModalRouter>
  )
}

export default React.memo(TrainingPlan)
