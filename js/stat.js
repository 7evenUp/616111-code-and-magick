'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var SHADOW_GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {

  // Отрисовка белого фона с сообщением победы

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1');

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2);

  //

  var maxTime = getMaxElement(times);

  // Отрисовка гистограммы

  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = Math.floor((times[i] * BAR_HEIGHT) / maxTime)

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(String(Math.round(times[i])), CLOUD_X + BAR_GAP + BAR_WIDTH / 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 3 + (BAR_HEIGHT - currentBarHeight));

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(' + (30 * i) + ', ' + (255 - 40 * i) + ', 200)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 4 + (BAR_HEIGHT - currentBarHeight), BAR_WIDTH, currentBarHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + BAR_WIDTH / 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 4 + BAR_HEIGHT + GAP/2);
  }

};
