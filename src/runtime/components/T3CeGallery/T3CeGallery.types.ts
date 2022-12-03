export interface FileProperties {
  title: string | null
  alternative: string | null
  description: string | null
  mimeType: string
  type: string
  filename: string
  originalUrl: string
  fileReferenceUid: number
  size: string
  link: string | null
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

export interface T3CeGalleryFile {
  publicUrl: string
  properties: FileProperties
}

export interface T3GalleryColumn {
  columns: Record<string, T3CeGalleryFile>
}

export interface T3CeGalleryProp {
  position: {
    horizontal: string
    vertical: string
    noWrap: boolean
  }
  count: {
    files: number
    columns: number
    rows: number
  }
  columnSpacing: number
  border: {
    enabled: boolean
    width: number
    padding: number
  }
  rows: Record<string, T3GalleryColumn>
}
