import { T3CeBaseProps, T3File } from '../'

export interface T3CeUploadsProps extends T3CeBaseProps {
    media?: T3File[],
    target: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null,
    displayFileSizeInformation?: string,
    displayDescription?: string,
    displayInformation?: string,
}
