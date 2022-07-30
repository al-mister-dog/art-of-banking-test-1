import React from "react";

type TextOwnProps<E extends React.ElementType> = {
  as?: E;
  bold?: boolean;
  children: React.ReactNode;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>;

export const Text = <E extends React.ElementType = "p">({
  as,
  bold,
  children,
}: TextProps<E>) => {
  const Component = as || "p";
  return <Component>{children}</Component>;
};
