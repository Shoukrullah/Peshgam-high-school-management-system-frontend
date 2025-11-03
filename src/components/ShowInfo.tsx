import styles from "./ShowDashboard.module.css";

interface Props {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
}

function ShowInfo({ children, icon, label }: Props) {
  const colorTaker = (label: string) => {
    if (label === "All Branches") {
      return {
        color: "#4338ca",
        bgColor: "#e0e7ff",
      };
    } else if (label === "Total Classes") {
      return {
        color: "#15803d",
        bgColor: "#dcfce7",
      };
      
    } else if (label === "Total Teachers") {
      return {
        color: "#0369a1",
        bgColor: "#e0f2fe",
      };
    } else if(label === 'Class') {
      return {
        color: "#15803d",
        bgColor: "#dcfce7",
      };
    }
    
    
    else {
      return {
        bgColor: "#fef9c3",
        color: "#a16207",
      };
    }
  };
  const { bgColor, color } = colorTaker(label);

  return (
    <div className={styles.showComponentContainer}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor, color }}
      >
        {icon}
      </div>
      <div>
        <p>{label}</p>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default ShowInfo;
