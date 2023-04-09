import classNames from 'classnames/bind'
import styles from './ListItem.module.scss'

const cx = classNames.bind(styles)

function ListItem({ onClick, className, title, desc }) {
    return (
        <div onClick={onClick} className={cx('wrapper', { [className]: className })}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('desc')}>{desc}</p>
        </div>
    )
}

export default ListItem
