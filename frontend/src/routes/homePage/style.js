import styled from "styled-components"

export const Container = styled.div`
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;
    padding: 50px;
    background: linear-gradient(45deg, #2c263a, #6b5769);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100vh;
`

export const Title = styled.h1`
    color: #fff;
    font-size: 2.5em;
`;

export const SpecialLetter = styled.a`
font-weight: 900;
text-decoration: underline;
`;

export const Paragraph = styled.p`
    font-size: 1.5em;
    margin-bottom: 20px;
`;

export const Button = styled.button`
    padding: 15px 30px;
    font-size: 1.2em;
    color: white;
    background-color: #2c0033;
    border: 3px solid #6b5769;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;

    &:hover {
        background-color: #440044;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.7);
        transform: translateY(-3px);
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

export const Image = styled.img`
    max-width: 150px;
    margin-bottom: 150px;
    transform: scale(4);
`;

export const Slogan = styled.p`
    font-size: 1.8em;
    margin-top: 20px;
    color: #fff;
`;
