import * as  React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <React.StrictMode>
            <BrowserRouter>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
                <ToastContainer style={{fontSize: 18}} autoClose={2000} newestOnTop/>
            </BrowserRouter>
        </React.StrictMode>
    </AuthProvider>
);

