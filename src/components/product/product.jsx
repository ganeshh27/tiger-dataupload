import { useState, useEffect } from 'react';
import axios from 'axios';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { productTableFields } from './productTableFields';
import ProductModal from '../productModal/productModal.component';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const selectProduct = (id) => {
    let filtProduct = products.filter((product) => product.productId == id)[0];
    setSelectedProduct(filtProduct);
  };

  const onModalClose = () => {
    setModalFlag(false);
  };

  const handleEditField = async (params, events) => {
    if (events.key === 'Enter') {
      let filtProduct = products.find(
        (product) => product.productId == params.id
      );
      filtProduct[params.field] = params.value;

      let response = await axios({
        method: 'put',
        url: 'http://localhost:3001/products',
        data: filtProduct,
      });
      console.log('response ', response);
      if (response.status == 200) {
        alert('Product updated Successfully');
      } else {
        alert('Update failed. Try again after sometime');
      }
    }
  };

  const handleOnCellClick = (params) => {
    if (params.field == 'view') {
      selectProduct(params.id);
      setModalFlag(true);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div className='product-container'>
      <div className='product-container-header'>
        <h3>Products</h3>
      </div>
      <div style={{ height: 400, width: '70%' }}>
        <DataGrid
          rows={products}
          columns={productTableFields}
          getRowId={(row) => row.productId}
          // onRowClick={setModalFlag}
          onCellClick={handleOnCellClick}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
          onCellEditCommit={handleEditField}
        />
        {(modalFlag == true) & (selectedProduct != undefined) ? (
          <ProductModal
            product={selectedProduct}
            handleModalClose={onModalClose}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Products;
