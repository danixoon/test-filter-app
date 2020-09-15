import * as React from "react";
import "./styles.scss";
import { mergeProps } from "../../utils";
import { Loader } from "react-feather";

interface LoadingBannerProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  isLoading: boolean;
}

const LoadingBanner: React.FC<LoadingBannerProps> = (
  props: LoadingBannerProps
) => {
  const { isLoading, ...rest } = props;
  return isLoading ? (
    <div {...mergeProps({ className: "loading-banner__background" }, rest)}>
      <div className="loader" />
    </div>
  ) : (
    <></>
  );
};

export default LoadingBanner;
