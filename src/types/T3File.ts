import type { T3Link } from '.'

export interface T3File {
  publicUrl: string,
  properties: {
    title: string | null
    alternative: string | null
    description: string | null
    mimeType: string
    type: string
    filename: string
    originalUrl: string
    fileReferenceUid: number
    size: string
    link: string | null,
    linkData: T3Link,
    uidLocal?: number,
    dimensions: {
      width: number
      height: number
    }
    cropDimensions: {
      width: number
      height: number
    }
    autoplay: string | null
    extension: string
  }
}
