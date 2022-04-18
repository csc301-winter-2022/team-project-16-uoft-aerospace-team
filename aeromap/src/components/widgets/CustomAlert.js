import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const CustomAlert = ({type, message, alert, setAlert}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return

        setAlert(false);
    }

    if (type === 'success') {
        return (
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        )
    } else if (type === 'warning') {
        return (
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {message} 
                </Alert>
            </Snackbar>
        )
    } else if (type === 'Error') {
        return(
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        )
    } else {
        return null
    }

}

export default CustomAlert