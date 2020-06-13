import React from 'react';

import { CustomButtonContainer } from './CustomButton.styles';

export const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;