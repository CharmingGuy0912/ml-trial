import React, {useState} from 'react'
import {FormattedMessage} from 'react-intl'

import Button from '@/components/atoms/Button'
import SaveIcon from '@/components/atoms/Icon/Save'
import DateCyclePicker from '@/components/molecules/DateCyclePicker'
import Counter from '@/components/organisms/Counter'

import messages from './messages'

const DATE = new Date('2022-03-21')

const HomePage = () => {
  const [date, setDate] = useState(DATE)

  return (
    <div className="flex-1 flex flex-col justify-start p-6 bg-gradient-to-b bg-gradient-gray">
      <div className="mb-6">
        <h2 className="font-heading-large mb-1">
          Components you&apos;ll need:
        </h2>

        <div className="mb-1">
          <DateCyclePicker value={date} onChange={setDate} />
        </div>

        <div className="mb-1">
          <Button startIcon={<SaveIcon />}>
            Save
          </Button>
        </div>

        <div className="mb-1">
          <FormattedMessage {...messages.someMessage} />
        </div>
      </div>


      <div className="mb-6">
        <h2 className="font-heading-large mb-1">
          Random example component:
        </h2>

        <Counter />
      </div>
    </div>
  )
}

export default React.memo(HomePage)
