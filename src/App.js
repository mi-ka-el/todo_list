import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  
  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteItem(id) {
  setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <Form onAddTask={handleAddTask}/>
      <TasksList tasks={tasks} onDeleteItem={handleDeleteItem}/>
    </div>
  )
}

function Form({ onAddTask }) {

  const [taskName, setTaskName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskName) return;

    const id = crypto.randomUUID();

    const newTasks = {
      taskName,
      id
    }

    onAddTask(newTasks);

    setTaskName('');

  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>todo list</h1>
      <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}/>
      <button>add</button>
    </form>
  )
}

function TasksList({ tasks, onDeleteItem }) {

  return (
    <ul className='list'>
      {tasks.map((task, i) => <ListItem task={task} key={task.id} num={i + 1} onDeleteItem={onDeleteItem}/>)}
    </ul>
  )
}

function ListItem({ task, num, onDeleteItem }) {
  
  function deleteItem() {
    onDeleteItem(task.id);
  }

  return (
    <li className='item-list'>
      {num + '.'}
      {' '}
      {task.taskName}
      <button onClick={deleteItem}>❌</button>
    </li>
  )
}

export default App;