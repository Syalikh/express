import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
  const [active, setActive] = useState(false);
  // const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getUsersById = async () => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setNama(response.data.nama);
    setHarga(response.data.harga);
    setStock(response.data.stock);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, {
        nama,
        harga,
        stock,
        status: active,
      });
      alert("Produk Berhasil diupdate");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersById();
  }, []);
  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <div className="card w-50">
            <div className="card-body">
              <h4>Edit Produk</h4>
              <form onSubmit={updateProduct}>
                <div className="mb-2 mt-4">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Produk..."
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Harga</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Harga Produk..."
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Stock Produk..."
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  <label className="form-check-label">Active</label>
                </div>

                <button type="submit" className="btn btn-primary mt-3 px-4">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;