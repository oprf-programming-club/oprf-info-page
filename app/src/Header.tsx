import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  size = 1,
  ...props
}) => {
  const H = "h" + size;
  return (
    <React.Fragment>
      <H {...props} />
      <style jsx>{`
        * {
          text-align: center;
          font-family: "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Header;
