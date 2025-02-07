import styles from "./Header.module.css";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
