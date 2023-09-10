import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/styles/App.scss';
import store from '@/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
