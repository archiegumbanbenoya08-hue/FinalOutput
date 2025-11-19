import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";
import ItemForm from "./component/ItemForm";
import ItemTable from "./component/ItemTable";
import "./App.css";
import { showSuccess, showConfirm, showError } from "./component/AlertHelper";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    quantity: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Fetch items from backend
  const fetchItems = () => {
    axios
      .get("http://localhost/chie_api/api.php")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Open modal for adding new item
  const openAddModal = () => {
    setForm({ id: null, name: "", quantity: "", price: ""});
    setShowModal(true);
  };

  // ✅ Open modal for editing existing item
 const handleEdit = (id) => {
  const item = items.find((i) => i.id === id);

  if (!item) {
    showError("Item not found.");
    return;
  }

  setForm({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  });

  setShowModal(true);
};



  // ✅ Handle Add/Edit submit
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.name || !form.quantity || !form.price) {
    showError("Please fill all required fields.");
    return;
  }

  if (form.id === null) {
    // ADD (POST)
   axios.post("http://localhost/chie_api/api.php", form, {
  headers: { "Content-Type": "application/json" }
})

      .then(res => {
        if (res.data.success) {
          showSuccess("Item added successfully!");
          setShowModal(false);
          fetchItems();
        } else {
          showError(res.data.error);
        }
      })
      .catch(err => showError(err.message));
  } else {
    // UPDATE (PUT)
   axios.put("http://localhost/chie_api/api.php", form, {
  headers: { "Content-Type": "application/json" }
})

      .then(res => {
        if (res.data.success) {
          showSuccess("Item updated successfully!");
          setShowModal(false);
          setForm({ id: null, name: "", quantity: "", price: ""});
          fetchItems();
        } else {
          showError(res.data.error);
        }
      })
      .catch(err => showError(err.message));
  }
};



  // ✅ Handle delete
  const handleDelete = async (id) => {
    const result = await showConfirm("This will remove the item permanently.");
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost/chie_api/api.php?id=${id}`)
        .then(() => {
          showSuccess("Item deleted!");
          fetchItems();
        })
        .catch((err) => showError("Error deleting item: " + err.message));
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e3f2fd 100%)",
      }}
    >
      {/* Header */}
      <header
        className="py-5 text-center text-white shadow-lg"
        style={{
          background: "linear-gradient(90deg, #007bff, #00b4d8)",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <h1 className="fw-bold mb-2 display-5">📦 Chie Inventory</h1>
        <p className="lead text-white-50 mb-0">
          Manage, track, and organize your items seamlessly.
        </p>
      </header>

      {/* Main Content */}
      <main className="container my-5">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-4">
            <ItemTable
              items={items}
              handleEdit={handleEdit}
              handleDelete={(id) => handleDelete(id)}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </main>

      {/* Floating Add Button */}
      <button
        className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex justify-content-center align-items-center"
        style={{
          bottom: "30px",
          right: "30px",
          width: "65px",
          height: "65px",
          fontSize: "22px",
        }}
        onClick={openAddModal}
        title="Add New Item"
      >
        <FaPlus />
      </button>

      {/* Modal Form */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4"
            style={{ width: "400px" }}
          >
            <h4 className="text-center text-primary mb-3">
              {form.id ? "✏️ Edit Item" : "➕ Add New Item"}
            </h4>
            <ItemForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              editMode={!!form.id}
              closeModal={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
