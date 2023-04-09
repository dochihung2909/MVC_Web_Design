import classNames from 'classnames/bind'
import styles from './ListTodo.module.scss'

const cx = classNames.bind(styles)

function ListTodo({ className, children }) {
    return <div className={cx('wrapper', { [className]: className })}>{children}</div>
}

export default ListTodo
