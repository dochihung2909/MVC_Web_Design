import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from '~/components/GlobalStyles'

import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <GlobalStyles>
        <GoogleOAuthProvider clientId="489548495600-bcfuf05rtjcn8avr19p6tuqflqiphubd.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </GlobalStyles>,
    // <React.StrictMode>
    // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
