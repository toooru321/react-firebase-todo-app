import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { CgPlayListAdd } from 'react-icons/cg';
import TodoList from './TodoList';
import DB from './db/firebase.js';
import firebase from 'firebase';

function Todo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // ファイヤーベースからデータ取得　
  useEffect(() => {
    DB.collection('todos') //ここに自分のコレクション名
      .orderBy('time', 'desc')
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data().time));
        setTodos(
          snapshot.docs.map((doc) => ({　//ここに自分のアプリの構成に合わせてデータセット
            id: doc.id,
            todo: doc.data().todo,
            date: doc.data().date,
          }))
        );
      });
  }, []);

  //ここが仕事登録作業
  const handleChange = (e) => {
    setInput(e.target.value);
    // console.log(input);
  };

  // これが時間取得　（サーバ側で取得できない？）
  const toDate = () => {
    let date = new Date();
    const today = date.toDateString();
    return today;
  };

  // ボタン押したらファーヤーベースに仕事登録
  const addTodos = (e) => {
    // console.log('object');

    //if empty
    if (input === '') {
      e.preventDefault();
      console.log('Type Something ');
    } else {
      //insert into firebase
      e.preventDefault();
      DB.collection('todos').add({
        todo: input,
        time: firebase.firestore.FieldValue.serverTimestamp(),// これと下の行のちがいは？
        date: toDate(),
      });
      //separate
      setTodos([...todos, input]);　//ここがtodoリスト登録　セパレートの意味を調べる
      setInput('');
    }
  };

  //ここから実際のホームページ
  return (
    <div>
      <h1>
        Todo App
        <span role="img" aria-label="fire">
          🔥
        </span>
      </h1>

      <form>
        <TextField
          label="Add a task..."
          type="text"
          variant="outlined"
          value={input}
          onChange={handleChange}
        />
        <span className="space"></span>
        <Button
          onClick={addTodos}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!input}　//ここのdisableの意味　inputが空なら何かしている
        >
          <CgPlayListAdd className="add-btn" /> Add　
        </Button>
      </form>

      <ul className="todo-list">　
        {todos.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
