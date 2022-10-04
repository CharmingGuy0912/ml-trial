/* eslint-disable max-lines,sort-keys */
export default [
  {
    label: 'Trainingsplan',
    path: 'training-plan'
  },
  {
    label: 'Training',
    path: 'training',
    children: [
      {
        label: 'Continuous Training',
        path: 'continuous'
      },
      {
        label: 'Fartlek Training',
        path: 'fartlek'
      },
      {
        label: 'Circuit Training',
        path: 'circiut'
      },
      {
        label: 'Interval Training',
        path: 'interval',
        children: [
          {
            label: 'High Intensity',
            path: 'high-intensity'
          },
          {
            label: 'Medium Intensity',
            path: 'medium-intensity'
          },
          {
            label: 'Low Intensity',
            path: 'low-intensity'
          }
        ]
      },
      {
        label: 'Flexibility/Mobility Training',
        path: 'flexibility-mobility'
      },
      {
        label: 'Weight Training',
        path: 'weight'
      },
      {
        label: 'Plyometric Training',
        path: 'plyometric'
      },
      {
        label: 'Speed/Agility/Quickness',
        path: 'speed-agility-quickness'
      }
    ]
  },
  {
    label: 'Games',
    path: 'games',
    children: [
      {
        label: 'Regional League',
        path: 'regional-league'
      },
      {
        label: 'International League',
        path: 'international-league'
      },
      {
        label: 'Friendly games',
        path: 'friendly-games'
      }
    ]
  },
  {
    label: 'Medicine',
    path: 'medicine',
    children: [
      {
        label: 'Injuries',
        path: 'injuries'
      },
      {
        label: 'Treatments',
        path: 'treatments'
      },
      {
        label: 'Analysis',
        path: 'analysis',
        children: [
          {
            label: 'Body Region',
            path: 'body-region'
          },
          {
            label: 'Type of Injury',
            path: 'type-of-injury'
          },
          {
            label: 'Injury Susceptibility',
            path: 'injury-susceptibility'
          },
          {
            label: 'Season Comparison',
            path: 'season-comparison'
          },
          {
            label: 'Availability',
            path: 'availability'
          },
          {
            label: 'Missed Games',
            path: 'missed-games'
          }
        ]
      }
    ]
  },
  {
    label: 'Diagnostics',
    path: 'diagnostics',
    children: [
      {
        label: 'Speed',
        path: 'speed'
      },
      {
        label: 'Endurance',
        path: 'endurance'
      },
      {
        label: 'Body Measurements',
        path: 'body-measurements'
      },
      {
        label: 'Jumping',
        path: 'jumping'
      }
    ]
  },
  {
    label: 'Team',
    path: 'team',
    children: [
      {
        label: 'Top-Players',
        path: 'top-players'
      },
      {
        label: 'Team Assignment',
        path: 'team-assignment'
      },
      {
        label: 'Player Evaluations',
        path: 'player-evaluations'
      }
    ]
  },
  {
    label: 'Philosophy',
    path: 'philosophy',
    children: [
      {
        label: 'About the Team',
        path: 'about-the-team',
        children: [
          {
            label: 'About the Players',
            path: 'players'
          },
          {
            label: 'Achievements',
            path: 'achievements'
          },
          {
            label: 'Goals',
            path: 'goals'
          }
        ]
      }
    ]
  },
  {
    label: 'Administration',
    path: 'administration',
    children: [
      {
        label: 'Players',
        path: 'players'
      },
      {
        label: 'Queries',
        path: 'queries',
        children: [
          {
            label: 'Players',
            path: 'players'
          },
          {
            label: 'Employees',
            path: 'employees'
          }
        ]
      },
      {
        label: 'Task & Objectives',
        path: 'task-objectives',
        children: [
          {
            label: 'Tasks',
            path: 'tasks'
          },
          {
            label: 'Objectives',
            path: 'objectives'
          }
        ]
      },
      {
        label: 'Admin',
        path: 'admin',
        children: [
          {
            label: 'Panel',
            path: 'panel'
          },
          {
            label: 'Analytics',
            path: 'analytics'
          }
        ]
      }
    ]
  }
]
