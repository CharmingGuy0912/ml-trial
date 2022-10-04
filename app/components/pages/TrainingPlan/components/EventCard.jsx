/* eslint-disable max-len */
import PropTypes from 'prop-types'
import {useCallback, useMemo} from 'react'

import AudioIcon from '@/components/atoms/Icon/Audio'
import ImageIcon from '@/components/atoms/Icon/Image'
import PersonIcon from '@/components/atoms/Icon/Person'
import PlaceIcon from '@/components/atoms/Icon/Place'
import TextIcon from '@/components/atoms/Icon/Text'
import UploadIcon from '@/components/atoms/Icon/Upload'
import VideoIcon from '@/components/atoms/Icon/Video'
import EVENT_TYPES, {EVENT_COLORS} from '@/modules/event/results/types'

import ExerciseCard from './ExerciseCard'
import InfoBox from './InfoBox'

const EventCard = props => {
  const {
    exercises,
    files,
    guestParticipantsCount,
    location,
    participantsCount,
    startDate,
    type
  } = props
  const getFormatTime = useCallback(date => {
    const dateF = new Date(date)
    return `${dateF.getHours()}:${dateF.getMinutes()}`
  }, [])

  const bgColor = useMemo(() => {
    const lightness = 'light'
    return `bg-${EVENT_COLORS[type]}-${lightness}`
  }, [type])

  return (
    <div
      className={`bg-gradient-to-b from-${bgColor} to-white px-[13px] pt-2.5 border border-solid border-white rounded`}
    >
      <div className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <InfoBox bgColor={bgColor}>{getFormatTime(startDate)}</InfoBox>
          <div className="font-bold text-xl leading-[18px] text-[#212121] ">
            {type}
          </div>
        </div>
        <div className="flex gap-0.5">
          <InfoBox bgColor={bgColor}>
            <div className="flex items-center">
              {location}
              <PlaceIcon />
            </div>
          </InfoBox>
        </div>
      </div>
      <div className="w-auto h-[1px] mt-2.5 bg-black bg-opacity-10 -ml-[13px] -mr-[13px]" />
      <div className='flex justify-between mt-1'>
        <div
          className="rounded-[100px] h-[18px] shadow pr-1.5 pl-1 flex gap-0.5 bg-white items-center justify-center"
        >
          <PersonIcon />
          {participantsCount}+{guestParticipantsCount}
        </div>
        <div className='flex gap-1'>
          {files.length !== 0 && <div className='bg-white h-[18px] px-[5px] shadow rounded-[100px]'>
            {files.map(file => (
              <>
                {file.type === 'text' && <TextIcon />}
                {file.type === 'image' && <ImageIcon />}
                {file.type === 'audio' && <AudioIcon />}
                {file.type === 'video' && <VideoIcon />}
              </>
            ))}
          </div>
          }
          <div className='w-6 h-[18px] rounded border border-[#BBBBBB] flex items-center justify-center'>
            <UploadIcon />
          </div>
        </div>
      </div>
      <div className="w-auto h-[1px] mt-1 bg-black bg-opacity-10 -ml-[13px] -mr-[13px]" />
      {exercises.map((exercise, index) => (
        <ExerciseCard exercise={exercise} index={index + 1} key={index} />
      ))}
    </div>
  )
}

EventCard.propTypes = {
  exercises: PropTypes.array,
  files: PropTypes.array,
  guestParticipantsCount: PropTypes.number,
  location: PropTypes.string,
  participantsCount: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  type: PropTypes.string
}

EventCard.defaultProps = {
  exercises: [],
  files: [],
  guestParticipantsCount: 0,
  location: '',
  participantsCount: 0,
  startDate: new Date(),
  title: '',
  type: EVENT_TYPES.TRAINING
}

export default EventCard
