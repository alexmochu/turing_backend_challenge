import models from '../database/models';

const { Sequelize: { Op },
        Product,
        Category } = models;

class Paginator {
    /**
         * Initialize the pagination object
         *
         * @static
         * @param {object} req express request object
         * @returns {object} the object with page, limit, offset
         * @memberof Paginator
    */
    static initializePagination(req){
        const { query: { page: currentPage, limit: pageLimit } } = req;
        const page = currentPage || 1;
        const limit = pageLimit || 10;
        const offset = limit * (page - 1);

        const paginationInit = {
            page,
            limit,
            offset
        }
        return paginationInit
    }

    /**
         * Get paginated data
         *
         * @static
         * @param {int} page the current page
         * @param {int} limit the max number of items in a page
         * @param {int} count the number of items returned from fetch
         * @returns {object} the object with currentPage, currentPageSize (limit), totalPages, and count
         * @memberof Paginator
    */
    static getPaginatedData(page, limit, count){
        const pageCount = Math.ceil(count / limit);
        const pagination = {
            currentPage: +page,
            currentPageSize: limit,
            totalPages: pageCount,
            totalRecords: count
        }
        return pagination;
    }
    
    /**
         * Get pagination parameters
         *
         * @static
         * @param {object} req express request object
         * @param {int} count the number of items returned from fetch
         * @returns {object} the object with initialPage and pagination meta data
         * @memberof Paginator
    */
    static getPaginationParams(req, count){
        const { page, limit } = Paginator.initializePagination(req);
        const pagination = Paginator.getPaginatedData(page, limit, count);
        return {
            initialPage,
            pagination
        }
    }

}

export default Paginator;
