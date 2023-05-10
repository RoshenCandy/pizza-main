import { Provider } from 'react-redux'
import { store } from "../common/redux/store";
import '../common/scss/app.scss'
import '../common/scss/form.scss'
import '../styles/app.css'
import {SessionProvider} from 'next-auth/react'

export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
