import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '~/layouts/Header'
import Content from '~/layouts/Content'
import { NoteContext } from '~/context'
import { useEffect, useState } from 'react'

import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const cx = classNames.bind(styles)

function DefaultLayout() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))

        return () => {}
    }, [notes])

    const [user, setUser] = useState([])
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')) || {})

    useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profile))

        return () => {}
    }, [profile])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    })
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [user])

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout()
        setProfile({})
    }

    return (
        <>
            <NoteContext.Provider
                value={{
                    notes,
                    addNote(newNote) {
                        setNotes((prev) => {
                            return [...prev, newNote]
                        })
                    },
                    removeNote(id) {
                        setNotes((prev) => {
                            return prev.filter((note) => note.id !== id)
                        })
                    },
                    updateNote(id, newNote) {
                        setNotes((prev) => {
                            return prev.map((note) => {
                                if (note.id === id) {
                                    return newNote
                                }
                                return note
                            })
                        })
                    },
                }}
            >
                {Object.keys(profile).length > 0 ? (
                    <div className={cx('wrapper', 'container-lg gx-0')}>
                        <Header profile={profile} onLogout={logOut}></Header>
                        <Content profile={profile}></Content>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
            </NoteContext.Provider>
        </>
    )
}

export default DefaultLayout
