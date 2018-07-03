const mongoose = require('mongoose');

const MSG_TYPES = ['joined', 'text', 'other'];

// message schema
const messageSchema = new mongoose.Schema({
	text: { type: String, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  type: { type: String, enum: MSG_TYPES, required: true },
}, { timestamps: true });


// room Schema
const roomSchema = new mongoose.Schema({
	name: { type: String, required: true },
	messages: [messageSchema],
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
	isActive: { type: Boolean, default: true, required: false },
}, { timestamps: true });


mongoose.model('Rooms', roomSchema);
