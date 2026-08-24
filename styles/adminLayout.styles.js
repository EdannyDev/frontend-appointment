import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background: var(--bg);
`;

export const Content = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  height: 100vh;
  background: var(--bg);

  @media (max-width: 768px) {
    margin-left: 56px;
    width: calc(100% - 56px);
    padding: 20px;
  }
`;