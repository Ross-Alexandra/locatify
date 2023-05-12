export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'as'> {
    color?: string;
    size?: number | string;
    title?: string;
}

export * from './accuracy-icon';
export * from './bulk-icon';
export * from './error-icon';
export * from './location-icon';
export * from './manual-icon';
export * from './missing-icon';
export * from './new-item-icon';
export * from './postal-code-icon';
export * from './remove-icon';
export * from './search-icon';
export * from './tag-icon';
export * from './untag-icon';
