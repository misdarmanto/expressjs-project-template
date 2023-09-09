/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface PaginationDataType {
  count: number
  rows: any[]
}
class Pagination {
  readonly limit: number = 10
  readonly offset: number = 0
  readonly page: number = 0
  constructor(page: number, size: number) {
    this.page = page
    this.limit = size ?? 3
    this.offset = page !== 0 ? page * this.limit : 0
  }

  data(data: PaginationDataType) {
    return {
      total_items: data.count,
      items: data.rows,
      total_pages: Math.ceil(data.count / this.limit),
      current_page: this.page !== 0 ? this.page : 0
    }
  }
}

export { Pagination }
