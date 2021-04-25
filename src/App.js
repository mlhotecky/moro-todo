import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {toastr} from "react-redux-toastr";
import {Grid} from "react-flexbox-grid";
import Modal from "react-modal";
import {createTodo} from "./redux/actions/todos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateUpdateTodoForm from "./forms/CreateUpdateTodoForm";
import "./App.scss";
import ModalForm from "./components/Modals/ModalForm";

Modal.setAppElement("#root");


export default function App() {
    const dispatch = useDispatch();
    const [createTodoModal, setCreateTodoModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] = useState(null);

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
                setTodo(null);
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
          <Header />
          <Grid className="app-content">
          </Grid>
          <Footer />
      </div>
  );
}
