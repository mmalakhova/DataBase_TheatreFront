import styles from './NewsCard.module.scss';
import React from 'react';


console.log(styles)

function NewsCard(props) {
    // const onClickNews = () => {
    //     alert(props.date)
    // }
    return (
        <div className={styles.newsCard} /*onClick={onClickNews}*/>
            <img width={520} height={210} src={props.imageUrl} alt="" />
            <p>
                <b>{props.date}</b>
            </p>
            <p>
                <span>{props.title}</span>
            </p>
            <div>
                <div>
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;
