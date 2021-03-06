
/**
 * @function calculateLimitAndOffset
 * @param {number} page page number to get
 * @param {number} perPage number of items per page/request
 * @returns {object} returns object containing limit and offset
 */
export const calculateLimitAndOffset = (page: number, perPage: number) => {
    const offset: number = (page ? Number(page) - 1 : 0) * (perPage ? Number(perPage) : 20);
    const limit: number = perPage ? Number(perPage) : 20;
    return { offset, limit };
}

/**
 * @function paginate
 * @param {number} page page number to get
 * @param {number} perPage number of items per page/request
 * @param {number} count total number of items
 * @param {array} rows items
 * @returns {object} return the meta for pagination
 */
export const paginate = (page: number, perPage: number, count: number, rows: Array<any>) => {
    return {
        page: Number(page) || 1,
        pageCount: Math.ceil(count / (perPage ? Number(perPage) : 20)),
        pageSize: rows.length,
        count
    }
}
