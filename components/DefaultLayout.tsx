import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { modules } from '../assets/modules'
import { GithubOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Affix, Breadcrumb, Layout, Menu, MenuProps, Typography } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const dockerVision = 'DockerVision'

const DefaultLayout: FC<{ children: ReactNode }> = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [currentModule, setCurrentModule] = useState<ItemType[]>([])
  const [title, setTitle] = useState<string | undefined>()

  const items: MenuItem[] = modules.map((module) => ({
    ...module,
    label: <Link href={module.key}>{module.label}</Link>,
  }))

  useEffect(() => {
    const moduleKey = router.pathname.split('/')?.filter((x) => x)?.[0]
    const module = modules.find((item) => item.key === moduleKey)
    const breadcrumb: ItemType[] = []
    if (!module) return
    breadcrumb.push({ title: module.label })
    breadcrumb.push({ title: 'Inicio' })
    setCurrentModule(breadcrumb)
    const moduleTitle = (currentModule?.[0] as any)?.title
    setTitle(moduleTitle ? moduleTitle + ` | ${dockerVision}` : dockerVision)
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout className="!min-h-screen">
        <Affix>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="h-screen overflow-auto !fixd"
          >
            <Link href="/" className="flex items-center justify-center py-5">
              <Image
                src={collapsed ? '/docker-small.webp' : '/docker.webp'}
                alt="docker stats"
                width={collapsed ? 40 : 120}
                height={30}
              />
            </Link>
            <Menu theme="dark" mode="inline" items={items} />
          </Layout.Sider>
        </Affix>
        <Layout className="site-layout">
          {/* <Layout.Header
          style={{ padding: 0, background: colorBgContainer }}
          title="asdas"
        /> */}
          <Layout.Content className="mx-5 md:mx-7 my-6">
            <Breadcrumb className="pb-5" items={currentModule} />
            <div className="bg-gray-50 min-h-full p-5 shadow-sm">
              {props.children}
            </div>
          </Layout.Content>
          <Layout.Footer className="flex items-center justify-center">
            <Typography.Text strong>DockerVision, </Typography.Text>
            &nbsp;hecho con mucho &nbsp;
            <Image
              src="/corazon-graffiti.png"
              alt="corazón"
              width={14}
              height={10}
              className="animate-bounce"
            />
            &nbsp; por &nbsp;
            <a href="https://github.com/jhon-acosta" target="_blank">
              <GithubOutlined />
            </a>
          </Layout.Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default DefaultLayout
