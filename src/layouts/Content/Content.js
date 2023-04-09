import classNames from 'classnames/bind'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content() {
    return <div className={cx('wrapper')}></div>
}

export default Content
