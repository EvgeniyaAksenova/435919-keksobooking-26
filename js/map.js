import { makeRequest } from './api.js';
import { setDisabledState, toggleAdForm, toggleMapFilters } from './form-adj.js';
import { renderCard } from './card.js';
import { filterData } from './filter.js';
import { debounce } from './util.js';
import { MAX_OFFERS } from './filter.js';

const TOKIO_COORDINATES = {
  lat: 35.681729,
  lng: 139.753927,
};

const ZOOM_LEVEL = 10;
const FIXED_NUMBER = 5;
const ALERT_SHOW_TIME = 500;


const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

let offers = [];

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKIO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  });

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(FIXED_NUMBER)}, ${lng.toFixed(FIXED_NUMBER)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const marker = L.marker(
    {
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: icon,
      keepInView: true,
    },
  );
  marker.addTo(markerGroup).bindPopup(renderCard(offer));
};


const renderMarkers = (data) => {
  data.forEach(createMarker);
};

const onMapFiltersChange = debounce(() => {
  markerGroup.clearLayers();
  renderMarkers(filterData(offers));
}, ALERT_SHOW_TIME);

const onSuccess = (data) => {
  offers = data.slice();
  renderMarkers(offers.slice(0, MAX_OFFERS));
  toggleMapFilters();
  mapFilters.addEventListener('change', onMapFiltersChange);
};

const onError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.color = 'red';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = 'Не удалось загрузить объявления';

  document.body.append(alertContainer);
};

const setDefaultState = () => {
  mainPinMarker.setLatLng(TOKIO_COORDINATES);
  map.setView(TOKIO_COORDINATES, ZOOM_LEVEL);
  map.closePopup();
  mapFilters.reset();
  markerGroup.clearLayers();
  renderMarkers(offers.slice(0, MAX_OFFERS));
};

map.on('load', () => {
  setDisabledState();
  toggleAdForm();
  makeRequest(onSuccess, onError, 'GET');
}).setView(TOKIO_COORDINATES, ZOOM_LEVEL);

export {setDefaultState};
