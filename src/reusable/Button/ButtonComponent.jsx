import React from "react";
import { Button } from "antd"; // Import Button from Ant Design

const ButtonComponent = ({
  name = "dummy",
  type = "primary",
  size = "small",
  onClick = () => {},
  disabled = false,
  loading = false,
  icon = "",
  iconPosition = "start",
  bgColor = "",
  textColor = "#ffffff",
  btnStyle, // btnStyle extra button style if requred
}) => {
  return (
    <Button
      type={type} // Button style (e.g., primary, default, etc.)
      size={size} // Button size (e.g., small, middle, large)
      onClick={onClick} // Button click handler
      disabled={disabled} // Disable the button if true
      loading={loading} // Show a loading spinner if true
      icon={icon}
      iconPosition={iconPosition} // iconPosition (e.g., start, end)
      style={{ background: bgColor, color: textColor, ...btnStyle }}
    >
      {name} {/* Button content (text or icon) */}
    </Button>
  );
};

export default ButtonComponent;
