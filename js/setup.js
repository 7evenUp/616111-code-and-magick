'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция генерирует случайное число в промежутке [min;max);
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция получения случайного индекса массива
var getRandArrayIndex = function (arr) {
  return getRandomInteger(0, arr.length);
};

// Создаём данные для отображения мага
var createWizardElement = function () {
  return {
    name: NAMES[getRandArrayIndex(NAMES)] + ' ' + SECOND_NAMES[getRandArrayIndex(SECOND_NAMES)],
    coatColor: COAT_COLORS[getRandArrayIndex(COAT_COLORS)],
    eyesColor: EYES_COLORS[getRandArrayIndex(EYES_COLORS)]
  };
};

// Заполняем шаблон сгенерированными данными
var cloneWizards = function (arr) {
  var similarWizardTemplate = document.querySelector('template').content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
  wizardElement.querySelector('.wizard-coat').style.fill = arr.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;
  return wizardElement;
};

// Отрисовываем шаблон с магами на страницу
var renderWizards = function () {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');
  var wizards = [];
  var fragment = document.createDocumentFragment();
  var similarListItem = document.querySelector('.setup-similar-list');
  for (var i = 0; i < 4; i++) {
    wizards.push(createWizardElement());
    fragment.appendChild(cloneWizards(wizards[i]));
  }
  similarListItem.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};
renderWizards();
