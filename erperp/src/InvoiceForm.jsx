import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function InvoiceForm() {
  const customerNameRef = useRef();
  const contactRef = useRef();
  const itemRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  const [items, setItems] = useState([]);

  const addItem = () => {
    const item = itemRef.current.value;
    const qty = parseFloat(qtyRef.current.value || 0);
    const price = parseFloat(priceRef.current.value || 0);

    if (item && qty > 0 && price >= 0) {
      setItems([...items, { item, qty, price, total: qty * price }]);
      
      // Clear the item inputs
      itemRef.current.value = "";
      qtyRef.current.value = "";
      priceRef.current.value = "";
      itemRef.current.focus();
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const generatePDF = () => {
    if (items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const name = customerNameRef.current.value || "Customer";
    const contact = contactRef.current.value || "Not provided";

    const doc = new jsPDF();

    // 🏢 Company Header
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253); // Bootstrap primary blue
    doc.text("PATH ENTERPRISERS", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("PULIVENDULA - 516390", 105, 27, { align: "center" });
    doc.text("Phone: +91 7799244535", 105, 32, { align: "center" });

    // Invoice Info Section
    doc.setDrawColor(13, 110, 253);
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);
    
    doc.setFontSize(18);
    doc.setTextColor(13, 110, 253);
    doc.text("INVOICE", 105, 48, { align: "center" });

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Invoice Date: ${dateStr}`, 15, 58);
  // Generate sequential invoice number (better than random)
  const invoiceNumber = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Format date and time in Indian style
  const options = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const dateTimeStr = today.toLocaleString('en-IN', options);

  // In your PDF generation:
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Invoice Date: ${dateTimeStr}`, 15, 58);
  doc.text(`Invoice #: ${invoiceNumber}`, 15, 64);
    // Customer Info
    doc.setFontSize(12);
    doc.setTextColor(13, 110, 253);
    doc.text("BILL TO:", 15, 75);
    
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(name, 15, 82);
    doc.text(contact, 15, 88);

    // Prepare table data
    const tableData = items.map(item => [
      item.item,
      item.qty,
      `₹${item.price.toFixed(2)}`,
      `₹${item.total.toFixed(2)}`
    ]);

    // Calculate grand total
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    // 📦 Items Table
    autoTable(doc, {
      startY: 100,
      head: [["Description", "Qty", "Unit Price", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: { 
        fillColor: [13, 110, 253],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 }
      },
      styles: { 
        halign: 'center',
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { left: 15 }
    });

   // 💰 Total Section - Improved version
const finalY = doc.lastAutoTable.finalY + 10;

// Add a horizontal line above the total
doc.setDrawColor(200, 200, 200);
doc.line(15, finalY, 195, finalY);

// Payment terms
doc.setFontSize(10);
doc.setTextColor(100);
doc.text("Payment Terms: Due on Receipt", 15, finalY + 8);

// Total amount box
doc.setFillColor(240, 240, 240);
doc.rect(120, finalY + 5, 75, 15, 'F');

// "Total Amount" text
doc.setFontSize(12);
doc.setTextColor(13, 110, 253);
doc.text("Total Amount", 125, finalY + 15);

// Amount value
doc.setFontSize(14);
doc.setTextColor(0);
const totalText = `₹${grandTotal.toFixed(2)}`;
const totalWidth = doc.getTextWidth(totalText);
doc.text(totalText, 190 - totalWidth, finalY + 15);
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your business!", 105, 280, { align: "center" });
    doc.text("Terms & Conditions: Goods once sold will not be taken back", 105, 285, { align: "center" });

    // Save the PDF
    doc.save(`Invoice_${name.replace(/\s+/g, '_')}_${dateStr.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
        <div className="card-header bg-primary text-white py-3">
          <h2 className="text-center mb-0">
            <i className="bi bi-receipt me-2"></i> Invoice Generator
          </h2>
        </div>
        
        <div className="card-body p-4">
          {/* Customer Section */}
          <div className="mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-person-circle me-2"></i> Customer Details
            </h5>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Customer Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person-fill text-primary"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. John Traders"
                  ref={customerNameRef}
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Contact Info</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-telephone-fill text-primary"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Phone or Email"
                  ref={contactRef}
                />
              </div>
              <small className="text-muted">We'll never share your contact details</small>
            </div>
          </div>
          
          {/* Items Section */}
          <div className="border p-3 rounded-3 bg-light mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-cart-plus me-2"></i> Add Items
            </h5>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Item Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-box-seam text-primary"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Premium Widget"
                  ref={itemRef}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
              </div>
            </div>
            
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Quantity</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-123 text-primary"></i>
                  </span>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Qty"
                    min="1"
                    ref={qtyRef}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Price (₹)</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-currency-rupee text-primary"></i>
                  </span>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    ref={priceRef}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={addItem}
              className="btn btn-outline-primary w-100 mt-2"
            >
              <i className="bi bi-plus-circle me-2"></i> Add Item
            </button>
          </div>
          
          {/* Added Items List */}
          {items.length > 0 && (
            <div className="border p-3 rounded-3 mb-4">
              <h5 className="text-primary mb-3">
                <i className="bi bi-list-check me-2"></i> Items Added
              </h5>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-end">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item}</td>
                        <td className="text-end">{item.qty}</td>
                        <td className="text-end">₹{item.price.toFixed(2)}</td>
                        <td className="text-end">₹{item.total.toFixed(2)}</td>
                        <td className="text-end">
                          <button 
                            onClick={() => removeItem(index)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="fw-bold">
                      <td colSpan="3" className="text-end">Grand Total:</td>
                      <td className="text-end">
                        ₹{items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
          
          {/* Generate Button */}
          <button
            onClick={generatePDF}
            className="btn btn-primary btn-lg w-100 py-3 shadow-sm"
            disabled={items.length === 0}
          >
            <i className="bi bi-file-earmark-pdf-fill me-2"></i> Generate Invoice
          </button>
          
          {/* Help Text */}
          <div className="text-center mt-3 text-muted small">
            <i className="bi bi-info-circle me-1"></i> Your invoice will be downloaded as PDF
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;