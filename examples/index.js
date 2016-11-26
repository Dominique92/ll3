var key = {
	ign: window.location.host == 'localhost'
		? 'g8jzsy4ttwzho3aepk2s4tb7' // localhost 03/12/2016 http://api.ign.fr / Votre clef de développement >>
		: 'o6owv8ubhn3vbz2uj8jq5j0z', // dominique92.github.io http://pro.ign.fr/api-web
	bing: 'ArLngay7TxiroomF7HLEXCS7kTWexf1_1s1qiF7nbTYs2IkD3XLcUnvSlKbGRZxt', // https://www.bingmapsportal.com
	os: 'CBE047F823B5E83CE0405F0ACA6042AB' // http://www.ordnancesurvey.co.uk/business-and-government/products/os-openspace/
};

var map = new L.Map('map');
map.setView([47, 2], 6); // France

// Baselayer & selector
L.TileLayer.collection('OSM-FR').addTo(map); // Important de le prendre dans L.TileLayer.collection pour que la première couche s'efface completement (fond et attribution)
var lc = new L.Control.Layers(
	L.TileLayer.collection()
).addTo(map);

// Controls
new L.Control.Permalink.Cookies({
	position: 'bottomright',
	layers: lc
}).addTo(map);
new L.Control.Scale().addTo(map);
new L.Control.Coordinates({
	position:'bottomleft'
}).addTo(map);

new L.Control.Fullscreen().addTo(map);

new L.Control.OSMGeocoder({
	position: 'topleft'
}).addTo(map);

new L.Control.Gps()
	.addTo(map)
	.on('gps:located', function(e) {
		e.target._map.setView(e.latlng, 16, {
			reset: true
		});
	});

var fl = new L.Control.FileLayerLoad().addTo(map);
fl.loader.on('data:loaded', function(e) {
	e.layer.addTo(map);
}, fl);

new L.Control.Click(
	function () {return wri._getUrl() + '&format=gpx'}, {
		title: 'Obtenir les élements de la carte dans un fichier GPX',
		label: '&#8659;'
	}
).addTo(map);

new L.Control.EasyPrint({title: 'Imprimer la carte'}).addTo(map);

// GeoJSON Ajax
var wri = new L.GeoJSON.Ajax.WRIpoi().addTo(map);
var massif = new L.GeoJSON.Ajax.WRImassifs().addTo(map);
