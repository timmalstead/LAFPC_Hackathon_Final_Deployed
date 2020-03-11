import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DivDataModal = styled.div`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 60%;
  background: #8bc147;
  display: flex;
  justify-content: center;
`

export const ContainModal = styled.div`
  width: 50%;
  background: white;
  text-align: center;
`

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 30px;
  margin-bottom: 2rem;
  height: 20em;
  overflow: scroll;
`
export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-bottom: 9px;
`
export const TableData = styled.div`
  margin: 1px;
  width: 24%;
  height: 50px;
  text-align: center;
  overflow: hidden;
  &:hover {
    background: #8bc147;
    opacity: 0.8;
  }
`

export const TableDataHeader = styled.div`
  margin: 1px;
  width: 24%;
  height: 30px;
  text-align: center;
`

export const TableDataButton = styled.div`
  margin: 1px;
  width: 11%;
  height: 50px;
  text-align: center;
`

export const Button = styled.button`
  width: 100%;
  padding: 3px;
  border-radius: 2px;
`
export const H1 = styled.h1`
  font-size: 1em;
  font-weight: normal;
  background: #8bc147;
  margin: 0px;
  margin-bottom: 2px;
  color: white;
`
export const P = styled.p`
  font-size: 0.8em;
  margin: 0px;
`
export const DescribSec = styled.div`
  display: flex;
  flex-direction: column;
  height: 344px;
  width: 800px;
  text-align: center;
  margin: 0 0 0 10%;
  font-family: "Gothic A1", sans-serif;
`
export const DescribPar = styled.p`
  text-align: left;
  margin: 2% 0 2% 0;
  width: 100%;
  font-family: "Gothic A1", sans-serif;
  font-weight: normal;
  font-size: 14px;
`
export const DescribH1 = styled.div`
  text-align: left;
  margin: 2% 0 2% 0;
  font-family: "Gothic A1", sans-serif;
  font-size: 20px;
  font-weight: 900;
`

export const ChartDiv = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-evenly;
  margin: 6%;
`

export const ToolKit = styled.div`
  flex-direction: column;
  margin: 3%;
`
