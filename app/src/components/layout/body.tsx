import styled from '@emotion/styled';
import React from 'react';

import { theme } from '../../theme';

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    padding: 15px;

    .content {
        display: flex;
        flex-direction: column;

        width: 100%;

        max-width: 1920px;
        margin-inline: auto;
    }

    header {
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: -1;

        a {
            display: block;
            width: 275px;
            aspect-ratio: 3 / 1;

            background-image: url('/locatify.png');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;

            @media (max-width: ${theme.breakpoints.mobile}) {
                width: 80vw;
                max-height: 80px;
            }
        }

        @media (max-width: ${theme.breakpoints.mobile}) {
            position: relative;
            top: auto;
            left: auto;

            align-self: center;
        }
    }

    /*
        This is the image that will be blurred
        in the background. So we need to make
        sure that this is a pseudo element.
    */
    ::before {
        position: fixed;

        /*
            Don't use 0px values for the inset as this
            will cause the image to have a halo effect
            at the borders due to the blur.
        */
        inset: -1%;
        width: 102%;
        height: 102%;
        content: '';

        background-image: url('https://source.unsplash.com/Xu4Pz7GI9JY');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        filter: blur(10px);
        z-index: -1;
    }

`;

type BodyProps = Omit<React.HTMLProps<HTMLDivElement>, 'as'>

export const Body: React.FC<BodyProps> = ({
    children,
    ...props
}) => {
    return (
        <Wrapper {...props}>
            <div className='content'>
                <header>
                    <a href='/' />
                </header>
                <div className='inner-content'>
                    {children}
                </div>
            </div>
        </Wrapper>
    );
};
