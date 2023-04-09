import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Button({ className, onClick, iconLeft, iconRight, title }) {
    return (
        <button onClick={onClick} className={cx('wrapper', { [className]: className })}>
            {iconLeft && <span>{iconLeft}</span>}
            <span className={cx('title')}>{title}</span>
            {iconRight && <span>{iconRight}</span>}
        </button>
    )
}

export default Button
