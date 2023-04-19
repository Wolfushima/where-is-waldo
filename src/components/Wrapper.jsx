import React from 'react';

const Wrapper = ({ className, children }) => (
  <div className={`${className}__wrapper`}>
    <div className={`${className}__container`}>{children}</div>
  </div>
);

export default Wrapper;
