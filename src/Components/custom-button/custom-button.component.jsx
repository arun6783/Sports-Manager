import React from 'react';
import "./custom-button.component.styles.scss";
const FormButton = ({children,...otherProps}) => {
  return (
    <button className="custom-button" {...otherProps}>
      {children}
    </button>
  )
}

export default FormButton;
