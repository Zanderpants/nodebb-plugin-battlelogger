const async = require.main.require('async');
const db = require.main.require('./src/database');
const user = require.main.require('./src/user');
const topics = require.main.require('./src/topics');

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {
	/*
		Make sure the route matches your path to template exactly.

		If your route was:
			myforum.com/some/complex/route/
		your template should be:
			templates/some/complex/route.tpl
		and you would render it like so:
			res.render('some/complex/route');
	*/

	res.render('admin/plugins/battlelogger', {});
};

Controllers.renderPage = function (req, res, next) {
	/*
		Make sure the route matches your path to template exactly.

		If your route was:
			myforum.com/some/complex/route/
		your template should be:
			templates/some/complex/route.tpl
		and you would render it like so:
			res.render('some/complex/route');
	*/
	console.log("res.render('battlelogger', {});");
	res.render('battlelogger', {});
};

Controllers.addBattle = function (req, res)
{
	var val;
	console.log("Adding Battle to db");
	console.log(req.query);
	var battleData = {
		edited: 0,
		pid : 1,
		content : (req.query.gid + " : " + req.query.result),
		tid : 1,
		timestamp : req.query.timestamp,
		deleted : 0,
		editor: 0,
		uid : req.query.uid,
		toPid: 0,
		votes : 0,
		reupatation : 0
	};

	// topic posting but of course we fix this later
	topics.reply(battleData, function(){

	});

	// For now let me add a post to catergory 1 as test tjhat write works

/*
	async.waterfall([
		function (next) {
			Topics.resizeAndUploadThumb(data, next);
		},
		function (next) {
			db.incrObjectField('global', 'nextBid', next);
		},
		function (bid, next) {

			};
			db.setObject('battle:' + battleData.bid, battleData, next);	
		},
		function (next) {
			async.parallel([
				function (next) {
					db.sortedSetsAdd([
						'battles:bid',
						'gid:' + battleData.gid + ':bids',
						'gid:' + battleData.uid + ':uid:' + battleData.bid + ':bids',
					], timestamp, battleData.bid, next);
				},
				function (next) {
					user.addTopicIdToUser(topicData.uid, topicData.tid, timestamp, next);
				},
				function (next) {
					db.incrObjectField('global', 'battleCount', next);
				},
			], next);
		},
	], callback);
	*/
	res.json(battleData);

}

Controllers.removeBattle = function (req, res) {
	/*
		Make sure the route matches your path to template exactly.

		If your route was:
			myforum.com/some/complex/route/
		your template should be:
			templates/some/complex/route.tpl
		and you would render it like so:
			res.render('some/complex/route');
	*/
	console.log("removeBattle()");
	res.render('battlelogger', {});
};

Controllers.getBattles = function (req, res) {
	/*
		Lets test db get first
	*/

	var results;
	var set = 'tid:' + 1 + ':posts';

	uids = ["user:1"];
	fields = ["uid", "username", "userslug", "fullname", "email", "picture",
			"status", "reputation", "email:confirmed", "uploadedpicture", "lastonline",
			"banned", "banned:expire"];
	
	// db.getObjectsFields(uids, fields, function (err, results){
	// 	console.log(results);
	// 	res.json(results);
	// });
	//tid:1set=tid:1:postsstart=4stop=23socket=1reverse=false

	topics.getTopicPosts(1,set,1,10,1,false, function(err, posts)
	{
		if(posts)
		{
			console.log(posts);
		}
	})
};

create = function (battleData, callback) {
		battleData.username = battleData.username.trim();
		//battleData.userslug = utils.slugify(data.username);
		//var timestamp = data.timestamp || Date.now();
		//var userNameChanged = false;

		async.waterfall([
			function (next) {
			/* 	isDataValid(battleData, next);
			},
			function (renamedUsername, next) {
				userNameChanged = !!renamedUsername;

				if (userNameChanged) {
					userData.username = renamedUsername;
					userData.userslug = utils.slugify(renamedUsername);
				}
				plugins.fireHook('filter:user.create', { user: userData, data: data }, next);
			},
			function (results, next) {
				userData = results.user; */

			// Plus one for global Bid - How about when i remove one?
				db.incrObjectField('global', 'nextBid', next);
			},
			function (bid, next) {
				battleData.bid = bid;
				db.setObject('battle:' + bid, battleData, next);
			},
			function (next) {
				User.incrementUserFieldBy(uid, 'battlecount', 1, next);
			},
			function (newbattlecount, next) {
				if (!parseInt(uid, 10)) {
					return next();
				}
				db.sortedSetAdd('users:battlecount', newbattlecount, uid, next);
			},
			function (next) {
				db.sortedSetAdd('uid:' + uid + ':battles', timestamp, bid, next);
			},
			function (next) {
				async.parallel([
					function (next) {
						db.incrObjectField('global', 'battleCount', next);
					},
				], next);
			},
		], callback);
	};

module.exports = Controllers;