import { CardDTO } from '../types/Card'
import styles from './Card.module.scss'

interface Props {
    data:CardDTO
    handleDialog:(eventValue:boolean)=>void
    handleSetData:(eventValue:CardDTO)=>void
}

const Card = ({data, handleDialog, handleSetData}:Props) => {
    const openDialog = () => {
        handleDialog(true)
        handleSetData(data)
    }

    return (
        <div className={styles.card} onClick={openDialog}>
            <img src={data.urls.small} alt={data.alt_description} className={styles.card__image}/>
        </div>
    )
}

export default Card