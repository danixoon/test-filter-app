export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

export const mergeClassNames = (
  ...names: (string | undefined | false | null)[]
) => {
  return names.filter((name) => typeof name === "string").join(" ");
};

export const mergeProps = <T, P>(
  ownProps: P = {} as P,
  newProps: React.HTMLAttributes<T>
): React.HTMLAttributes<T> & P => {
  return {
    ...ownProps,
    ...newProps,
    className: mergeClassNames((ownProps as any).className, newProps.className),
    style: { ...((ownProps as any).style ?? {}), ...(newProps.style ?? {}) },
  };
};
