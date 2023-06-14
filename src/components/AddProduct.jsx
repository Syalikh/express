import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      setActive(true);
      if (nama.length === 0 || harga.length === 0 || stock.length === 0) {
        setErrors({ errors: true });
      } else {
        await axios.post("http://localhost:5000/product", {
          nama,
          harga,
          stock,
          status: active,
        });
        alert("Produk berhasil ditambahkan");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <div className="card w-50">
            <div className="card-body">
              <h4>Tambah Produk</h4>

              <form onSubmit={saveProduct}>
                <div className="mb-2 mt-4">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Produk..."
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                  {errors && nama <= 0 ? (
                    <label className="error">
                      *Nama produk tidak boleh kosong
                    </label>
                  ) : (
                    ""
                  )}
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
                  {errors && harga <= 0 ? (
                    <label className="error">
                      *Harga produk tidak boleh kosong
                    </label>
                  ) : (
                    ""
                  )}
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
                  {errors && stock <= 0 ? (
                    <label className="error">
                      *Stock produk tidak boleh kosong
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                  <label>Active</label>
                </div>

                <button type="submit" className="btn btn-primary mt-3 px-4">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;