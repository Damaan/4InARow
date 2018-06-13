var map, marker;
function initMap() {

  //Definim un objecte map.
  map = new google.maps.Map(document.getElementById('mapa'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });

   //Si el navegador suporta geolocalizatcio
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //Definim la posicio del jugador.
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        radi: position.coords.accuracy
      };
      //Centram el mapa al jugador
      map.setCenter(pos);
      //Marcador personalitzat
      var marker = new google.maps.Marker({
        position: pos,
        icon: {
          url: "https://vignette.wikia.nocookie.net/gurennlagann/images/2/27/Boota_the_Pigmole.png/revision/latest?cb=20161204070243",
          scaledSize: new google.maps.Size(64, 50)
        },
        map: map,
      });
      //Area de presició del jugador.
      var cercle = new google.maps.Circle({
        strokeColor: 'black',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        map: map,
        center: {lat: pos.lat, lng: pos.lng},
        radius: pos.radi
      });
    });
  }

}
