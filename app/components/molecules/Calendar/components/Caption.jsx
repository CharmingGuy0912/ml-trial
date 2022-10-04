import classNames from 'classnames'
import {eachYearOfInterval, setMonth, setYear} from 'date-fns'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import {memo, useMemo} from 'react'
import {useDayPicker, useNavigation} from 'react-day-picker'
import {useIntl} from 'react-intl'

import ComboBox from '@/components/atoms/ComboBox'
import ArrowBackIosIcon from '@/components/atoms/Icon/ArrowBackIos'

import messages from '../messages'

const BUTTON_CLASSES = 'p-2 text-gray-medium hover:text-gray-dark transition'

const MONTHS_A_YEAR = 12

const Caption = ({displayMonth}) => {
  const {formatMessage} = useIntl()
  const {previousMonth, nextMonth} = useNavigation()
  const {fromDate, locale, toDate, onMonthChange} = useDayPicker()

  const monthOptions = useMemo(
    () => range(MONTHS_A_YEAR).map(value => ({value})),
    []
  )
  const monthValue = monthOptions.find(
    option => option.value === displayMonth.getMonth()
  )

  const yearOptions = useMemo(
    () =>
      eachYearOfInterval({end: toDate, start: fromDate}).map(year => ({
        value: year.getFullYear()
      })),
    [fromDate.getFullYear(), toDate.getFullYear()]
  )
  const yearValue = yearOptions.find(
    option => option.value === displayMonth.getFullYear()
  )

  return (
    <div className="flex items-center">
      <button
        aria-label={formatMessage(messages.prevMonth)}
        className={classNames('mr-auto', BUTTON_CLASSES)}
        onClick={() => onMonthChange(previousMonth)}
      >
        <ArrowBackIosIcon className="text-lg" />
      </button>

      <ComboBox
        aria-label={formatMessage(messages.selectMonth)}
        getOptionLabel={option => locale.localize.month(option.value)}
        isSearchable={false}
        onChange={option => onMonthChange(setMonth(displayMonth, option.value))}
        options={monthOptions}
        placeholder={formatMessage(messages.selectMonth)}
        value={monthValue}
        className="specific:w-32"
      />

      <ComboBox
        aria-label={formatMessage(messages.selectYear)}
        getOptionLabel={option => String(option.value)}
        isSearchable={false}
        onChange={option => onMonthChange(setYear(displayMonth, option.value))}
        options={yearOptions}
        placeholder={formatMessage(messages.selectYear)}
        value={yearValue}
        className="specific:w-24 ml-1"
      />

      <button
        aria-label={formatMessage(messages.nextMonth)}
        className={classNames('ml-auto', BUTTON_CLASSES)}
        onClick={() => onMonthChange(nextMonth)}
      >
        <ArrowBackIosIcon className="text-lg rotate-180" />
      </button>
    </div>
  )
}

Caption.propTypes = {
  displayMonth: PropTypes.instanceOf(Date).isRequired
}

export default memo(Caption)
