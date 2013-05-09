$(document).ready(function(){
  var metro5Centroid = new google.maps.LatLng(33.84014, -84.330101);

  var mapStyle = [
  {
    stylers: [{aturatoin: -100}]
  },
  {
    featureType: 'road',
    stylers: [ { visibility: "simplified" } ]
  },
  {
    featureType: "road.local",
    stylers: [{visibility: "off"}]
  },
  {
    featureType: "road.arterial",
    stylers: [{visibility: "off"}]
  }];

  var mapOptions = {
    center:    metro5Centroid,
    zoom:      12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyle
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var kmlLayerOptions = {
    preserveViewport: false
  };
  var elementaryLayer   = new google.maps.KmlLayer('http://alt.coxnewsweb.com/ajc/_newsapps/2013/temp/scores/data/el.kml'   , kmlLayerOptions);
  var middleSchoolLayer = new google.maps.KmlLayer('http://alt.coxnewsweb.com/ajc/_newsapps/2013/temp/scores/data/middle_school.kml', kmlLayerOptions);
  var highSchoolLayer   = new google.maps.KmlLayer('http://alt.coxnewsweb.com/ajc/_newsapps/2013/temp/scores/data/high_school.kml'  , kmlLayerOptions);

  elementaryLayer.setMap(map);
  window.el = elementaryLayer;
});
