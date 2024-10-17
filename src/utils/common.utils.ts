import { COMMON_CONSTANT } from 'src/constants/common.constant';

export function makePaginationResponse(
  data: any,
  page: number,
  pageSize: number,
  total: number,
) {
  if (pageSize) {
    const limit = pageSize || COMMON_CONSTANT.DEFAULT_PAGE_SIZE;

    return {
      page: page || COMMON_CONSTANT.DEFAULT_PAGE,
      pageSize: limit,
      totalPage: Math.ceil(total / limit),
      total,
      data,
    };
  }
  return {
    page: COMMON_CONSTANT.DEFAULT_PAGE,
    pageSize: 0,
    totalPage: 1,
    total,
    data,
  };
}
