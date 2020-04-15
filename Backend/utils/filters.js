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
                throw "Invalid Operation";
        }

        query.project({
            items: 0
        });

        const docs = await query;
        let ids = [];
        docs.forEach(doc => ids.push(doc._id));
        let result = await basics.isAnyOf('_id', ids, mongoose.model(Model));

        if (result)
            return result;
        else
            throw "Product could not be found.";
    } catch (e) {
        return e;
    }
}

const productsByNoOfRecipes = async (Model, num, operation) => {

    try {
        let query = mongoose.model(Model).aggregate().unwind('$items').project({
            recipes: {
                $size: "$items.recipes"
            }
        }).group({
            _id: "$_id",
            total: {
                $sum: "$recipes"
            }
        });

        switch (operation) {
            case 'eq':
                query.match({
                    total: {
                        $eq: num
                    }
                });
                break;
            case 'gt':
                query.match({
                    total: {
                        $gt: num
                    }
                });
                break;
            case 'lt':
                query.match({
                    total: {
                        $lt: num
                    }
                });
                break;
            case 'between':
                query.match({
                    total: {
                        $gt: num.min,
                        $lt: num.max
                    }
                });
                break;
            default:
                throw "Invalid Operation";
        }

        const docs = await query;
        let ids = [];
        docs.forEach(doc => ids.push(doc._id));
        let result = await basics.isAnyOf('_id', ids, mongoose.model(Model));

        if (result)
            return result;
        else
            throw "Product could not be found.";
    } catch (e) {
        return e;
    }
}

const productsByNoOfAccompaniments = async (Model, num, operation) => {

    try {
        let query = mongoose.model(Model).aggregate().unwind('$items').project({
            accompaniments: "$items.recipes.accompaniments"
        }).unwind("$accompaniments").project({
            accompaniments: {
                $size: "$accompaniments"
            }
        }).group({
            _id: "$_id",
            total: {
                $sum: "$accompaniments"
            }
        });

        switch (operation) {
            case 'eq':
                query.match({
                    total: {
                        $eq: num
                    }
                });
                break;
            case 'gt':
                query.match({
                    total: {
                        $gt: num
                    }
                });
                break;
            case 'lt':
                query.match({
                    total: {
                        $lt: num
                    }
                });
                break;
            case 'between':
                query.match({
                    total: {
                        $gt: num.min,
                        $lt: num.max
                    }
                });
                break;
            default:
                throw "Invalid Operation";
        }

        const docs = await query;
        let ids = [];
        docs.forEach(doc => ids.push(doc._id));
        let result = await basics.isAnyOf('_id', ids, mongoose.model(Model));

        if (result)
            return result
        else
            throw "Product could not be found.";
    } catch (e) {
        return e;
    }
}

module.exports = {
    productsByItemName,
    productByNoOfItems,
    productsByNoOfRecipes,
    productsByNoOfAccompaniments
}