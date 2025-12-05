import { PortableText } from '@portabletext/react'
import Figure from './figure'
import Slideshow from './slideshow'
import typography from '../typography.module.css'

const components = {
  types: {
    figure: Figure,
    slideshow: Slideshow,
  },
  block: {
    h1: ({ children }) => <h1 className={typography.responsiveTitle1}>{children}</h1>,
    h2: ({ children }) => <h2 className={typography.responsiveTitle2}>{children}</h2>,
    h3: ({ children }) => <h3 className={typography.responsiveTitle3}>{children}</h3>,
    h4: ({ children }) => <h4 className={typography.responsiveTitle4}>{children}</h4>,
    blockquote: ({ children }) => <blockquote className={typography.blockQuote}>{children}</blockquote>,
    normal: ({ children }) => <p className={typography.paragraph}>{children}</p>,
  },
}

export default function BlockContent({ blocks }) {
  if (!blocks) return null
  return <PortableText value={blocks} components={components} />
}
