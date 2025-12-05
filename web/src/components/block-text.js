import { PortableText } from '@portabletext/react'
import React from 'react'

import typography from './typography.module.css'

const components = {
  block: {
    normal: ({ children }) => <p className={typography.paragraph}>{children}</p>,
  }
}

const BlockText = ({ blocks }) => {
  if (!blocks) return null
  return <PortableText value={blocks} components={components} />
}

export default BlockText
