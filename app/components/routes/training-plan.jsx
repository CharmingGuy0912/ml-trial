import TrainingPlan from '@/components/pages/TrainingPlan/Loadable'

const TRAINING_PLAN_BRANCH_ID = 'training-plan'

const TRAINING_PLAN_ROUTE_IDS = {
  ROOT: 'root',
}

const trainingPlanRoutes = [
  {
    id: TRAINING_PLAN_BRANCH_ID,
    path: 'training-plan',
    children: [
      {
        id: TRAINING_PLAN_ROUTE_IDS.ROOT,
        path: '/',
        element: <TrainingPlan />
      },
      {
        // Add wildcard path here for root's ModalRouter routes
        path: '*',
        element: <TrainingPlan />
      }
    ]
  }
]

export {TRAINING_PLAN_BRANCH_ID, TRAINING_PLAN_ROUTE_IDS}
export default trainingPlanRoutes
