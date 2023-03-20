import Head from 'next/head'
import 'antd/dist/reset.css'
import '../styles/globals.css'
import esEs from 'antd/locale/es_ES'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import DefaultLayout from '../components/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DockerVision</title>
        <meta
          name="description"
          content="Visualiza los recursos de los contenedores de docker, obteniendo un historial de registros."
        />
        <link rel="icon" href="/docker-small.webp" />
      </Head>
      <ConfigProvider locale={esEs}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ConfigProvider>
    </>
  )
}
