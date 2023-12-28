import { useEffect, useState, useCallback } from 'react'
import Table from 'react-bootstrap/Table';
import './App.css'

export default function App() {
  const [listPeople, setListPeople] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedPerson, setEditedPerson] = useState({});

  const fetchPeople = useCallback(async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }, []);

  useEffect(() => {
    fetchPeople("https://randomuser.me/api/?results=5")
      .then(results => setListPeople(results));
  }, [fetchPeople]);

  const deleteItem = (indexParam) => {
    setListPeople(prevList => prevList.filter((_, index) => index !== indexParam));
  };

  const getPeople = () => {
    fetchPeople("https://randomuser.me/api/?results=1")
      .then(result => setListPeople(prevList => [...prevList, ...result]));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedPerson(listPeople[index]);
  };

  const saveEditedName = () => {
    setListPeople(prevList => prevList.map((person, index) => index === editingIndex ? editedPerson : person));
    setEditingIndex(-1);
    setEditedPerson({});
  };

  const handleInputChange = (field, value) => {
    setEditedPerson(prevPerson => ({ ...prevPerson, [field]: value }));
  };

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Num</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
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
                    value={editedPerson.name?.first}
                    onChange={(e) => handleInputChange('name.first', e.target.value)}
                  />
                ) : (
                  el.name.first
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedPerson.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  el.email
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedPerson.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  el.phone
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedPerson.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  />
                ) : (
                  el.gender
                )}
              </td>
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