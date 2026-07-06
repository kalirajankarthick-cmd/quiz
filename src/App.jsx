
import  {useState,useEffect} from 'react';
import './App.css';

function App() {

const intial = [
  {
    id: 1,
    name : "karthi",
    price: 1000
  },
  {
    id: 2,
    name : "kai",
    price:800
  },
  {
    id: 3,
    name : "kart",
    price: 900
  }
];


const [data, setData] = useState([]);
const [form, setForm] = useState({
  name : "",
  price : ""
});
const [edit, setEdit] = useState(false);

useEffect(() => {
  setData(intial);
},[]);

const handleDelete = (id) => {
  const newData = data.filter((item) => item.id !== id);
  setData(newData);
}
const handleEdit = (id) => {
  const itemToEdit = data.find((item) => item.id === id);
  setForm({
    name: itemToEdit.name,
    price: itemToEdit.price
  });
  setEdit(true);
}
  const addItt = () => {
    // validation: name and price required
    if (!form.name.trim() || !form.price.trim()) {
      alert('Please fill in both name and price.');
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert('Price must be a positive number.');
      return;
    }
    // generate a new id (max id + 1, fallback to 1 if empty)
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      name: form.name.trim(),
      price: priceNum,
    };
    setData([...data, newItem]);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: ""
    });
    setEdit(false);
  }
 const handleUpdate = () => {
    if (!form.name.trim() || !form.price.trim()) {
      alert('Please fill in both name and price.');
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert('Price must be a positive number.');
      return;
    }
    // update the item in the list
    setData(data.map(item =>
      item.id === edit
        ? { ...item, name: form.name.trim(), price: priceNum }
        : item
    ));
    resetForm();
  };



  return (
    <>
    <div>
      <input type="text" placeholder="Name" value={form.name} 
      onChange={(e) => setForm({...form, name: e.target.value})}/>
      <input type="text" placeholder="Price" value={form.price} 
      onChange={(e) => setForm({...form, price: e.target.value})}/>
      {edit ? 
      (<div><button onClick ={handleUpdate}>update</button> <button onClick={() => setEdit(false)}>cancel</button> </div>):
      (<button onClick={addItt}>add </button>)}

      <table>
        <tr>
          <th>id </th>
          <th>name </th>
          <th>price </th>
        </tr>
         <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
      </table>
    </div>
    </>
  )
}
export default App;
