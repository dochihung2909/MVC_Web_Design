import classNames from 'classnames/bind'
import { useContext, useState } from 'react'
import ListItem from '~/components/ListItem'
import ListTodo from '~/components/ListTodo'
import Note from '~/components/Note'
import { NoteContext } from '~/context'
import Button from '~/components/Button'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content() {
    const { notes } = useContext(NoteContext)

    const [selected, setSelected] = useState({})
    const [isCreate, setIsCreate] = useState(false)

    const handleChangeSelected = (note) => {
        setSelected(note)
        setIsCreate(false)
    }

    const handleCreate = () => {
        setIsCreate(true)
    }

    return (
        <div className={cx('wrapper')}>
            <ListTodo className="col-3">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <ListItem
                            className={cx({ active: selected.id === note.id })}
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
            {isCreate ? (
                <Note
                    setSelected={setSelected}
                    newId={notes.length + 1}
                    setIsCreate={setIsCreate}
                    isCreate
                    className="col-9"
                ></Note>
            ) : (
                Object.keys(notes).length > 0 && <Note note={selected} className="col-9"></Note>
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
