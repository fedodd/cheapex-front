import React, { useEffect, useContext } from 'react';
import classes from './Cockpit.pcss';
import AuthContext from '../../context/auth-context';

const cockpit = ( props ) => {
    const toggleBtnRef = React.useRef(null);
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
/*       setTimeout(() => {
        alert('saved data to cloud!');
      }, 1000); */
      toggleBtnRef.current.click();
      return () => {
        console.log('[Cockpit.js] cleanup work in useEffect');
      }
    }, []);

    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      }
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if ( props.personsLength <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.personsLength <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}
                ref={toggleBtnRef}
            >Toggle Persons</button>
            <button onClick={authContext.login} >Log in</button>
            
            
        </div>
    );
};

export default React.memo(cockpit);
