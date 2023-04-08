import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '~/layouts/Header'

const cx = classNames.bind(styles)

function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('body')}></div>
        </div>
    )
}

export default DefaultLayout
