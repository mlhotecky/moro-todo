import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toastr} from "react-redux-toastr";
import {Grid} from "react-flexbox-grid";
import Modal from "react-modal";
import {createTodo, PENDING} from "./redux/actions/todos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import CreateUpdateTodoForm from "./forms/CreateUpdateTodoForm";
import "./App.scss";
import ModalForm from "./components/Modals/ModalForm";

Modal.setAppElement("#root");


export default function App() {
    const dispatch = useDispatch();
    const getTodoStatus = useSelector(state => state.todos.todoStatus);
    const [onlyCompleted, setOnlyCompleted] = useState(false);
    const [createTodoModal, setCreateTodoModal] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleCreateTodo(text) {
        setLoading(true);
        dispatch(createTodo(text,
            () => {
                toastr.success("Success!", "Todo successfully added.")
            },
            (error) => {
                toastr.error(`${error}`, "Error occurred while adding todo.")
            },
            () => {
                setLoading(false);
            }
            ),
        )
    }

  return (
      <div className="app-layout">
          <ModalForm
              modalWidth="600px"
              isOpen={createTodoModal}
              closeModal={() => setCreateTodoModal(false)}
              formComponent={(props) => <CreateUpdateTodoForm todoObject={props} />}
              headerText="Create new Todo"
              actionHandler={handleCreateTodo}
              actionText="Create"
              actionPending={loading}
          />
          <Header/>
          <Grid className="app-content">
              {getTodoStatus !== PENDING && <div className="app-buttons-wrapper">
                  <div
                      className="app-button"
                      onClick={() => setCreateTodoModal(true)}>
                      Add todo
                  </div>
                  <div
                      className="app-button"
                      onClick={() => setOnlyCompleted(!onlyCompleted)}>
                      {`${onlyCompleted ? "Show all" : "Show completed"}`}
                  </div>
              </div>}
              <TodoList onlyCompleted={onlyCompleted}/>
          </Grid>
          <Footer/>
      </div>
  );
}
