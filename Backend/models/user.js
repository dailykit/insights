const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    others: {
        required: true,
        type: {
            skill: {
                type: String,
                required: true
            },
            age: {
                required: true,
                type: Number
            },
            extra: {
                required: false,
                type: {
                    hobby: {
                        required: false,
                        type: "String"
                    },
                    valid: {
                        type: Boolean,
                        required: false
                    }
                }
            }
        }
    }
}, {
    typePojoToMixed: false
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}