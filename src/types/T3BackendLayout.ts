import { T3ContentElement } from '.'

export interface T3BackendLayout {
  content: {
    [key: string]: T3ContentElement<any>[];
  }
}
