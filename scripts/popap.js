const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-job');
const closeButton = document.querySelector('.popup__close');


function showPopupTuggle() {
  nameValue = profileName.textContent;
  jobValue = profileJob.textContent;
  nameInput.value = nameValue;
  jobInput.value = jobValue;
  popup.classList.toggle('popup_opened');
}

function popupOverlayClickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    showPopupTuggle();
  }
} 

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameValue = nameInput.value;
  jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
    showPopupTuggle()
}

editButton.addEventListener('click', showPopupTuggle);
closeButton.addEventListener('click', showPopupTuggle);
popup.addEventListener('click', popupOverlayClickHandler);
popup.addEventListener('submit', formSubmitHandler);
