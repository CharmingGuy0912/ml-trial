import {format, isValid, parse} from 'date-fns'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {forwardRef, useCallback, useEffect, useState} from 'react'
import {Rifm} from 'rifm'

import useTranslation from '@/hooks/use-translation'

import messages from './messages'

const FORMAT = 'dd.MM.yyyy'
const FORMAT_MESSAGE_KEY = FORMAT.toLowerCase()
  .replaceAll(/[^a-z]/gu, '')
  .toLowerCase()
const DELIMITER_INDICES = [...FORMAT.matchAll(/\./gu)].map(match => match.index)

const maskAppend = input => {
  if (DELIMITER_INDICES.includes(input.length)) {
    return `${input}.`
  }

  return input
}

const maskReplace = input => input.replaceAll('Z', '0')

const maskFormatPrependZeros = (input, wip) => {
  let output = wip

  if (output.length === DELIMITER_INDICES[0] - 1) {
    output = `Z${output}`
  }

  if (
    output.length === DELIMITER_INDICES[1] - 1 &&
    output[DELIMITER_INDICES[0]] === '.'
  ) {
    // Get sliceIndex by removing one from index for the delimiter and one for missing zero
    // eslint-disable-next-line no-magic-numbers
    const sliceIndex = DELIMITER_INDICES[1] - 2
    output = `${output.slice(0, sliceIndex)}Z${output.slice(sliceIndex)}`
  }

  return output
}

const maskFormat = input => {
  const digits = input.match(/\d/gu) ?? []
  let output = digits
    .reduce((acc, digit, index) => {
      if (
        index === DELIMITER_INDICES[0] ||
        index === DELIMITER_INDICES[1] - 1
      ) {
        return `${acc}.${digit}`
      }
      return `${acc}${digit}`
    }, '')
    .substr(0, FORMAT.length)

  if (input.endsWith('.')) {
    output = maskFormatPrependZeros(input, output)

    // istanbul ignore else
    if (DELIMITER_INDICES.includes(output.length)) {
      output += '.'
    }
  }

  return output
}

const DateInput = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('')
  const placeholder = useTranslation(messages[FORMAT_MESSAGE_KEY] ?? '-')

  const resetInputValue = useCallback(() => {
    try {
      setInputValue(format(props.value, FORMAT))
    } catch (error) {
      // Noop
    }
  }, [setInputValue, props.value])

  const update = useCallback(
    value => {
      const newDate = parse(value, FORMAT, new Date())

      if (isValid(newDate)) {
        props.onChange(newDate)
      } else {
        resetInputValue()
      }
    },
    [props.onChange, resetInputValue]
  )

  const onBlur = useCallback(
    event => {
      update(event.target.value)
      props.onBlur()
    },
    [update, props.onBlur]
  )

  const onKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        update(event.target.value)
        event.target.blur()
        props.onSubmit()
      }
    },
    [update, props.onSubmit]
  )

  useEffect(() => {
    resetInputValue()
  }, [props.value])

  return (
    <Rifm
      mask={inputValue.length >= FORMAT.length}
      value={inputValue}
      onChange={setInputValue}
      format={maskFormat}
      replace={maskReplace}
      append={maskAppend}
    >
      {({onChange, value}) => (
        <input
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={props['aria-label']}
          onFocus={props.onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="
            w-[75px] rounded-sm transition-[outline-color,background-color]
            bg-transparent font-bold text-center
            outline-transparent focus-visible:bg-silver focus-visible:outline
            focus-visible:outline-1 focus-visible:outline-gray-medium focus-visible:outline-offset-0
          "
        />
      )}
    </Rifm>
  )
})

DateInput.displayName = 'DateInput'

DateInput.propTypes = {
  'aria-label': PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

DateInput.defaultProps = {
  'aria-label': null,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onSubmit: noop,
  value: null
}

export default DateInput
