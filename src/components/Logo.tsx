import { useNavigate } from "react-router-dom";
import logo from "../assets/pictures/QuranKarim.webp";
import styles from "./Logo.module.css";
function Logo() {
  const navigate = useNavigate();
  const handelClick = ()=> {
    navigate('/')
  }
  return (
    <div className={styles.LogoContainer} onClick={handelClick}>
      <img src={logo} alt="Peshgam logo" />
    </div>
  );
}

export default Logo;
