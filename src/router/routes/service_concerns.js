export default [
  {
    path: '/apps/service_concerns',
    name: 'apps-service_concerns',
    component: () => import('@/views/serviceConcerns/index'),
  },
  // {
  //   path: '/apps/eResources/creatResources',
  //   name: 'creatResources',
  //   component: () => import('@/views/eResources/createResources'),
  //   meta: {
  //     pageTitle: 'Creat E Resources',
  //   },
  // },
  // {
  //   path: '/apps/serviceConcerns/edit/:resources_id',
  //   name: 'editServiceConcerns',
  //   component: () => import('@/views/serviceConcerns/editResources'),
  //   meta: {
  //     pageTitle: 'Edit Service Concerns',
  //   },
  // },
]
