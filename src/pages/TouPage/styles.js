import styled from 'styled-components'

export const TouCard = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  width: 100%;
  max-width: 750px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  font-family: 'Inter';
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  flex: 1;
  padding-bottom: 15px;
`

export const TouUnderline = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
