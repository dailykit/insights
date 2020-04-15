const mongoose = require('mongoose');
const basics = require('./basic');

// Filters for Product 
const productsByItemName = async (Model, name) => {

    try {
        let result = await mongoose.model(Model).find().elemMatch("items", {
            label: name
        });

        if (result)
            return result;
        else
            throw "Product could not be found.";
    } catch (e) {
        return e;
    }
}

const productByNoOfItems = async (Model, num, operation) => {

    try {
        let result;
        let query = mongoose.model(Model).aggregate().project({
            items: {
                $size: '$items'
            }
        });
        switch (operation) {
            case 'eq':
                query.match({
                    items: {
                        $eq: num
                    }
                });
                break;
            case 'gt':
                query.match({
                    items: {
                        $gt: num
                    }
                });
                break;
            case 'lt':
                query.match({
                    items: {
                        $lt: num
                    }
                });
                break;
            case 'between':
                query.match({
                    items: {
                        $gt: num.min,
                        $lt: num.max
                    }
                });
                break;
            default:
                result = null;
                break;
        }

        query.project({
            items: 0
        });

        const docs = await query;
        let ids = [];
        docs.forEach(doc => ids.push(doc._id));
        result = await basics.isAnyOf('_id', ids, mongoose.model(Model));

        if (result)
            return result;
        else
            throw "Product could not be found.";
    } catch (e) {
        return e;
    }
}

module.exports = {
    productsByItemName,
    productByNoOfItems
}