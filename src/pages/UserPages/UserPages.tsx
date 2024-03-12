import { useQuery } from 'react-query'
import { Card } from '../../components/Card/Card'
import { InputSearch } from '../../components/InputSearch/InputSearch'
import { Statistic } from '../../components/Statistic/Statistic'
import style from './UserPages.module.css'
import { getUser } from '../../Api/getUser'
import { useState } from 'react'

export const UserPages: React.FC = () => {
	const [filterValue, setFilterValue] = useState<string>('Search')
	const { refetch } = useQuery('userData', getUser)

	return (
		<div className={style.container}>
			<div className={style.header}>
				<InputSearch setFilterValue={setFilterValue} />
				<div className={style.headerText} onClick={() => refetch()}>
					Refresh Users
				</div>
			</div>
			<div className={style.content}>
				<Card filterValue={filterValue} />
				<Statistic />
			</div>
		</div>
	)
}
