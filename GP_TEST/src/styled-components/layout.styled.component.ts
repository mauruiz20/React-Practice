import styled from 'styled-components';

export const LayoutContainer = styled.div`
    width: 80vw;

    @media only screen and (max-width: 1176px) {
        padding: 12px;
    }

    &::-webkit-scrollbar {
        width: 8px;
        left: 15px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #c9c9c9;
        border-radius: 16px;
    }
`;
