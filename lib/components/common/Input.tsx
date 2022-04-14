import React from "react";

const Input = (props: JSX.IntrinsicElements["input"]) => {
  return (
    <input
      {...props}
      className={
        "p-2 my-2 rounded-md bg-transparent border-2 border-gray-400 outline-none disabled:opacity-50 " +
        props.className
      }
    />
  );
};

export default Input;
