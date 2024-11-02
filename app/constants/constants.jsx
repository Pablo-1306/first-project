import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

export const CHECK_CIRCLE_CONFIG = {mr:2, color: 'green'}

export const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10+',
    },
];

export const personal_content = [
    {label: '1 account', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: '1 Super user', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Monitoring', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Error notifications', icon: <CancelIcon sx={{mr:2, color: 'red'}}/>},
]
export const soulmate_content = [
    {label: '2 accounts', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: '1 Super user', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Monitoring', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Error notifications', icon: <CancelIcon sx={{mr:2, color: 'red'}}/>},
]
export const team_content = [
    {label: '10 accounts', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: '2 Super users', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Monitoring', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Error notifications', icon: <CancelIcon sx={{mr:2, color: 'red'}}/>},
]
export const enterprise_content = [
    {label: 'Up to 25 accounts', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Desired super users', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Monitoring', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
    {label: 'Error notifications', icon: <CheckCircleOutlineIcon sx={CHECK_CIRCLE_CONFIG}/>},
]

export const handleDelete =(id, rows, setRows) => {
  setRows(rows.filter((row) => row.id != id));

};

export const handleEdit = (id, rows, setRows) => {
  const rowToEdit = rows.find ((row)=> row.id == id);
  const updateValue = prompt ("Edita la cantidad:",rowToEdit.cantidad);
  if (updateValue){
      setRows(
          rows.map((row) =>
          row.id === id ? {...row,cantidad:updateValue} : row
          )
      );
  }
};

export const initialRows = [
  {
    id: 1,
    clothes: "Playera",
    size: "M",
    gender: "Hombre",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo",
    cantidad: 19,

  },
  {
    id: 2,
    clothes: "Pantalon",
    size: "S",
    gender: "Hombre",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo",
    cantidad: 1963,
  },
  {
    id: 3,
    clothes: "Zapatos",
    size: "XS",
    gender: "Hombre",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo",
    cantidad: 1963,
  },

   {
    id: 4,
    clothes: "Vestido",
    size: "L",
    gender: "Mujer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo",
    cantidad: 1963,
  },
  {
    id: 5,
    clothes: "Playera",
    size: "XL",
    gender: "Mujer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo",
    cantidad: 1963,
  },
  
  
  
];