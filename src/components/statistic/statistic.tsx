import React from "react";
import style from "./statistic.module.css";
import { useQuery } from "react-query";
import { getUser } from "../../utils/getUser";
import { typesUser } from "../../utils/typesUser";
import calculateAgeStatistics from "../../utils/staticAge";
import calculateGenderStatistics from "../../utils/staticGender";
import { StatCom } from "./statCom/statcom";

export const Statistic: React.FC = () => {
  const { data, isSuccess } = useQuery<typesUser>("userData", getUser);

  const ages = isSuccess ? data.results.map((user) => user.dob.age) : [];
  const ageStatistics = calculateAgeStatistics(ages);

  const genders = isSuccess ? data.results.map((user) => user.gender) : [];
  const genderStatistics = calculateGenderStatistics(genders);

  return (
    <div className={style.containerStat}>
      <div className={style.statCountUser}>{data?.results.length} Users</div>
      <div className={style.hr}></div>
      <StatCom statistics={ageStatistics} title="Age Statistics" />
      <div className={style.hr}></div>
        <StatCom statistics={genderStatistics} title='Gender Groups'/>
    </div>
  );
};
