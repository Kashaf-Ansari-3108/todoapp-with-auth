import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Header from "./Header.js";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [updateInput, setupdateInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const user = localStorage.getItem("uid");
 console.log('userDeta',userDetails);
  const navigate = useNavigate();
  ///CREATE COLLECTION
  const dbCollection = collection(db, "todoCollection");
 useEffect(() => {
   if (!user) {
       navigate("/");
     }
   }, []);
  useEffect(() => {
    async function getItem() {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserDetails(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
     
    }
    getItem();
  }, []);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(dbCollection);
      const arr = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().todoValue}`);
        arr.push({
          id: doc.id,
          value: doc.data().todoValue,
        });
        setTodos([...arr]);
      });
    }
    getData();
  }, [refresh]);
  console.log(todos);
  const add = async (e) => {
    if (todo == "") {
      e.disabled = true;
    } else {
      const obj = {
        todoValue: todo,
      };
      const addTodo = await addDoc(dbCollection, obj);
      setRefresh(!refresh);
      setTodo("");
    }
  };
  const delTodo = async (i) => {
    const id = todos[i].id;
    const dbRef = doc(db, "todoCollection", id);
    await deleteDoc(dbRef);
    todos.splice(i, 1);
    setTodos([...todos]);
  };
  const updateTodo = async (i, e) => {
    if (updateInput === "") {
      e.disabled = true;
    } else {
      ///update firebase collection
      const id = todos[i].id;
      const dbRef = doc(db, "todoCollection", id);
      await updateDoc(dbRef, {
        todoValue: updateInput,
      });
      todos.splice(i, 1, { value: updateInput, id });
      setTodos([...todos]);
      setIndexNumber("");
      setupdateInput("");
    }
  };
  const editTodo = (i) => {
    setupdateInput(todos[i].value);
  };
  const logoutHandler = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };

  return (
    <>
    
      <div id="todos">
        <div className="heading">
          <Header logoutHandler={logoutHandler} userDetails={userDetails}/>
          <h1>Add Todo List</h1>

         
        </div>
        <div className="todo-input-container">
          <input
            id="todoItem"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="todo_input"
            type="text"
            placeholder="Add Task..."
          />
          <i className="fas fa-plus add-item" onClick={(e) => add(e)}></i>
        </div>
      </div>
      <div className="todo-list-container">
        {todos.map((todo, i) => (
          <ul key={i} id="todoList">
            {indexNumber === i ? (
              <>
                <div className="updateInput">
                  <input
                    autoFocus
                    className="update"
                    value={updateInput}
                    onChange={(e) => setupdateInput(e.target.value)}
                    type="text"
                  />
                  <i
                    onClick={(e) => updateTodo(i, e)}
                    className="fas fa-plus add-item updateBtn"
                    aria-hidden="true"
                  ></i>
                </div>
              </>
            ) : (
              <li className="todoList">
                {todo.value}
                <i
                  className="fas fa-edit editBtn"
                  onClick={() => {
                    setIndexNumber(i);
                    editTodo(i);
                  }}
                ></i>
                <i
                  className="fas fa-trash-alt  delBtn"
                  onClick={() => delTodo(i)}
                ></i>
              </li>
            )}
          </ul>
        ))}
      </div>
    </>
  );
};

export default TodoApp;
