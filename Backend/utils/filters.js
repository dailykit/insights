const eq = async function (key, value, Model) {

    try {
        let result = await Model.where(key).eq(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const gt = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).gt(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const gte = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).gte(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const lt = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).lt(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const lte = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).lte(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const between = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).gt(value.min).lt(value.max);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const known = async function (key, Model) {

    try {
        let result = await Model.find().where(key).exists(true);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const unknown = async function (key, Model) {

    try {
        let result = await Model.find().where(key).exists(false);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const isAnyOf = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).in(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const isNoneOf = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).nin(value);
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const contain_exactly = async function (key, value, Model) {

    try {
        let result = await Model.find().where(key).regex(new RegExp(value));
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const not_contain_exactly = async function (key, value, Model) {

    try {
        let result = await Model.find({
            [key]: new RegExp('^(?!.*' + value + ')')
        });
        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const before = async function (key, value, Model) {

    try {
        let result = await Model.find({
            [key]: {
                $lt: value
            }
        });

        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

const after = async function (key, value, Model) {

    try {
        let result = await Model.find({
            [key]: {
                $gt: value
            }
        });

        if (result.length == 0)
            throw "No data found.";
        else
            return result;
    } catch (e) {
        return e;
    }
}

module.exports = {
    eq,
    gte,
    gt,
    lt,
    lte,
    between,
    known,
    unknown,
    isAnyOf,
    isNoneOf,
    contain_exactly,
    not_contain_exactly,
    before,
    after
}