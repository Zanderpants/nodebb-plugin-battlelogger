"use strict";

var controllers = require('./static/src/lib/controllers'),

	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/battlelogger', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/battlelogger', controllers.renderAdminPage);

	router.get('/battlelogger', hostMiddleware.buildHeader, controllers.renderPage);
	router.get('/api/battlelogger', controllers.renderPage);
	router.get('/api/battlelogger/addbattle', controllers.addBattle);
	router.get('/api/battlelogger/removebattle:bid', controllers.removeBattle)
	router.get('/api/battlelogger/getbattles', controllers.getBattles);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/battlelogger',
		icon: 'fa-tint',
		name: 'Battlelogger'
	});

	callback(null, header);
};

plugin.addNavigation = function(core, callback) {
	core.push({
		route: '/battlelogger',
		title: 'Battlelogger',
		enabled: false,
		iconClass: 'fa-edit',
		textClass: 'visible-xs-inline',
		text: 'Battlelogger',
		properties: {  },
		core: false
	});
	callback(null, core);

};

plugin.addBattlecount = function(userData, callback) {
	
	// first we inject the new user battlecount key in to the user hash
	var result = {};
	// {user: Object.assign({battlecount: 0}, userData)};
	callback(result);

	// then we create the battlelog item (or do we just usew this data model to count battlecount too?)
	

};
/* DO THIS LATER - instead of one global store i have to make a new sorted set for each supported game AND when user adds a battle to their account add a new hash for that game type result
   The problem will come when mixing games in history view
createUserBattleLog = function (user, callback) {
	data.username = data.username.trim();
	data.userslug = utils.slugify(data.username);
	if (data.email !== undefined) {
		data.email = validator.escape(String(data.email).trim());
	}
	var timestamp = data.timestamp || Date.now();
	var userData;
	var userNameChanged = false;

	async.waterfall([
		function (next) {
			User.isDataValid(data, next);
		},
		function (next) {
			battlelogData = {
				battlecount: 0,
				verifiedscore: 0,
				unvefiredscore: 0,
				uid: user.uid,
								,
			};
		},

		},
		function (uid, next) {
			db.setObject('battlelog:' + uid, userData, next);
		},
		function (next) {
			async.parallel([
				function (next) {
					db.incrObjectField('global', 'userCount', next);
				},
				function (next) {
					db.sortedSetAdd('username:uid', userData.uid, userData.username, next);
				},
				function (next) {
					db.sortedSetAdd('username:sorted', 0, userData.username.toLowerCase() + ':' + userData.uid, next);
				},
				function (next) {
					db.sortedSetAdd('userslug:uid', userData.uid, userData.userslug, next);
				},
				function (next) {
					var sets = ['users:joindate', 'users:online'];
					if (parseInt(userData.uid, 10) !== 1) {
						sets.push('users:notvalidated');
					}
					db.sortedSetsAdd(sets, timestamp, userData.uid, next);
				},
				function (next) {
					db.sortedSetsAdd(['users:postcount', 'users:reputation'], 0, userData.uid, next);
				},
				function (next) {
					groups.join('registered-users', userData.uid, next);
				},
				function (next) {
					User.notifications.sendWelcomeNotification(userData.uid, next);
				},
				function (next) {
					if (userData.email) {
						async.parallel([
							async.apply(db.sortedSetAdd, 'email:uid', userData.uid, userData.email.toLowerCase()),
							async.apply(db.sortedSetAdd, 'email:sorted', 0, userData.email.toLowerCase() + ':' + userData.uid),
						], next);

						if (parseInt(userData.uid, 10) !== 1 && parseInt(meta.config.requireEmailConfirmation, 10) === 1) {
							User.email.sendValidationEmail(userData.uid, {
								email: userData.email,
							});
						}
					} else {
						next();
					}
				},
				function (next) {
					if (!data.password) {
						return next();
					}

					User.hashPassword(data.password, function (err, hash) {
						if (err) {
							return next(err);
						}

						async.parallel([
							async.apply(User.setUserField, userData.uid, 'password', hash),
							async.apply(User.reset.updateExpiry, userData.uid),
						], next);
					});
				},
				function (next) {
					User.updateDigestSetting(userData.uid, meta.config.dailyDigestFreq, next);
				},
			], next);			},
		function (results, next) {
			if (userNameChanged) {
				User.notifications.sendNameChangeNotification(userData.uid, userData.username);
			}
			plugins.fireHook('action:user.create', { user: userData });
			next(null, userData.uid);
		},
	], callback);
};
*/

module.exports = plugin;