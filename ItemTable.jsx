import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function ItemTable({ items, handleEdit, handleDelete, search, setSearch }) {
  // Filter items based on search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body">
        {/* ✅ Title section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-primary mb-0">Inventory List</h4>
          <h5 className="text-primary fw-bold mb-0">
            Total Value: ₱{totalValue.toLocaleString()}
          </h5>
        </div>

        {/* ✅ Search bar BELOW the title */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ✅ Table */}
        <table className="table table-hover align-middle text-center">
          <thead className="bg-primary text-white rounded-top">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-muted py-4">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr key={index} className="table-row">
                  <td>{index + 1}</td>
                  <td className="fw-semibold text-capitalize">{item.name}</td>
                  
                  <td>{item.quantity}</td>
                  <td>₱{item.price}</td>
                  <td className="fw-bold text-success">
                    ₱{item.quantity * item.price}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemTable;
