const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup-form');
const nameInput = document.querySelector('.popup__form-input_type_name');
const jobInput = document.querySelector('.popup__form-input_type_job');
const closeButton = document.querySelector('.popup__button-close');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// В разработке:

// function popupOverlayClickHandler(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup();
//   }
// }

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);

// В разработке:
// popup.addEventListener('click', popupOverlayClickHandler);