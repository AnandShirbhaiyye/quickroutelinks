import React, { useEffect, useState } from "react";
import "./App.css";
import CopyImg from "./copyimg.png";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [links, setLinks] = useState([]);

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

  const loadLinks = async () => {
    try {
      const response = await axios.get("/api/links");
      setLinks(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadLinks();
  }, [links]);

  const deleteTask = async (id) => {
    const { data } = await axios.delete(`/url/${id}`, {
      id,
    });
    swal("Good job!", data?.message, "success");
    loadLinks();
  };

  return (
    <>
      <div className="container">
        <div className="card shadow-lg mt-3 p-5">
          <div className="text-center mb-4">
            <h2>Quick-Route-Links✅</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm p-3 mt-4">
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
              <div className="url-container shadow-sm p-3 mt-2">
                <h4 className="text-center mt-2 mb-4">All Links📃</h4>
                {links.map((link, index) => {
                  const { url, slug, clicks } = link;
                  return (
                    <div className="card shadow-sm p-1 mt-2" key={index}>
                      <p>
                        <b>Full URL :</b> {url}
                      </p>
                      <p>
                        <b>Short URL:</b> :{process.env.REACT_APP_BASE_URL}/
                        {slug}
                      </p>
                      <p>
                        <b>Clicks :</b> {clicks}
                      </p>

                      <div
                        className="delete-button"
                        onClick={() => {
                          deleteTask(link?._id);
                        }}
                      >
                        {" "}
                        ❌
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
