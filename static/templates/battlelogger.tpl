<style>
  #con {
	  padding: 5%;
  }
  .lrow {
	position: relative;
	display: block;
	width: 100%;
	height: 40px;
	border-bottom: 1px solid #AFAFAF;
  }
  
  .name {
	position: relative;
	display: inline-block;
	width: 75%;
	line-height: 45px;
  }
  
  .score {
	position: relative;
	display: inline-block;
	width: 25%;
  }
  
  .lrow:nth-child(1) {
	background: gold;
  }
  
  .lrow:nth-child(2) {
	background: #c0c0c0;
  }
  
  .lrow:nth-child(3) {
	background: #cd7f32;
  }
</style>

<div class="container" id="content">
		
	<div class="row">
		<div class="col-lg-9">
			
			<div id="panelAddNew" class="panel panel-default" style="display:none">
				<div class="panel-heading">Add New</div>
				<form role="form" class="battlelog-settings"></form>
					<div class="form-group">
						<label for="game-system">Game System</label>
						<select id="game-system" class="form-control">
							<option value="40K">40K</option>
							<option value="AoS">AoS</option>
							<option value="WM">WM</option>
							<option value="Infinity">Infinity</option>
						</select>
					</div>
					<div class="form-group">
						<label for="game-date">Game Date</label>
						<input type="date" id="game-date" name="game-date" title="Date" class="form-control">
					</div>
					<div class="form-search">
						<label for="opponent-search">Opponent</label>
						<input type="text" id="opponent-search" autofocus="" data-toggle="dropdown" class="form-control" placeholder="Search for opponent" aria-expanded="false">
					</div>
					<div class="form-group">
						<label for="game-result">Result</label>
						<select id="game-result" class="form-control">
							<option value="Victory">Victory</option>
							<option value="Minor Victory">Minor Victory</option>
							<option value="Draw">Draw</option>
							<option value="Minor Defeat">Minor Defeat</option>
							<option value="Defeat">Defeat</option>
						</select>
					</div>
				</form>
							
			</div>
			<div class="panel panel-default">
				<div class="panel-heading">Battlelogger Dashboard</div>
				<div class="panel-body">
					<div class="graph-container"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
						<canvas id="wldChart" width="640" height="333" class="chartjs-render-monitor" style="display: block; width: 640px; height: 333px;"></canvas>
					</div>
					<hr>
					<div class="row">
						<div class="col-sm-3 hidden-xs text-center pageview-stats">
							<div><strong id="pageViewsThirty">171</strong></div>
							<div><a href="#" class="updatePageviewsGraph" data-action="updateGraph" data-units="days" data-amount="30">Last 10 Battles</a></div>
						</div>
						<div class="col-sm-3 text-center pageview-stats">
							<div><strong id="pageViewsSeven">171</strong></div>
							<div><a href="#" class="updatePageviewsGraph" data-action="updateGraph" data-units="days" data-amount="7">Last 20 Battles</a></div>
						</div>
						<div class="col-sm-3 hidden-xs text-center pageview-stats">
							<div><strong id="pageViewsPastDay">28</strong></div>
							<div><a href="#" class="updatePageviewsGraph active" data-action="updateGraph" data-units="hours">This year</a></div>
						</div>
						<div class="col-sm-3 text-center pageview-stats">
							<div><strong><i class="fa fa-clock-o"></i></strong></div>
							<div><a href="#" class="updatePageviewsGraph" data-action="updateGraph" data-units="custom">Filter Options</a></div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-heading">Battles</div>
				<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Game</th>
									<th scope="col">Opponent</th>
									<th scope="col">Result</th>
								</tr>
								<tbody>
									<tr>
										<th scope="row">1</th>
										<td>Shadespire</td>
										<td>@SkellieVincent</td>
										<td>Draw</td>
									</tr>
									<tr>
										<th scope="row">2</th>
										<td>Shadespire</td>
										<td>@ITS_E_Z</td>
										<td>Major Victory</td>
									</tr>
									<tr>
										<th scope="row">3</th>
										<td>Shadespire</td>
										<td>@Dad_Of_H-Bomb</td>
										<td>Minor Loss</td>
									</tr>
									<tr>
										<th scope="row">4</th>
										<td>Shadespire</td>
										<td>@Ry_Guy</td>
										<td>Minor Victory</td>
									</tr>
								</tbody>
							</thead>

						</table>
				</div>
						
			</div>
		</div>
		<div>
			<div class="col-lg-3">
				<div class="panel panel-default">
					<div class="panel-heading">Add a new battle</div>
					<div class="panel-body text-center">
						<p>
							<button id="btnAddNew" class="btn btn-block btn-success">Add New</button>
							<button id="btnRemove" class="btn btn-block btn-danger">Remove Unverified</button>
						</p>
						<p class="help-block">
							
							Click add to add a new battle (popup) or click remove unverfied to remove - only if the other player(s) didn't verfiy
							
						</p>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">Totals</div>
					<div class="panel-body">
						<select>
							<option value="All">All</option>
							<option value="Verified_Only">Verified Only</option>
							<option value="40K">40K</option>
							<option value="AoS">AoS</option>
						</select>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">Leaderboards</div>
					<div class="panel-body">
						<select>
							<option value="Friends">Shadespire</option>
							<option value="All">Verified Only</option>
							<option value="City">City</option>
							<option value="Country">Country</option>
						</select>
						<div id="con">
								<div class="lrow">
								<div class="name">Zander</div><div class="score">16</div>
								</div>
							
								<div class="lrow">
								<div class="name">Any human</div><div class="score">15</div>
								</div>
							
								<div class="lrow">
								<div class="name">Arnies cat</div><div class="score">3</div>
								</div>
							
								<div class="lrow">
								<div class="name">A Turd</div><div class="score">2</div>
								</div>
							
								<div class="lrow">
								<div class="name">Arnie</div><div class="score">1</div>
								</div>
							</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>


