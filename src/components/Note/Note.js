import classNames from 'classnames/bind'
import { useEffect, useRef, useState, useContext } from 'react'
import Button from '../Button'
import styles from './Note.module.scss'
import { NoteContext } from '~/context'

const cx = classNames.bind(styles)

function Note({ newId, isCreate, className, note, setIsCreate, setSelected }) {
    const titleRef = useRef(false)
    const descRef = useRef(false)
    const { notes, addNote, removeNote } = useContext(NoteContext)
    const [isUpdated, setIsUpdated] = useState(false)
    const [newNote, setNewNote] = useState(
        isCreate
            ? {
                  author: '',
                  id: notes.length + 1,
                  title: !isCreate ? note.title : 'Welcome to NOTE APP!',
                  comment: [],
                  createdAt: new Date().toLocaleString('vi-VN'),
                  updatedTime: isCreate ? '' : note.updatedTime,
                  desc: !isCreate
                      ? note.desc
                      : `Welcome to our note-taking app! This app is designed to help you keep track of all your important notes and ideas in one convenient place. With this app, you can easily create, organize, and access your notes from anywhere and at any time. Now, you can focus on what matters most to you.`,
              }
            : { ...note },
    )

    useEffect(() => {
        if (newNote.id < newId) {
            setNewNote((prev) => ({
                ...prev,
                id: newId,
                createdAt: new Date().toLocaleString('vi-VN'),
            }))
        }
    }, [newId])

    const handleChangeDesc = () => {
        const newDesc = descRef.current.textContent
        if (newDesc !== newNote.desc) {
            setIsUpdated(true)
            setNewNote((prev) => ({
                ...prev,
                desc: newDesc,
                updatedTime: new Date().toLocaleString('vi-VN'),
            }))
        }
    }

    const handleChangeTitle = () => {
        const newTitle = titleRef.current.textContent
        if (newTitle !== newNote.title) {
            setIsUpdated(true)
            setNewNote((prev) => ({
                ...prev,
                title: newTitle,
                updatedTime: new Date().toLocaleString('vi-VN'),
            }))
        }
    }

    const handleAddNote = () => {
        addNote(newNote)
        setIsCreate(false)
        setSelected(newNote)
    }

    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('header')}>
                <div>
                    <h2
                        onBlur={handleChangeTitle}
                        ref={titleRef}
                        contentEditable="plaintext-only"
                        className={cx('title')}
                        suppressContentEditableWarning={true}
                    >
                        {newNote.title}
                    </h2>
                    <div className={cx('modify-date')}>
                        <i>
                            {isCreate
                                ? ''
                                : isUpdated
                                ? `Updated at ${newNote.updatedTime}`
                                : `Created at ${newNote.createdAt}`}
                        </i>
                    </div>
                </div>
                <Button
                    onClick={isCreate && handleAddNote}
                    className={cx('submit-btn', 'btn', { 'btn-danger': !isCreate, 'btn-success': isCreate })}
                    title={isCreate ? 'Create' : 'Delete'}
                    iconLeft={!isCreate ? <i className="fa-solid fa-trash"></i> : <i className="fa-solid fa-plus"></i>}
                ></Button>
            </div>
            <div className={cx('body')}>
                <p
                    onBlur={handleChangeDesc}
                    ref={descRef}
                    contentEditable="plaintext-only"
                    className={cx('note-detail')}
                    suppressContentEditableWarning={true}
                >
                    {newNote.desc}
                </p>
            </div>
        </div>
    )
}

export default Note
