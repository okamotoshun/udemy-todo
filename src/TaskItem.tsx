import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import * as firebase from 'firebase/app';
import { Grid, ListItem, TextField } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { db } from './firebase';

interface Props {
  id: string;
  title: string;
  // kye: string;
}

const TaskItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify='flex-end'>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label='Edit task'
          value={title}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setTitle(e.target.value)}
        />
      </Grid>
      <button onClick={editTask} className={styles.taskitem__icon}>
        <EditOutlinedIcon />
      </button>
      <button onClick={deleteTask} className={styles.taskitem__icon}>
        <DeleteOutlinedIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
