// This is a new concept to me and I just found out about it and its super cool
// and i really want to test this out

// the goal of this is to make an enpoint for each call, since there is not many
// it wont be hard to populate, run the app normaly with the mock data and make
// sure that everything is tested properly with the fake data, this helps out
// a lot because i was strugling with figuring out how to run the server
// simuntaniouly and this also helps a lot with knowing what to test
// for this I will be using nock

// default error payload
const defaultErr = {
	success: false,
}
// POST api/create/user
const createUser = {
	success: true,
	token: "dummy token",
	user: {
		username: "testUser",
		roomsJoined: [],
	},
};
// GET api/user
const getUserNoRooms = {
	success: true,
	user: {
		username: "testUser",
		roomsJoined: [],
	},
};
const getUser = {
	success: true,
	user: {
		username: "testUser",
		roomsJoined: [
			{
				isActive: true,
				_id: "5b40eabf433afe0269d585d5",
				name: "Sheerraver Saver",
				link: "6c47f6e4",
				owner: "5b40eab3433afe0269d585d4",
			},
			{
				isActive: true,
				_id: "5b40eabf433afe0269d585d5",
				name: "Sheerraver Saver",
				link: "6c47f6e4",
				owner: "5b40eab3433afe0269d585d4",
			},
		],
	},
};
// GET api/create/room
const createRoom = {
	success: true,
	roomLink: "7cdfd782",
};
// GET api/room/:rId
const getRoom = {
	success: true,
	room: {
		isActive: true,
		_id: "5b40eac2433afe0269d585d9",
		name: "Pondsnout Sage",
		link: "7cdfd782",
		owner: "5b40eab3433afe0269d585d4",
		messages: [
			{
				_id: "5b40eac2433afe0269d585da",
				text: "testUser has joined the room...",
				owner : {
					 _id : "5b40eab3433afe0269d585d4",
					 username : "testUser",
				},
				 type : "joined",
				 createdAt : "2018-07-07T16:30:58.184Z",
				 updatedAt : "2018-07-07T16:30:58.184Z",
			},
			{
				 _id : "5b40eac2433afe0269d585da",
				 text : "this is a test :computer: $aapl $appl",
				 owner : {
				 _id : "5b40eab3433afe0269d585d4",
				 username : "testUser",
				},
				 type : "text",
			},
		],
		 createdAt : "2018-07-07T16:30:58.184Z",
		 updatedAt : "2018-07-07T16:30:58.184Z",
		 __v : 0,
	},
	 user : {
		 username : "testUser",
		 _id : "5b40eab3433afe0269d585d4",
	}
};
// POST api/create/msg/:rId
const createMsg = {
	success: true,
};

module.exports = {
	createMsg: createMsg,
	createRoom: createRoom,
	createUser: createUser,
	getRoom: getRoom,
	getUser: getUser,
	getUserNoRooms: getUserNoRooms,
	defaultErr: defaultErr,
}
