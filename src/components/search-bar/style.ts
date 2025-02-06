import styled from "styled-components";

export const StyledSearchBar = styled.div`
    position: relative;
    width: 300px;
    
    .MuiTextField-root {
        background-color: ${({ theme }) => theme.colors.lightGray};
        border-radius: 20px;
        
        .MuiOutlinedInput-root {
            border-radius: 20px;
        }
    }
`;

export const StyledSearchResults = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 8px;

    .search-result-item {
        display: flex;
        align-items: center;
        padding: 12px;
        gap: 12px;
        transition: background-color 0.2s;

        &:hover {
            background-color: ${({ theme }) => theme.colors.lightGray};
        }

        img {
            object-fit: cover;
            border-radius: 4px;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`; 