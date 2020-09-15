import * as React from "react";

export const useInput = function <T = any>(defaultValue: T = {} as T) {
  const [input, setInput] = React.useState<T>(() => defaultValue);

  const bind = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    },
  };

  return [bind, input] as [typeof bind, T];
};
