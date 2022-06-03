import { useEffect } from 'react'

const Alert = ({ showAlert, setShowAlert }) => {
    useEffect(() => {
        let timeout
        if (showAlert) {
          timeout = setTimeout(() => setShowAlert(false), 3000);
        }
        return () => clearTimeout(timeout);
      }, [showAlert,setShowAlert]);

  return (
      <>
     <div className={showAlert ? "alert show"  : "alert"}>Please Enter 3 - 5 Ingredients Only</div>
      </>
    
  )
}

export default Alert