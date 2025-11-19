import React from "react";

function ItemForm({ form, setForm, handleSubmit, editMode, closeModal }) {
  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div
            className="modal-header bg-gradient text-white rounded-top-4"
            style={{ background: "linear-gradient(90deg, #007bff, #00b4d8)" }}
          >
            <h5 className="modal-title fw-bold">
              {editMode ? "Edit Item" : "Add New Item"}
            </h5>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Item Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter item name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>


              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Price (₱)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 p-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 fw-semibold">
                {editMode ? "Save Changes" : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
