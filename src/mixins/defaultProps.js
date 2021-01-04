export const defaultActions = {
  noActions: false,
  search: true,
  filter: true,
  create: true,
  edit: true,
  view: true,
  delete: true,
  export: false,
  import: false,
  dateFilter: true,
  refresh: true,
  automaticRefresh: false,
  advancedFiltering: true,
  columnsFilters: true,
  bulkDelete: true,
  bulkEdit: true,
  itemsPerRow: true,
  editLayout: true,
  paginationPreviousNext: true,
};

export const defaultKanbanOptions = {
  scrollSensitivity: 200,
  animation: 200,
  moveList: false,
  moveCard: true,
  fields: [],
  splittingField: '',
  splittingValues: [],
  customListActions: [],
  sortField: '',
  sortOrder: 'DESC'
};