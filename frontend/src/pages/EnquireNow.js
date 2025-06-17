import React from "react";
import './EnquireNow.css';

const EnquireNow = () => {
  return (
    <section className="enquire-section d-flex align-items-center justify-content-center py-5" style={{ background: "#5A1E66" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="enquire-box bg-white p-4 rounded shadow">
              <h2 className="text-center fw-bold mb-4" style={{ color: "#5A1E66" }}>Enquire Now</h2>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Your Phone" required />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Your Email Address" required />
                </div>
                <div className="mb-3">
                  <select className="form-control">
                    <option>Stackloom</option>
                    <option>Course 1</option>
                    <option>Course 2</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="3" placeholder="Type Message"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-warning px-4 py-2 fw-bold">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquireNow;
