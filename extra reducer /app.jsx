import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { initializeAuth } from './authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return (
        <div>
            {/* Your application components */}
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
