import styled from "styled-components";

export const StyledSearchBar = styled.div`
    position: relative;
    width: 300px;
    @media (max-width: 992px){
        width: 100%;
    }
    .MuiTextField-root {
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