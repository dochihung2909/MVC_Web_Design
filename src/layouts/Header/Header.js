import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header({ profile, onLogout }) {
    return (
        <div className="border-bottom">
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img src="https://web-design-2023.netlify.app/assets/logo-b5329152.png" alt="logo" />
                </div>
                <div className={cx('search', 'col-md-0')}>
                    <input placeholder="Search"></input>
                </div>
                <div className={cx('menu')}>
                    <div className={cx('user')}>
                        <img className={cx('user-avt')} src={profile.picture} alt="avatar"></img>
                        <h4 className={cx('user-name')}>{profile.name}</h4>
                    </div>
                    <Button
                        onClick={onLogout}
                        className={cx('logout-btn', 'btn btn-danger')}
                        title="Đăng xuất"
                    ></Button>
                </div>
            </div>
        </div>
    )
}

export default Header
