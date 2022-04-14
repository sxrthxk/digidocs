import React from "react";

const Card = ({ children }: { children: JSX.Element | string }) => {
  return <div className="max-w-md m-auto my-6 rounded-md drop-shadow-lg bg-gray-200">{children}</div>;
};

export default Card;
