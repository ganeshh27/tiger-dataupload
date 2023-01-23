import { RemoveRedEye } from '@mui/icons-material';
const productTableFields = [
  //  {field: 'id', headerName: 'ID'},
  { field: 'productId', headerName: 'PRODUCT ID' },
  { field: 'sku', headerName: 'SKU', editable: true },
  { field: 'name', headerName: 'Name', editable: true },

  { field: 'price', headerName: 'Price', editable: true },

  { field: 'brand', headerName: 'Brand', editable: true },
  {
    field: 'color',
    headerName: 'Colour',
    editable: true,
  },

  { field: 'ratingAvg', headerName: 'Ratings', editable: true },

  { field: 'inventoryCount', headerName: 'Count', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date',
    editable: true,
  },
  {
    field: 'view',
    headerName: 'View',
    width: 70,
    renderCell: (row) => {
      return <RemoveRedEye />; //<-- Mui icons should be put this way here.
    },
  },
];
export { productTableFields };
