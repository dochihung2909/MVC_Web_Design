import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '~/layouts/Header'
import Content from '~/layouts/Content'
import { NoteContext } from '~/context'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function DefaultLayout() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))

        return () => {}
    }, [notes])

    return (
        <NoteContext.Provider
            value={{
                notes,
                addNote(newNote) {
                    setNotes((prev) => {
                        return [...prev, newNote]
                    })
                },
                removeNote(id) {
                    const newNotes = [...notes]
                    newNotes.forEach((note) => {
                        if (note.id === id) {
                            note.delete = true
                        }
                    })
                },
                getLength() {
                    let length
                    setNotes((prev) => {
                        length = prev.length
                        return prev
                    })
                    return length
                },
            }}
        >
            <div className={cx('wrapper', 'container gx-0')}>
                <Header></Header>
                <Content></Content>
            </div>
        </NoteContext.Provider>
    )
}

export default DefaultLayout
