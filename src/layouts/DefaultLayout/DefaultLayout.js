import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '~/layouts/Header'
import Content from '../Content'

const cx = classNames.bind(styles)

function DefaultLayout() {
    return (
        <div className={cx('wrapper', 'container')}>
            <Header></Header>
            <div className={cx('body')}>
                <Content></Content>
            </div>
        </div>
    )
}

export default DefaultLayout
