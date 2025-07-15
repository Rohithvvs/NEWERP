import React, { useState } from "react";

function InvoiceForm() {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="container py-4">
      <div className="card shadow rounded">
        <div className="card-body">
          <h2 className="text-center mb-4">📄 Invoice Generator</h2>

          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input type="text" className="form-control" placeholder="John Traders" />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact (Phone/Email)</label>
            <input type="text" className="form-control" placeholder="9876543210" />
          </div>

          <div className="border p-3 rounded bg-light mb-3">
            <h5 className="mb-3">Item Details</h5>
            <input type="text" className="form-control mb-2" placeholder="Item Name" />
            <div className="row g-2">
              <div className="col-6">
                <input type="number" className="form-control" placeholder="Qty" />
              </div>
              <div className="col-6">
                <input type="number" className="form-control" placeholder="Price" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowActions(true)}
            className="btn btn-primary w-100"
          >
            Generate Invoice
          </button>

          {showActions && (
            <div className="mt-4 d-grid gap-2">
              <button className="btn btn-success">Download PDF</button>
              <button className="btn btn-secondary">Share Invoice</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
