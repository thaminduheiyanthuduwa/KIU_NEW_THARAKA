export default [
  {
    header: 'Pages',
  },
  {
    title: 'E Resources',
    route: 'apps-eResources',
    icon: 'MailIcon',
  },
  {
    title: 'Documents',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Library Documents',
        route:  'apps-documents-library_documents',
      },
      {
        title: 'Library Meeting Minutes',
      },
    ],
  },
  {
    title: 'Database UI',
    route: 'apps-databaseUI',
    icon: 'MessageSquareIcon',
  },
  {
    title: 'Library Concerns',
    route: 'apps-library_concerns',
    icon: 'CheckSquareIcon',
  },
  {
    title: 'Book Requirements',
    route: 'apps-book_requirements',
    icon: 'CalendarIcon',
  },
  {
    title: 'Library Resource',
    route: 'apps-library_resource_concerns',
    icon: 'CalendarIcon',
  },
  {
    title: 'Service Concerns',
    route: 'apps-service_concerns',
    icon: 'CalendarIcon',
  },
  {
    title: 'Meetings',
    route: 'apps-meetings',
    icon: 'CalendarIcon',
  },

]
