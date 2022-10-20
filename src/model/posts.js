const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchame = new Schema(
    {
        name_user: { type: String, required: true },
        name1: { type: String, required: true },
        pass: { type: String, required: true },
        date: { type: String, default: Date.now },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('user_tbls', postSchame);
