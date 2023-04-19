import getCursorPos from './get-cursor-pos';

const moveMagnifier = (e, prevState, setStateFunc) => {
  const img = e.target;
  const glass = document.getElementById('magnifier-glass');
  const zoom = 4;

  const { cursorX, cursorY } = getCursorPos(e, img);

  const halfGlassWidth = glass.offsetWidth / 2;
  const halfGlassHeight = glass.offsetHeight / 2;

  const scaledHalfGlassWidth = halfGlassWidth / zoom;
  const scaledHalfGlassHeight = halfGlassHeight / zoom;

  const maxPosX = img.width - scaledHalfGlassWidth;
  const maxPosY = img.height - scaledHalfGlassHeight;

  e.preventDefault();

  let posX = cursorX;
  let posY = cursorY;

  /* Prevent the magnifier glass from being positioned outside the image: */
  if (posX > maxPosX) {
    posX = maxPosX;
  } else if (posX < scaledHalfGlassWidth) {
    posX = scaledHalfGlassWidth;
  }

  if (posY > maxPosY) {
    posY = maxPosY;
  } else if (posY < scaledHalfGlassHeight) {
    posY = scaledHalfGlassHeight;
  }

  const magnifiedWidth = img.width * zoom;
  const magnifiedHeight = img.height * zoom;
  const magnifiedX = posX * zoom - halfGlassWidth;
  const magnifiedY = posY * zoom - halfGlassHeight;

  /* Display what the magnifier glass "sees": */
  setStateFunc({
    ...prevState,
    backgroundSize: `${magnifiedWidth}px ${magnifiedHeight}px`,
    backgroundPosition: `-${magnifiedX}px -${magnifiedY}px`,
  });
};

export default moveMagnifier;
