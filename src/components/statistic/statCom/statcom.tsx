import style from "./staticom.module.css";

interface Statistics {
  [key: string]: number;
}

export const StatCom: React.FC<{ statistics: Statistics; title: string }> = (
  props
) => {
  const { statistics, title } = props;

  return (
    <div className={style.containerStat}>
      <h2>{title}</h2>
      {Object.entries(statistics).map(([key, value]) => (
        <div key={key} className={style.Group}>
          <div className={style.GroupLabel}>
          <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
          </div>
          <div className={style.GroupCount}>
          <div>{value <= 1 ? `${value} user` : `${value} users`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
