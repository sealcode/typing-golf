var path = require("path");
var Sealious = require("sealious");
var solver = require("./common/solver.js");

Sealious.init();

var www_server = Sealious.ChipManager.get_chip("channel", "www_server");

www_server.static_route(path.resolve(module.filename, "../frontend/public"), "")


www_server.route({
	path: "/api/v1/count_steps",
	method: "POST",
	handler: function(context, request){
		if(context.user_id != null){
			return solver(request.payload.from, request.payload.to);
		}
	}
});

var object = new Sealious.FieldType({
	name: "object"
});

var Task = new Sealious.ResourceType({
	name: "task",
	fields: [
		{name: "json", type: "text", required: true}
	],
	access_strategy: {
		retrieve: "public",
		default: "logged_in"
	}
});

var RankingEntry = new Sealious.ResourceType({
	name: "ranking_entry",
	fields: [
		{name: "nick", type: "text", required: true},
		{name: "score", type: "int", required: true},
		{name: "task", type: "single_reference", params: {resource_type: "task"}}
	]
});

Sealious.start();
