import { T3File, T3Gallery, T3CeBase } from '../'

export interface T3CeGallery extends T3CeBase {
  bodytext?: string,
  gallery: T3Gallery
}
