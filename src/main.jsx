import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.toString() };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error Caught by Boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red', backgroundColor: 'black', height: '100vh', fontFamily: 'monospace' }}>
          <h1>CRITICAL SYSTEM FAILURE</h1>
          <p>La aplicación ha encontrado un error fatal en producción:</p>
          <pre style={{ color: 'white', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{this.state.errorInfo}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
