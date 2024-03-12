import React from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../../Api/getUser'
import { User } from '../../Types/User'
import calculateAgeStatistics from '../../utils/staticAge'
import calculateGenderStatistics from '../../utils/staticGender'
import { StatCom } from './Stat/Statcom'
import style from './Statistic.module.css'

export const Statistic: React.FC = () => {
	const { data, isSuccess } = useQuery<User>('userData', getUser)

	const ages = isSuccess ? data.results.map((user) => user.dob.age) : []
	const ageStatistics = calculateAgeStatistics(ages)

	const genders = isSuccess ? data.results.map((user) => user.gender) : []
	const genderStatistics = calculateGenderStatistics(genders)

	return (
		<div className={style.containerStat}>
			<div className={style.statCountUser}>{data?.results.length} Users</div>
			<div className={style.hr}></div>
			<StatCom statistics={ageStatistics} title="Age Statistics" />
			<div className={style.hr}></div>
			<StatCom statistics={genderStatistics} title="Gender Groups" />
		</div>
	)
}
