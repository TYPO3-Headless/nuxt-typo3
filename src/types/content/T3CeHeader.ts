import { T3CeBase, T3Link } from '../index'

export interface T3Header extends T3CeBase {
  headerLink?: Partial<T3Link> | string
}
