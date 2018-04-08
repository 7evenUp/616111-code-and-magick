'use strict';

var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var BAR_COLOR_DEFAULT = 'rgba(255, 0, 0, 1)';
var FONT_COLOR = 'rgba(0, 0, 0, 1)';
var CLOUD_HEIGHT = 270;
var BAR_HEIGHT = 150;
var CLOUD_WIDTH = 420;
var BAR_WIDTH = 40;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var TITLE_TEXT = ['Ура вы победили!', 'Список результатов:'];
var FONT = '16px PT Mono';

window.renderStatistics = function (ctx, names, times) {
  var drawCloud = function () {
    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = CLOUD_COLOR;
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var titleGapY = CLOUD_Y;
  var drawTitle = function (text) {
    var titlePosX = CLOUD_X + 24;
    var titlePosY = CLOUD_Y + 16;
    ctx.font = FONT;
    ctx.fillStyle = FONT_COLOR;
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'start';
    for (var i = 0; i < text.length; i++) {
      ctx.fillText(text[i], titlePosX, titlePosY);
      titlePosY += 18;
    }
    titleGapY += titlePosY;
  };

  var renderBar = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var renderText = function (text, x, y) {
    ctx.font = FONT;
    ctx.fillStyle = FONT_COLOR;
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  };

  var drawCharts = function () {
    var maxTime = getMaxElement(times);
    var beginPosX = CLOUD_X + BAR_GAP;
    for (var i = 0; i < 4; i++) {
      var currentBarHeight = Math.floor((times[i] * BAR_HEIGHT) / maxTime);
      var posX = beginPosX + (BAR_GAP + BAR_WIDTH) * i;
      var textPosX = posX + BAR_WIDTH / 2;
      var timePosY = titleGapY + (BAR_HEIGHT - currentBarHeight);
      var barPosY = titleGapY + GAP + (BAR_HEIGHT - currentBarHeight);
      var namePosY = barPosY + currentBarHeight + GAP / 2;
      var color = names[i] === 'Вы' ? BAR_COLOR_DEFAULT : getRandomColor();
      var time = String(Math.round(times[i]));
      renderText(time, textPosX, timePosY);
      renderBar(posX, barPosY, BAR_WIDTH, currentBarHeight, color);
      renderText(names[i], textPosX, namePosY);
    }
  };

  drawCloud();
  drawTitle(TITLE_TEXT);
  drawCharts();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomColor = function () {
  return 'rgb(35, ' + getRandomInteger(35, 256) + ', 255)';
};
