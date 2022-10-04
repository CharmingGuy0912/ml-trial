/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import PropTypes from 'prop-types'

import AudioIcon from '@/components/atoms/Icon/Audio'
import ImageIcon from '@/components/atoms/Icon/Image'
import MyLocationIcon from '@/components/atoms/Icon/MyLocation'
import PersonIcon from '@/components/atoms/Icon/Person'
import ScheduleIcon from '@/components/atoms/Icon/Schedule'
import TextIcon from '@/components/atoms/Icon/Text'
import VideoIcon from '@/components/atoms/Icon/Video'

const ExerciseCard = ({exercise, index}) => {
  const {
    description,
    duration,
    files,
    guestParticipantsCount,
    participantsCount,
    title
  } = exercise
  return (
    <div>
      <div className="pt-1.5">
        <span className="font-bold text-base leading-[18px]">
          {index}. <span className="font-medium">{title}</span>
        </span>
        <div className='flex justify-between mt-1 text-xs font-bold'>
          <div className='flex'>
            <div className='flex gap-[3px] rounded-l-full h-[18px] bg-white items-center justify-center pr-1.5 pl-1 shadow'><ScheduleIcon />{duration}</div>
            <div
              className="rounded-r-full h-[18px] shadow pr-1.5 pl-1 flex gap-0.5 bg-white items-center justify-center"
            >
              <PersonIcon />
              {participantsCount}+{guestParticipantsCount}
            </div>
          
          </div>
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
        </div>
        <div className='mt-2 flex gap-1'>
          <MyLocationIcon className='w-3 h-3' /><p className='w-fit font-medium text-xs'>{description}</p>
        </div>
      </div>
      <div className="w-auto h-[1px] mt-2 bg-black bg-opacity-10 -ml-[13px] -mr-[13px]" />
    </div>
  )
}

ExerciseCard.propTypes = {
  description: PropTypes.string,
  duration: PropTypes.number,
  files: PropTypes.array,
  guestParticipantsCount: PropTypes.number,
  participantsCount: PropTypes.number,
  title: PropTypes.string,
}

ExerciseCard.defaultProps = {
  description: '',
  duration: 0,
  files: [],
  guestParticipantsCount: 0,
  participantsCount: 0,
  title: '',
}

export default ExerciseCard
