import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="card shadow-lg mt-5 p-5">
          <div className="text-center mb-4">
            <h2>Quick-Route-Links✅</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm p-3">
                <form>
                  <h4 className="text-center mt-3 mb-4">Link Generation🔗</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter URL"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Slug (optional)"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short URL"
                    />
                  </div>
                  <button className="btn btn-dark w-100 mb-3" type="button">
                    <b>Do Magic🪄</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="todo-container shadow-sm p-3 mt-2">
                <h4 className="text-center mt-2 mb-4">All Links📃</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
