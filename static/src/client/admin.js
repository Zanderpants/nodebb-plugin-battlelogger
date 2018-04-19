'use strict';
/* globals $, app, socket */

define('admin/plugins/battlelogger', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('battlelogger', $('.battlelogger-settings'));

		$('#save').on('click', function() {
			Settings.save('battlelogger', $('.battelogger-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'battlelogger-admin-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});