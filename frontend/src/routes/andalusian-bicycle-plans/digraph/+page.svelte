<svelte:head>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWlLsD-_56Km_8KK0bilXdSwMrAOWQW-o&libraries=geometry"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  let map;

  onMount(() => {
    const andaluciaBounds = {
      north: 37.958517, // Latitud del punto más norte
      south: 36.000266, // Latitud del punto más sur
      east: -3.002191, // Longitud del punto más este
      west: -7.391055 // Longitud del punto más oeste
    };

    const mapOptions = {
      center: { lat: 37.388630, lng: -5.995340 }, // Centro del mapa
      zoom: 8 // Zoom inicial
    };

    // Crear un objeto LatLngBounds con los límites de Andalucía
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(andaluciaBounds.south, andaluciaBounds.west),
      new google.maps.LatLng(andaluciaBounds.north, andaluciaBounds.east)
    );

    const el = document.getElementById('map');
if (el) {
  map = new google.maps.Map(el, mapOptions);
  map.fitBounds(bounds);
}
    
  });
</script>

<div id="map" style="width: 100%; height: 400px;"></div>
