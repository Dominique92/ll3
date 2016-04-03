/*
 * Copyright (c) 2014 Dominique Cavailhez
 * Tune the map height accordighly with map width (max window height)
 * Very important for low size mobiles
 */

L.Map.addInitHook(function() {
	if (!this._container.innerHeight) { // Set no height to the map <DIV> to activate MapAutoHeight
		this._overflow();// Execute during the init phase
		L.DomEvent['on']( // Execute when the window resize
			window, 'resize',
			this._overflow,
			this
		);
	}
});

L.Map.include({
	_overflow: function() {
		this._container.style.height =
			Math.min(
				this._container.offsetWidth, // Display a square map
				window.innerHeight -20 // But not more than the window size
			) + 'px';
		this._size.y = window.innerHeight -20; // Temporary set the map size y (to avoid bug on fitBounds)
		this._onResize (); // Refresh Leaflet components
	}
});
