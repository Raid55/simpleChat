const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
	username: { type: String, required: true },
	ipAddress: { type: String, required: true, maxlength: 45 },
	userAgent: { type: String, required: true },
	roomsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rooms', required: false }],
}, { timestamps: true });


mongoose.model('Users', userSchema);
