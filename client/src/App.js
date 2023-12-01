import React, { useState } from "react";
import "./App.css";
import CopyImg from "./copyimg.png";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const generateLink = async () => {
    const response = await axios.post("/link", {
      url,
      slug,
    });

    setShortUrl(response?.data?.data?.shortUrl);
  };

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    swal("Good job!", "copy to clipboard", "success");
  };
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
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Slug (optional)"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-10">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Short URL"
                          value={shortUrl}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <img
                        src={CopyImg}
                        alt="copyimg"
                        className="copy-img img-fluid"
                        onClick={copyShortUrl}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-dark w-100 mb-3"
                    type="button"
                    onClick={generateLink}
                  >
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
