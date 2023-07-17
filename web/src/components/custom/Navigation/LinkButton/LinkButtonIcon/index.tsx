import React, { ElementType, ReactElement } from "react";
interface ILinkButtonIconProps {
  icon: ElementType;
}
function LinkButtonIcon({ icon: Icon }: ILinkButtonIconProps) {
  return (
    <span className="p-1 md:pr-2 md:pl-0">
      <Icon className="h-3 w-3" />
    </span>
  );
}

export default LinkButtonIcon;
