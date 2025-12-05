import Layout from '@/components/layout'
import { getSiteSettings, getCompanyInfo, getAllPages } from '@/lib/sanity'

export const metadata = {
  title: 'Kystleik',
  description: 'With the ocean as our nearest neighbor, we have the world\'s largest and best playground',
}

export default async function EnglishLayout({ children }) {
  const companyInfo = await getCompanyInfo()
  const pages = await getAllPages()
  
  return (
    <Layout companyInfo={companyInfo} locale="en" pages={pages}>
      {children}
    </Layout>
  )
}
