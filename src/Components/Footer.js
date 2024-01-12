import React from "react";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">
      <h3>Copyright &copy; {today.getFullYear()} </h3>
    </footer>
  );
};

export default Footer;
