import styled from '@emotion/styled';
import React from 'react';

import { RemoveIcon, TagIcon, UntagIcon } from '../../icons';
import { ipRegex } from '../../services/ip';
import { theme } from '../../theme';
import { Input } from '../ui/input';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 5px;
    
    svg {
        cursor: pointer;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        display: grid;
        grid-template-areas: 
            'remove-ip  ip-input    '
            'tag-icon   tag-input   ';

        grid-template-columns: 24px 1fr;
        grid-template-rows: 1fr 1fr;

        padding-block: 5px;
        border-bottom: 1px solid var(--border-color);
    }

    .ip-input {
        grid-area: ip-input;
    }

    .remove-ip {
        grid-area: remove-ip;
    }

    .tag-input {
        grid-area: tag-input;
    }

    .tag-icon {
        grid-area: tag-icon;
    }
`;

type LookupInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'ref'> & {
    onRemove: () => void;

    tag: string | undefined;
    onTagChange: (tag: string) => void;
    onRemoveTag: () => void;
}

export const LookupInput: React.FC<LookupInputProps> = ({
    onRemove,
    onTagChange,
    onRemoveTag,
    tag='',
    ...props
}) => {
    const [tagEnabled, setTagEnabled] = React.useState(false);
    const tagInputRef = React.useRef<HTMLInputElement>(null);

    const toggleTag = React.useCallback(() => {
        if (tagEnabled) {
            onRemoveTag();
        }
        
        setTagEnabled(previous => !previous);
    }, [tagEnabled, setTagEnabled]);

    React.useEffect(() => {
        if (tagEnabled) {
            tagInputRef.current?.focus();
        }
    }, [tagEnabled]);

    const TagComponent = tagEnabled ? UntagIcon : TagIcon;    
    return (
        <Wrapper>
            <Input 
                {...props}
                className='ip-input'
                pattern={ipRegex.source}
            />

            {tagEnabled && (
                <Input
                    ref={tagInputRef}
                    className='tag-input'
                    placeholder='Tag'
                    value={tag}
                    onChange={event => onTagChange((event.target as HTMLInputElement).value)}
                />
            )}

            <TagComponent 
                className='tag-icon'
                color='var(--text-color)'
                size={24}
                tabIndex={0}
                onClick={toggleTag}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        toggleTag();
                    }
                }}
            />

            <RemoveIcon
                className='remove-ip'
                color='var(--text-color)'
                size={24}
                onClick={onRemove}
            />
        </Wrapper>
    );
};
