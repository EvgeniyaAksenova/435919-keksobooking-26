const types = {
  flat: {
    ru: 'Квартира'
  },
  bungalow: {
    ru: 'Бунгало'
  },
  house: {
    ru: 'Дом'
  },
  palace: {
    ru: 'Дворец'
  },
  hotel: {
    ru: 'Отель'
  },
};


const renderFeatures = (container, features) => {
  const featuresList = container.querySelectorAll('.popup__feature');

  if (featuresList) {
    featuresList.forEach((item) => {
      if (features.indexOf(item.classList[1].replace('popup__feature--', '')) === -1) {
        item.remove();
      }
    });
  }
};

const renderPhotos = (container, photos) => {
  const photoElement = container.querySelector('.popup__photo');
  const offerPhoto = photoElement.cloneNode(true);

  container.innerHTML = '';
  if (photos.length > 0) {
    photos.forEach((photo) => {
      offerPhoto.src = photo;
      container.appendChild(offerPhoto);
    });
  }
};


const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (data) => {
  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitle = offerElement.querySelector('.popup__title');
  if (data.offer.title){
    offerTitle.textContent = data.offer.title;
  } else {
    offerTitle.remove();
  }

  const offerTextAdress = offerElement.querySelector('.popup__text--address');
  if (data.offer.address) {
    offerTextAdress.textContent = data.offer.address;
  } else {
    offerTextAdress.remove();
  }

  const offerType = offerElement.querySelector('.popup__type');
  if (data.offer.type) {
    offerType.textContent = types[data.offer.type].ru;
  } else {
    offerType.remove();
  }

  const offerTextPrice = offerElement.querySelector('.popup__text--price');
  if (data.offer.price) {
    offerTextPrice.textContent = `${data.offer.price} ₽/ночь`;
  } else {
    offerTextPrice.remove();
  }

  const offerTextCapacity = offerElement.querySelector('.popup__text--capacity');
  if (data.offer.guests) { offerTextCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  } else {
    offerTextCapacity.remove();
  }

  const offerTextTime = offerElement.querySelector('.popup__text--time');
  if (data.offer.checkin) { offerTextTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  } else {
    offerTextTime.remove();
  }

  if (data.offer.features && data.offer.features.length > 0) {
    renderFeatures(offerElement.querySelector('.popup__features'), data.offer.features);
  }

  const offerDescription = offerElement.querySelector('.popup__description');
  if (data.offer.description) { offerDescription.textContent = data.offer.description;
  } else {
    offerDescription.remove();
  }

  if (data.offer.photos && data.offer.photos.length > 0) {
    renderPhotos(offerElement.querySelector('.popup__photos'), data.offer.photos);
  }

  const offerAvatar = offerElement.querySelector('.popup__avatar');
  if (data.author.avatar) {
    offerAvatar.src = data.author.avatar;
  } else {
    offerTitle.remove();
  }

  return offerElement;
};

export { renderCard };
