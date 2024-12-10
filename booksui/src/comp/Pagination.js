import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Items({ currentItems }) {
    const { addToCart } = useContext(CartContext);
  return (
    <div className="container">
    <div className="row">
        {currentItems &&
          currentItems.map((product, ind) => {
            return (
              <div
                key={ind}
                style={{
                  flex: "1 0 21%",
                  margin: "15px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "280px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={product.img_url}
                    alt={product.title}
                    style={{
                      width: "280px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "15px" }}>
                    <h5 style={{ marginBottom: "10px", color: "#333" }}>
                      {product.title}
                    </h5>
                    <p
                      style={{
                        marginBottom: "10px",
                        color: "#777",
                        fontSize: "14px",
                      }}
                    >
                      Some quick example text.
                    </p>
                    <p
                      style={{
                        marginBottom: "15px",
                        color: "#007bff",
                        fontWeight: "bold",
                      }}
                    >
                      Rs. {product.price}
                    </p>
                    <div>
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          padding: "10px 15px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "#ff6666",
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "background-color 0.3s ease",
                          marginRight: "10px",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ff6666")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ff6666")
                        }
                      >
                        Add to Cart
                      </button>
                      <button
                        style={{
                          padding: "10px 15px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "#17a2b8",
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#138496")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#17a2b8")
                        }
                      >
                        <Link
                          to={"/show/" + product.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          Show
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
            );
          })}
      </div>
      </div>
  );
}

export default function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}