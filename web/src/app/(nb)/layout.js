import Layout from '@/components/layout-new'
import { getSiteSettings, getCompanyInfo, getAllPages } from '@/lib/sanity'

export const metadata = {
  title: 'Kystleik',
  description: 'Med havet som næraste nabo har vi verdas største og beste leikeplass',
}

export default async function NorwegianLayout({ children }) {
  const companyInfo = await getCompanyInfo()
  const pages = await getAllPages()
  
  return (
    <Layout companyInfo={companyInfo} locale="nb" pages={pages}>
      {children}
    </Layout>
  )
}
