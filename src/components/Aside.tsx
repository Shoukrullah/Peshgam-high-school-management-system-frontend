import navigationItems from "../utils/navigationItems";
import EachNav from "./EachNav";
import styles from "./Aside.module.css";
import Logo from "./Logo";

function Aside() {
  return (
    <aside className={styles.asideContainer}>
      <Logo />
      <NavItems />
    </aside>
  );
}

export default Aside;

// Because this component is not to too big, thus i make a child component inside it.
function NavItems() {
  return (
    <div>
      {navigationItems.map((item) => (
        <EachNav key={item.id} nav={item} />
      ))}
    </div>
  );
}
