import styled from 'styled-components'

export const ReportSection = styled.div`
  display: flex;
  max-width: 750px;
  padding: 17px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
`

export const ReportTitle = styled.div`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const ReportSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.white.mode1};
`
