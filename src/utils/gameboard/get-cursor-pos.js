const getCursorPos = (e, imgElement) => {
  /* Get the x and y positions of the image: */
  const imgRect = imgElement.getBoundingClientRect();
  /* Calculate the cursor's x and y coordinates, relative to the image: */
  let cursorX = e.pageX - imgRect.left;
  let cursorY = e.pageY - imgRect.top;
  /* Consider any page scrolling: */
  cursorX -= window.pageXOffset;
  cursorY -= window.pageYOffset;
  return { cursorX, cursorY, imgRect };
};

export default getCursorPos;
