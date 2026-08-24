import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg);
`;

export const Content = styled.main`
  padding: 2rem;
  padding-top: 5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    padding-top: 4.5rem;
  }
`;