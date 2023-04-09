import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header({ username }) {
    return (
        <div className="border-bottom">
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img src="https://web-design-2023.netlify.app/assets/logo-b5329152.png" alt="logo" />
                </div>
                <div className={cx('search')}>
                    <input placeholder="Search"></input>
                </div>
                <div className={cx('menu')}>
                    <div className={cx('user')}>
                        <img
                            className={cx('user-avt')}
                            src="https://lh3.googleusercontent.com/a/AGNmyxZYPXABMR7lWvQj-hgQ5IoyoskM-PirQQ3AZCgAMg=s96-c"
                            alt="avatar"
                        ></img>
                        <h4 className={cx('user-name')}>Hello World</h4>
                    </div>
                    <Button className={cx('logout-btn', 'btn btn-danger')} title="Đăng xuất"></Button>
                </div>
            </div>
        </div>
    )
}

export default Header
