/* globals app, ajaxify, config, requirejs, socket, $ */


	//define('forum/battlelogger', function () {


//var Chart = require('../vendor/chart.js/chart.min.js');
var addMode = false;
var state_zero = 0;
var state_add_battle = 1;
var state_remove_battle = 2;
var state = state_zero;

var options = {
	//showScale: false,
	//lineTension: 0,
	scales: {
		yAxes:[
			{
				ticks: {
                    callback: function(label, index, labels) {
						if(label == 0)
						{
							return "Loss";
						}
						if(label == 1)
						{
							return "Draw";
						}
						if(label == 2)
						{
							return "Win";
						}
                    }
                }
			}

		]
	},
	legend: {
		display: false
	 },
	 tooltips: {
		enabled: false
	 }
/*     scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : false,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 2,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 4,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    scaleBeginAtZero: true,
    responsive: true,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> Players Online" */
};

var yLabels = [0, 1, 2];
var xLabels = ["14-Jan-18","25-Jan-18","1-Feb-18","18-Feb-18","30-Feb-18","12-Mar-18","21-Mar-18", "29-Mar-18","10-Apr-18"];

var data = {
    labels: xLabels,
    datasets: [
        {
			label: yLabels,
			fill: false,
			data: [0, 1, 2, 1, 1, 2, 2, 0, 2],
			lineTension: 0
        }
    ]
};

function getBattles()
{
	$.get('/api/battlelogger/getbattles', function(err)
	{
		//console.log(err);
	})
	console.log("getbattles()");
}

function loadGraph() {
	require(['Chart'], function (Chart) {
		console.log("loaded the battlelogger UI!")
		//$('#wldChart').onload(function () {
			
			var chartCanvas = document.getElementById("wldChart");
			var myChart = new Chart(chartCanvas.getContext('2d'), {
				type: 'line',
				data: data,
				options: options
			});
		//});
	});
	getBattles();
}
define('forum/battlelogger', ['data'], function(data) {
//$(window).on('action:connected', function() {
//$(window).on('action:ajaxify.end', (event, data) => {	
	loadGraph();


function validateData(battleData)
{
	battleData.uid = app.user.uid;
	battleData.bid = 0; // new to make a diffent global hash
	battleData.oid = 0, // opponent id (optional) - use id or string?
	battleData.gid = $("#game-system :selected").val(); // game id - use this or string (because what happens if undefined / not supported)
	battleData.userArmy = "";
	battleData.oponnentArmy = "";
	battleData.result = $("#game-result :selected").val(); // User sting or number?
	battleData.isVerfied = 0;
	battleData.points = 0; // user 
	battleData.deployment = 0; // board deployment
	battleData.gameType = 0;
	battleData.date = Date.now();
	//slug: tid + '/' + (utils.slugify(data.title) || 'topic'),
	battleData.timestamp = Date.now();
	battleData.deleted = 0;
	return true;
}

$("#btnAddNew").click(function(){
	let e = document.getElementById("panelAddNew");
	let btnAddNew = document.getElementById("btnAddNew");
	let btnRemove = document.getElementById("btnRemove");
	
	if(e.style.display === 'block')
	{
		var battleData = {
			uid: app.user.uid,
			bid: 0, // new to make a diffent global hash
			oid: 0, // opponent id (optional) - use id or string?
			gid: $("#game-system :selected").val(), // game id - use this or string (because what happens if undefined / not supported)
			userArmy: "",
			oponnentArmy: "",
			result: $("#game-result :selected").val(), // User sting or number?
			isVerfied: 0,
			points: 0, // user 
			deployment: 0, // board deployment
			gameType: 0,
			date: Date.now(),
		//slug: tid + '/' + (utils.slugify(data.title) || 'topic'),
			timestamp: Date.now(),
			deleted: 0
		}
		//if(validateData(battleData))
	//{
		//socket.emit('battlelogger.battle', battleData, (err) => {
		$.get('/api/battlelogger/addbattle',battleData, function(err, res){
			if (res)
			{

				e.style.display = 'none';
				addMode = false;
				btnAddNew.innerHTML = "Add New";
				btnRemove.innerHTML = "Remove";
				app.alertSuccess("New battle added");
				//Alert the error to user and don't switch state
				
			} 
			else 
			{
				console.log("Not added");	
			}
		});
	}
	else
	{
		e.style.display = 'block';
		addMode = true;
		btnAddNew.innerHTML = "Submit";
		btnRemove.innerHTML = "Cancel";
	}	 
});

$("#btnRemove").click(function(){
	//socket.emit('battlelogger.battle', battleData, (err) => {
	$.get('/api/battlelogger/removebattle',battleData, function(err){
		
	})



});


});
