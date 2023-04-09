import classNames from 'classnames/bind'
import styles from './ListTodo.module.scss'

const cx = classNames.bind(styles)

function ListTodo({ children }) {
    return <div className={cx('wrapper')}>{children}</div>
}

export default ListTodo
