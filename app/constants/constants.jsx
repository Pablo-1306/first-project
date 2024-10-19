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