import styled from "@emotion/styled";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 40px 36px;
  border-radius: 16px;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.08),
    0 10px 20px rgba(0, 0, 0, 0.05);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: #171717;
`;

export const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 15px;
  color: #525252;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #404040;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 0 14px;
  transition: border-color 0.3s;

  &:focus-within {
    border-color: #262626;
  }
`;

export const IconWrapper = styled.div`
  color: #737373;
  font-size: 14px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 6px;
  font-size: 14px;
  color: #171717;

  &::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 12px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #171717;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #262626;
  }
`;

export const Message = styled.p`
  font-size: 15px;
  text-align: center;
  color: ${(props) =>
    props.type === "error" ? "#b91c1c" : "#15803d"};
`;

export const Footer = styled.p`
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
  color: #525252;
`;

export const LinkText = styled.span`
  color: #171717;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;