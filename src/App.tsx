import {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import { useAppDispatch } from 'hooks/reduxHooks';
import { getTodos } from "store/slices/todos/thunk";
import TodoForm from 'components/TodoForm';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


const App = () => {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch])



  return (
      <div className="root">
        <TodoList />
        <TodoResults />
        <TodoForm/>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>

  );
};

export default App;
