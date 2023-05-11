import styled from '@emotion/styled';
import React from 'react';

import { RemoveIcon, TagIcon, UntagIcon } from '../../icons';
import { ipRegex } from '../../services/ip';
import { Input } from '../ui/input';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 5px;
    
    svg {
        cursor: pointer;
    }
`;

type LookupInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'as'> & {
    onRemove: () => void;
    onTagChange: (tag: string) => void;
}

export const LookupInput: React.FC<LookupInputProps> = ({
    onRemove,
    onTagChange,
    ...props
}) => {
    const [tagEnabled, setTagEnabled] = React.useState(false);
    const toggleTag = React.useCallback(() => setTagEnabled(previous => !previous), [setTagEnabled]);

    const TagComponent = tagEnabled ? UntagIcon : TagIcon;
    
    return (
        <Wrapper>
            <Input 
                {...props}
                pattern={ipRegex.source}
            />

            {tagEnabled && (
                <Input
                    className='tag-input'
                    placeholder='Tag'
                    onChange={event => onTagChange((event.target as HTMLInputElement).value)}
                />
            )}

            <TagComponent 
                color='var(--text-color)'
                size={24}
                onClick={toggleTag}
            />

            <RemoveIcon
                color='var(--text-color)'
                size={24}
                onClick={onRemove}
            />
        </Wrapper>
    );
};
