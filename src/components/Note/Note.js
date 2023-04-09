import classNames from 'classnames/bind'
import { useEffect, useRef, useState, useContext } from 'react'
import Button from '../Button'
import styles from './Note.module.scss'
import { NoteContext } from '~/context'

const cx = classNames.bind(styles)

function Note({ newId, isCreate, className, note, setIsCreate, setSelected, author }) {
    const titleRef = useRef(false)
    const descRef = useRef(false)
    const cmtRef = useRef(false)

    const { notes, addNote, removeNote, updateNote } = useContext(NoteContext)
    const [isUpdated, setIsUpdated] = useState(false)
    const [newNote, setNewNote] = useState(
        isCreate
            ? {
                  author,
                  id: (notes[notes.length - 1]?.id || 0) + 1,
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

    const [showComment, setShowComment] = useState(false)

    useEffect(() => {
        if (newNote.id < newId) {
            setNewNote((prev) => ({
                ...prev,
                id: newId,
                createdAt: new Date().toLocaleString('vi-VN'),
            }))
        }
    }, [newId])

    useEffect(() => {
        if (!isCreate && note.id != newNote.id) {
            setNewNote(note)
            setShowComment(false)
        }
    }, [note])

    const handleChangeDesc = () => {
        const newDesc = descRef.current.textContent
        setIsUpdated(true)
        setNewNote((prev) => ({
            ...prev,
            desc: newDesc,
            updatedTime: new Date().toLocaleString('vi-VN'),
        }))
    }

    const handleChangeTitle = () => {
        const newTitle = titleRef.current.textContent
        setIsUpdated(true)
        setNewNote((prev) => ({
            ...prev,
            title: newTitle,
            updatedTime: new Date().toLocaleString('vi-VN'),
        }))
    }

    const handleAddNote = () => {
        addNote(newNote)
        setIsCreate(false)
        setSelected(newNote)
    }

    const handleAddCmt = (e) => {
        e.preventDefault()
        const newCmt = {
            title: cmtRef.current.textContent,
            author,
            createAt: new Date().toLocaleString('vi-VN'),
        }
        setNewNote((prev) => ({
            ...prev,
            comment: [...prev.comment, newCmt],
        }))
        updateNote(newNote.id, newNote)
        console.log(newCmt)
        cmtRef.current.textContent = ''
    }

    const handleDelete = () => {
        removeNote(newNote.id)
        setIsCreate(undefined)
        setSelected({})
    }

    useEffect(() => {
        updateNote(newNote.id, newNote)
    }, [newNote])

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
                            {!isCreate && ` by ${newNote.author}`}
                        </i>
                    </div>
                </div>
                <Button
                    onClick={isCreate ? handleAddNote : handleDelete}
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
            {!isCreate && (
                <div className={cx('comment')}>
                    <div className={cx('comment-wrapper')}>
                        <Button
                            onClick={() => setShowComment(!showComment)}
                            className={cx('comment-title', { showCmt: showComment })}
                            iconLeft={<i className="fa-solid fa-caret-right"></i>}
                            title="Add Comment"
                        ></Button>

                        {showComment && (
                            <>
                                <div
                                    className={cx('add-cmt')}
                                    contentEditable="plaintext-only"
                                    suppressContentEditableWarning={true}
                                    ref={cmtRef}
                                ></div>
                                <div>
                                    <Button
                                        onClick={handleAddCmt}
                                        iconLeft={<i class="fa-solid fa-paper-plane"></i>}
                                        className={cx('send-cmt-btn', 'btn btn-primary')}
                                        title={'Send'}
                                    ></Button>
                                </div>
                            </>
                        )}
                        <div className={cx('cmt-list')}>
                            {newNote.comment.map((cmt, index) => (
                                <div className={cx('cmt-wrapper')} key={index}>
                                    <i className={cx('cmt-info')}>
                                        Create at {cmt.createAt} by {cmt.author}
                                    </i>
                                    <div className={cx('cmt-title')}>{cmt.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Note
