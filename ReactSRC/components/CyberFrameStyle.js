import React from 'react';
import "../styles/cyberFrameStyle.scss";

const CyberFrameStyle = ({classAdd }) => {

  if (!classAdd) {
    classAdd = '';
  }

  return (
    <div className={classAdd +  " cyberFrameStyle"}>
    </div>
  );
};

export default CyberFrameStyle;