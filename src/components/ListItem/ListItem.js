import classNames from 'classnames/bind'
import styles from './ListItem.module.scss'

const cx = classNames.bind(styles)

function ListItem({ title, body }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('body')}>{body}</p>
        </div>
    )
}

export default ListItem
