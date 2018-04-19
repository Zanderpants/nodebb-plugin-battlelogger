<form role="form" class="battlelog-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Adjust these settings. You can then retrieve these settings in code via:
				<code>meta.settings.get('Battlelogger');</code> - if I have set this up correctly?
			</p>
			<div class="form-group">
				<label for="setting-1">Setting 1</label>
				<input type="text" id="setting-1" name="setting-1" title="Setting 1" class="form-control" placeholder="Setting 1">
			</div>
			<div class="form-group">
				<select id="Game">
					<option value="40K">40K</option>
					<option value="AoS">AoS</option>
					<option value="WM">WM</option>
					<option value="Infinity">Infinity</option>
				  </select>
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>