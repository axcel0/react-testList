import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './App.css'

export default function App() {
  const [listPeople, setListPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => {
        return setListPeople(data.results);
      });
  }, []);

  const deleteItem = (indexParam) => {
    const newList = listPeople.filter((el, index) => {
      return index !== indexParam;
    });
    setListPeople(newList);
  };

  const getPeople = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((response) => response.json())
      .then((data) => {
        const newData = [...listPeople];
        newData.push(data.results[0]);
        console.log(data.results);
        setListPeople(newData);
      });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedName(listPeople[index].name.first);
  };

  const saveEditedName = () => {
    const newList = [...listPeople];
    newList[editingIndex].name.first = editedName;
    setListPeople(newList);
    setEditingIndex(-1);
    setEditedName("");
  };

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Num</th>
            <th>Name</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listPeople.map((el, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  el.name.first
                )}
              </td>
              <td>{el.location.country}</td>
              <td>{el.phone}</td>
              <td>
                {editingIndex === index ? (
                  <button onClick={saveEditedName}>Save</button>
                ) : (
                  <>
                    <button
                      style={{ marginRight: 10, marginLeft: 10 }}
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteItem(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <button onClick={getPeople}>Get More</button>
    </div>
  );
}
