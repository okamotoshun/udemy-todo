import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { FormControl, TextField, List } from '@material-ui/core';
import { db } from './firebase';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import styles from './App.module.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '40%',
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/firebase</h1>
      <div>
        <FormControl>
          <TextField
            className={classes.field}
            InputLabelProps={{
              shrink: true,
            }}
            value={input}
            label='new task?'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }></TextField>
        </FormControl>
        <button
          disabled={!input}
          onClick={newTask}
          className={styles.app__icon}>
          <AddToPhotosIcon />
        </button>
      </div>

      <List className={classes.field}>
        {tasks.map((task) => (
          <TaskItem id={task.id} title={task.title} key={task.id} />
        ))}
      </List>
    </div>
  );
};

export default App;
