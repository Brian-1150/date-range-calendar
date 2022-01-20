import styled from 'styled-components';

export const flex_row = styled.div`
    align-self: flex-start;
    display: flex;
    flex-flow: row nowrap;
    `;

// type calProps = {
//   color?: string
//   blackoutColor?: string
// }

export const main_flex_container = styled.div`
  background-color: ${props => props.color ? props.color : 'lightgray'};
  display: flex;
  flex-flow: column nowrap;
  width: 90vw;
  margin: 0 auto;
  padding-bottom: 180px;
  align-items: center;
`;

export const calendar_container = styled.div`
  z-index: 5;
`;

export const month = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #0067B4;
  padding: 5% 0;
  text-align: center;
`;

export const day_names = styled.div`
  font-size: 12px;
  padding: 1px 0 0 2px;
  word-spacing: 25px;
`;

export const grid_flex_container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const blackout_days_p = styled.p`
  color: ${props => props.color ? props.color : 'red'};
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  margin: .4em .7em;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const grid_flex_container_p = styled.p`
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  margin: .4em .7em;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const pick_dates = styled.div`
  color: black;
  text-decoration: underline;
  cursor: pointer;
`;

export const content = styled.div`
  position: absolute;
  top: 90px;
  bottom: 0;
  left: 50 %;
  transform: translate(-50 %, 0);
  width: 100 %;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border-top-left-radius: 11px;
  border top-right-radius: 11px;
  outline: none;
`;



export const overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(3, 0, 0, 0.103);

`;


