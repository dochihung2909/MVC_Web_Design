import classNames from 'classnames/bind'
import { useContext, useState } from 'react'
import ListItem from '~/components/ListItem'
import ListTodo from '~/components/ListTodo'
import Note from '~/components/Note'
import { NoteContext } from '~/context'
import Button from '~/components/Button'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content({ profile }) {
    const { notes } = useContext(NoteContext)

    const [selected, setSelected] = useState({})
    const [isCreate, setIsCreate] = useState(false)

    console.log(isCreate, selected)

    const handleChangeSelected = (note) => {
        setSelected(note)
        setIsCreate(false)
    }

    const handleCreate = () => {
        setIsCreate(true)
    }

    return (
        <div className={cx('wrapper')}>
            <ListTodo className={cx('list-todo', 'col-lg-3 col-sm-1 col-1')}>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <ListItem
                            className={cx('list-item', { active: selected.id === note.id })}
                            key={note.id}
                            title={note.title}
                            desc={note.desc}
                            onClick={() => handleChangeSelected(note)}
                        ></ListItem>
                    ))
                ) : (
                    <span className={cx('empty-note')}>You don't have any note!</span>
                )}
            </ListTodo>
            {isCreate && (
                <Note
                    author={profile.name}
                    setSelected={setSelected}
                    setIsCreate={setIsCreate}
                    newId={(notes[notes.length - 1]?.id || 0) + 1}
                    isCreate={isCreate}
                    className={cx('note-wrapper', 'col-xl-9 col-lg-11 col-md-11 col-sm-11 col-10-2')}
                ></Note>
            )}
            {Object.keys(selected).length > 0 && (
                <Note
                    setIsCreate={setIsCreate}
                    author={profile.name}
                    setSelected={setSelected}
                    note={selected}
                    className={cx('note-wrapper', 'col-xl-9 col-lg-11 col-md-11 col-sm-11 col-10-2')}
                ></Note>
            )}

            <Button
                onClick={handleCreate}
                className={cx('add-note', 'btn btn-primary')}
                iconLeft={<i className="fa-solid fa-pencil"></i>}
                title={'New Note'}
            ></Button>
        </div>
    )
}

export default Content
