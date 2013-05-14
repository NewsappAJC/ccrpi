$(document).ready(function(){
  var metro5Centroid = new google.maps.LatLng(33.77, -84.330101);

  var mapStyle = [
  {
    stylers: [{
      saturation: -60
    }]
  },
  {
    featureType: "poi",
    stylers: [{visibility: "off"}]
  },
  {
    featureType: "landscape",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: 'road',
    stylers: [{
      visibility: "simplified",
      saturation: 70
    }]
  },
  {
    featureType: "road.arterial",
    stylers: [{visibility: "off"}]
  }];

  var mapOptions = {
    center:    metro5Centroid,
    zoom:      10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    styles: mapStyle
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var markers = {
        elementary:   [],
        middleschool: [],
        highschool:   []
      },
      infoWindows = [],
      currentCluster = 'elementary';

  Tabletop.init({
    key: 'https://docs.google.com/spreadsheet/pub?key=0Ap9h1zLSgOWUdFVUZnlaNWthaENxUnJ0RHZCeDl1eFE&output=html',
    callback: function(data, tabletop) {
      $.each(['elementary','middleschool','highschool'], function(idx, cluster) {
        var schools = tabletop.sheets(cluster).all();

        $.each(schools, function(idx, school) {
          var latLng = new google.maps.LatLng(school.latitude, school.longitude);

          var infoWindow = new google.maps.InfoWindow({
            content: function() {
              template = $('#scores');
              $(template).find('#name'       ).text(function(){ return school.schoolname;  });
              $(template).find('#district'   ).text(function(){ return school.systemname;  });
              $(template).find('#ccrpi'      ).text(function(){ return school.ccrpiscore;  });
              $(template).find('#achievement').text(function(){ return school.achievement; });
              $(template).find('#progress'   ).text(function(){ return school.progress;    });
              $(template).find('#performance').text(function(){ return school.performance; });
              $(template).find('#challenge'  ).text(function(){ return school.challenge;   });
              return $(template).html();
            }()
          });
          infoWindows.push(infoWindow);

          var marker = new google.maps.Marker({
            position: latLng,
            title: school.schoolname,
            icon: function() {
              if ( school.ccrpiscore >= 90 ) {
                return 'images/a.png';
              } else if ( school.ccrpiscore >= 80 ) {
                return 'images/b.png';
              } else if ( school.ccrpiscore >= 70 ) {
                return 'images/c.png';
              } else if ( school.ccrpiscore >= 60 ) {
                return 'images/d.png';
              } else if ( school.ccrpiscore >  0  ) {
                return 'images/f.png';
              } else { return  'images/na.png'; };
            }()
          });
          google.maps.event.addListener(marker, 'click', function() {
            $.each(infoWindows, function(idx, window) {
              window.close();
            })
            infoWindow.open(map, marker);
          });
          markers[cluster].push(marker);
        });  //school loop
      });  //school cluster loop

      var displayCluster = function(cluster) {
        $.each(markers[currentCluster], function(idx, marker) {
          marker.setMap(null);
        });
        $.each(markers[cluster], function(idx, marker) {
          marker.setMap(map);
        });
        currentCluster = cluster;
      };

      displayCluster(currentCluster);

      $('#choose_school_layer').change(function() {
        displayCluster( $(this).val() );
      })
    } // tabletop callback function
  }); //Tabletop.init
});
