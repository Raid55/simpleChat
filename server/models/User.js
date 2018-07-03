const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
	username: { type: String, required: true, unique: true },
	ip_address: { type: String, required: true, maxlength: 45 },
  roomsCreated: { type: Number },
}, { timestamps: true });


mongoose.model('Users', userSchema);
