import React from "react";
import cn from "classnames";

const Header: React.SFC<React.HTMLAttributes<HTMLHeadElement>> = props => (
  <React.Fragment>
    <h1 {...props} className={cn(props.className, "")} />
    <style jsx>{`
      h1 {
        text-align: center;
        font-family: "Open Sans", "Helvetica Neue", sans-serif;
      }
    `}</style>
  </React.Fragment>
);

export default Header;
