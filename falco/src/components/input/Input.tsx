import { Box } from "@chakra-ui/layout";
import React, { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { textarea?: boolean }
>(({ textarea, ...props }, ref) => {
  const myStyle = {
    width: "100%",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(169,169,169)",
  };
  return textarea ? (
    <Box>
      <textarea ref={ref as any} style={myStyle} {...(props as any)} />
    </Box>
  ) : (
    <Box>
      <input ref={ref} style={myStyle} {...props} />
    </Box>
  );
});
