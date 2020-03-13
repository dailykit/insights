const mongoose = require('mongoose');
const filters = require('./filters');

const check = (key, value, operation, model) => {

    let Model = mongoose.model(model);

    switch (operation) {
        case 'eq':
            return filters.eq(key, value, Model);
        case 'gt':
            return filters.gt(key, value, Model);
        case 'gte':
            return filters.gte(key, value, Model);
        case 'lt':
            return filters.lt(key, value, Model);
        case 'lte':
            return filters.lte(key, value, Model);
        case 'between':
            return filters.between(key, value, Model);
        case 'known':
            return filters.known(key, Model);
        case 'unknown':
            return filters.unknown(key, Model);
        case 'isAnyOf':
            return filters.isAnyOf(key, value, Model);
        case 'isNoneOf':
            return filters.isNoneOf(key, value, Model);
        case 'contain_exactly':
            return filters.contain_exactly(key, value, Model);
        case 'not_contain_exactly':
            return filters.not_contain_exactly(key, value, Model);
        case 'before':
            return filters.before(key, value, Model);
        case 'after':
            return filters.after(key, value, Model);
        default:
            return "Error: Invalid Operation."
    }
}

module.exports = {
    check
}