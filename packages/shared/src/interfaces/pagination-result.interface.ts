export interface IPaginationResult<Entity> {
  data: Entity[]
  meta: {
    total: number
    lastPage: number
    currentPage: number
    totalPerPage: number
    prevPage: number | null
    nextPage: number | null
  }
}
