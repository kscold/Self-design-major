const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
