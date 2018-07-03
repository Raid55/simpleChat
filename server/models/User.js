const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
	username: { type: String, required: true, unique: true },
	ipAddress: { type: String, required: true, maxlength: 45 },
	userAgent: { type: String, required: true },
  roomsCreated: { type: Number },
}, { timestamps: true });


mongoose.model('Users', userSchema);
