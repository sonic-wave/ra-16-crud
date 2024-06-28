import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Note, NoteProps } from './components/Note/Note'
import { Input } from './components/Input/Input'
import { NotesUpdate } from './components/NotesUpdate/NotesUpdate'

function App() {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const isInitialLoad = useRef(true);

  const localhost = 'http://localhost:7377/notes';

  interface dataProps {
    id?: number,
    content?: string,
    method: string
  }

  async function createRequest(data: dataProps) {
    if (data.method === 'GET') {
      try {
        const response = await fetch(localhost);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched notes GET:", result);
        setNotes([...result]);

      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }

    if (data.method === 'POST') {
      try {
        const response = await fetch(localhost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify({ content: data.content })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await createRequest({ method: 'GET' });
      } catch (error) {
        console.error('Failed to post notes:', error);
      }
    }

    if (data.method === 'DELETE') {
      try {
        const response = await fetch(`${localhost}${data.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await createRequest({ method: 'GET' });
      } catch (error) {
        console.error('Failed to post notes:', error);
      }
    }
  }

  useEffect(() => {
    if (isInitialLoad.current) {
      createRequest({ method: 'GET' });
      isInitialLoad.current = false;
      console.log('initial');
    }
  }, []);

  const onClickHandler = (value: string) => {
    const data = {
      content: value,
      method: 'POST'
    }

    createRequest(data);
  }

  const onDeleteHandler = (id: number) => {
    const data = {
      id: id,
      method: 'DELETE'
    }

    createRequest(data);
  }

  const updateHandler = () => {
    const data = {
      method: 'GET'
    }
    createRequest(data)
  }

  return (
    <>
    <NotesUpdate updateHandler={updateHandler}/>
      <div className='notes-container'>
        {notes.map(note => (
          <Note key={note.id} note={note} onDeleteHandler={onDeleteHandler} />
        ))}
      </div>
      <Input onClickHandler={onClickHandler} />
    </>
  )
}

export default App
