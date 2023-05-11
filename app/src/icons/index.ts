export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'as'> {
    color?: string;
    size?: number | string;
}

export * from './bulk-icon';
export * from './manual-icon';
export * from './new-item-icon';
export * from './remove-icon';
export * from './search-icon';
export * from './tag-icon';
export * from './untag-icon';
