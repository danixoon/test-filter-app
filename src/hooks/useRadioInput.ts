import * as React from "react";

export const useRadioInput = function <T = any>(defaultValue: T = {} as T) {
  const [input, setInput] = React.useState<T>(() => defaultValue);

  const bind = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({
        ...(Object.fromEntries(
          Object.entries(input).map(([key]) => [key, false])
        ) as any),
        [e.target.name]: true,
      });
    },
  };

  return [bind, input, setInput] as [typeof bind, T, typeof setInput];
};
