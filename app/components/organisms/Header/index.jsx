import {faker} from '@faker-js/faker'
import {Link} from '@tanstack/react-location'
import classNames from 'classnames'
import React from 'react'

import DnsIcon from '@/components/atoms/Icon/Dns'
import NotificationsIcon from '@/components/atoms/Icon/Notifications'
import PermContactCalendarIcon from '@/components/atoms/Icon/PermContactCalendar'
import SearchIcon from '@/components/atoms/Icon/Search'
import Navigation from '@/components/molecules/Navigation'
import TeamSelect from '@/components/molecules/TeamSelect'

import logo from './logo_dummy.svg'

const ICON_CLASSNAMES = 'text-2xl cursor-pointer'
const USER = 'JD'
const OPTIONS = [
  {isDisabled: false, label: 'Team A', value: 'teamA'},
  {isDisabled: false, label: 'Team B', value: 'teamB'}
]

const Header = () => (
  <div className="bg-white shadow flex justify-between z-50">
    <Link
      className="w-[5.625rem] flex items-center justify-center min-w-[50px]"
      to="/"
    >
      <img className="h-8" src={logo} alt="Logo" />
    </Link>
    <div className="flex-1 text-white relative">
      <div
        className="
          absolute top-0 bottom-0 right-[100%] w-[8px] pointer-events-none overflow-hidden
          before:absolute before:inset-0 before:translate-x-[8px]
          before:shadow-[0_0_8px_0_rgba(0,0,0,0.07),0_1px_1px_0_rgba(0,0,0,0.14)]
        "
      />
      <Navigation
        settings={
          <div
            className="
              flex justify-start lg:justify-end items-center justify-self-start flex-1 gap-3
              mt-0.5 mb-1.5 mx-[26px] order-2 lg:order-3
            "
          >
            <DnsIcon className={ICON_CLASSNAMES} />
            <PermContactCalendarIcon className={ICON_CLASSNAMES} />
            <div className="relative">
              <NotificationsIcon className={ICON_CLASSNAMES} />
              <div
                className="
                  bg-silver shadow h-3 w-3 text-primary text-xs
                  flex items-center justify-center
                  rounded-full absolute top-0 right-0 -mr-1 -mt-1
                "
              >
                {faker.datatype.number({max: 9, min: 1})}
              </div>
            </div>
            <div
              className="
                h-7 w-7 pb-px font-heading-small-caps
                flex justify-center items-center
                border rounded-full border-white
                select-none hover:cursor-pointer
              "
            >
              {USER}
            </div>
          </div>
        }
        cta={
          <div className="flex-1 mx-[26px] mt-0.5 w-full order-1">
            <div className="text-gray-dark flex items-center justify-start gap-3">
              <TeamSelect
                placeholder={OPTIONS[0].label}
                options={OPTIONS}
                value={OPTIONS[0]}
              />
              <SearchIcon
                className={classNames(ICON_CLASSNAMES, 'text-white')}
              />
            </div>
          </div>
        }
      />
    </div>
  </div>
)

export default React.memo(Header)
