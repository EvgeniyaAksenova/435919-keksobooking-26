const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('fieldset, select.map__filter');

const setDisabledState = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const toggleAdForm = () => {
  adForm.classList.toggle('ad-form--disabled');
};

const toggleMapFilters = () => {
  mapFilters.classList.toggle('map__filters--disabled');
};


export{setDisabledState};
export{toggleAdForm};
export{toggleMapFilters};
