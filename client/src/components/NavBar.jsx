const NavBar = ({ title, children }) => {
  return (
    <nav>
      <h3>{title}</h3>
      {children}
    </nav>
  );
};

export default NavBar;
