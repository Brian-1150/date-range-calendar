import React, { useEffect, useState } from "react"
import * as calendarHelper from './CalendarHelpers'
import * as styles from '../styles'
import dayjs from "dayjs";
import useViewPortSize from "../Hooks/viewPortSize";
// { children }: { children: ReactNode }
const today = dayjs();

type CalendarProps = {
  begin?: string //format mmyym(0820 for august 2020)
  end?: string //format mmyy
  rangeLimit?: number  //default 30
  bgColor?: string
  startColor?: string
  endColor?: string
  rangeColor?: string
  startSet?: (start: string) => void
  endSet?: (end: string) => void
  blackoutColor?: string
}

export const Calendar = (props: CalendarProps) => {

  const [pickUpDate, pickUpDateSet] = useState('Pick-up Date')
  const [dropOffDate, dropOffDateSet] = useState('Drop-off Date')
  const [pickUpDayAsNumber, pickUpDayAsNumberSet] = useState(0)
  // const [pickUpDateAsDateObj, pickUpDateAsDateObjSet] = useState<Dayjs | null>(null)
  // const [dropOffDateAsDateObj, dropOffDateAsDateObjSet] = useState<Dayjs | null>(null)
  const [pickUpDateSelected, pickUpDateSelectedSet] = useState(false)
  const [dropOffDateSelected, dropOffDateSelectedSet] = useState(false)
  const [pickMonth, pickMonthSet] = useState(0)
  const [monthRangeLimit, monthRangeLimitSet] = useState(2);
  // const [pickUpTime, pickUpTimeSet] = useState('Pick-up Time')
  // const [dropOffTime, dropOffTimeSet] = useState('Drop-off Time')
  // const [pickUpTimeSelected, pickUpTimeSelectedSet] = useState(false)
  // const [dropOffTimeSelected, dropOffTimeSelectedSet] = useState(false)
  const { width } = useViewPortSize();

  useEffect(() => {
    let days = 30;
    if (props.rangeLimit) {
      for (let i = 2; i < 26; i++) {
        if (props.rangeLimit < days) {
          monthRangeLimitSet(i);
          return;
        }
        days = days + 30
      }
    }
  }, []);

  useEffect(() => {
    if (props.startSet)
      props.startSet(pickUpDate)

  }, [pickUpDate]);

  useEffect(() => {
    if (props.endSet)
      props.endSet(dropOffDate)

  }, [dropOffDate]);

  const handleCalendarClicks = (e: React.MouseEvent<HTMLDivElement>) => {


    const input = e.target as HTMLDivElement;
    let monthYear = input.parentElement?.parentElement?.previousSibling?.previousSibling?.textContent as string
    if (width > 999) {
      monthYear = monthYear.slice(0, -1) //Removes the navigation '>' & '<'
    }
    let targetMonth = calendarHelper.getMonthAsNum(monthYear)
    console.log(pickMonth);
    console.log('target', targetMonth);


    const proceed = (targetMonth - pickMonth < monthRangeLimit) && (targetMonth - pickMonth > 0) && ((31 - pickUpDayAsNumber) + parseInt(input.innerText) < 31)
    if (input.innerText == '') {
      return;
    }
    if (!pickUpDateSelected && !dropOffDateSelected) {
      pickUpDateSet(`${input.innerText} ${monthYear}`)
      pickMonthSet(calendarHelper.getMonthAsNum(monthYear))
      pickUpDayAsNumberSet(parseInt(input.innerText))
      pickUpDateSelectedSet(true)
      highlightSelection(e);
    }
    else if (pickUpDateSelected && !dropOffDateSelected) {
      if ((targetMonth > pickMonth && !proceed))
        alert(`${props.rangeLimit} day max rental period`)
      if ((targetMonth == pickMonth && parseInt(input.innerText) <= parseInt(pickUpDate)) || targetMonth < pickMonth) {
        resetDivs()
        pickUpDateSet(`${input.innerText} ${monthYear}`)
        pickMonthSet(calendarHelper.getMonthAsNum(monthYear))
        pickUpDayAsNumberSet(parseInt(input.innerText))
        pickUpDateSelectedSet(true)
        highlightSelection(e);
      }
      else if (targetMonth == pickMonth || (proceed)) {
        dropOffDateSet(`${input.innerText} ${monthYear}`)
        let dodan = (parseInt(input.innerText))
        let pudan = pickUpDayAsNumber
        dropOffDateSelectedSet(true)
        highlightSelection(e);
        highlightRange(e, pudan, dodan, targetMonth, proceed);
      }
    }
    else if (pickUpDateSelected && dropOffDateSelected) {
      resetDivs()
      pickUpDateSet(`${input.innerText} ${monthYear}`)
      pickMonthSet(calendarHelper.getMonthAsNum(monthYear))
      pickUpDayAsNumberSet(parseInt(input.innerText))
      pickUpDateSelectedSet(true)
      highlightSelection(e)
      dropOffDateSet('please select')
      dropOffDateSelectedSet(false)
    }
  }
  const highlightSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const input = e.target as HTMLElement;
    input.style.color = 'white'
    input.style.backgroundColor = 'steelblue'
  }
  const resetDivs = (times?: boolean) => {
    let timeDivs = document.querySelectorAll('aside p, section p')
    let container = document.querySelectorAll('p')
    if (times) {
      Array.from(timeDivs).forEach((p) => {
        let time = p as HTMLDivElement;
        time.style.background = 'inherit';
        time.style.fontWeight = 'inherit';
        time.style.color = 'lightgray';
      })
    }

    container.forEach((div) => {
      let box = div as HTMLParagraphElement;
      if ((box.style.color == 'white') || (box.style.backgroundColor == 'lightblue') || box.style.backgroundColor == 'steelblue') {
        box.style.color = 'inherit';
        box.style.fontWeight = 'inherit';
        box.style.backgroundColor = 'inherit';
        if ((box.parentElement?.parentElement?.previousSibling?.previousSibling?.textContent as string).includes(dayjs().format('MMMM')) && (parseInt(div.textContent as string)) < parseInt(dayjs().format('D'))) {
          box.style.color = 'lightgray';
        }
      }
    })
  }

  const highlightRange = (e: React.MouseEvent<HTMLDivElement>, pudan: number, dodan: number, targetMonth: number, proceed: boolean) => {
    /* input is box that was clicked
     first parent is the row of days(week)
     next parent is the collection of rows that make up the calendar(4 or 5 or 6 rows depending which month)
     previous sibling is the list of day names
     previous sibling is the month and year (October 2021)
     pudan = pick up date as number, dodan = drop off date as number
     */
    const input = e.target as HTMLElement;
    let row1ofTargetMonth = input.parentElement?.parentElement?.firstChild;
    let row1ofPrevMonth = width > 999 ?
      input.parentElement?.parentElement?.previousElementSibling?.previousElementSibling?.parentElement?.previousElementSibling?.firstChild?.nextSibling?.nextSibling?.firstChild
      : input.parentElement?.parentElement?.previousElementSibling?.previousElementSibling?.previousElementSibling?.firstChild;
    if (targetMonth == pickMonth) {
      for (let i = 0; i < 6; i++) {
        let child = row1ofTargetMonth?.firstChild as HTMLElement
        for (let j = 0; j < 7; j++) {
          if (parseInt(child?.textContent as string) > pudan && parseInt(child?.textContent as string) < dodan) {
            child.style.backgroundColor = 'lightblue'
          }
          child = child?.nextSibling as HTMLElement
        }
        row1ofTargetMonth = row1ofTargetMonth?.nextSibling
      }
    }
    else if (proceed) {
      for (let i = 0; i < 6; i++) {
        let child = row1ofTargetMonth?.firstChild as HTMLElement
        for (let j = 0; j < 7; j++) {
          if (parseInt(child?.textContent as string) < dodan) {
            child.style.backgroundColor = 'lightblue'
          }
          child = child?.nextSibling as HTMLElement
        }

        row1ofTargetMonth = row1ofTargetMonth?.nextSibling
      }
      for (let i = 0; i < 6; i++) {
        let child2 = row1ofPrevMonth?.firstChild as HTMLElement
        for (let j = 0; j < 7; j++) {
          if (parseInt(child2?.textContent as string) > pudan) {
            child2.style.backgroundColor = 'lightblue'
          }
          child2 = child2?.nextSibling as HTMLElement
        }
        row1ofPrevMonth = row1ofPrevMonth?.nextSibling
      }
    }
  }


  return (
    <>
      <div>
        <Grid blackoutColor={props.blackoutColor} handleCalendarClicks={(e) => handleCalendarClicks(e)} bgColor={props.bgColor}
        />
      </div>

    </>
  );
}


interface IGridProps {
  handleCalendarClicks: (e: React.MouseEvent<HTMLDivElement>) => void
  bgColor?: string
  blackoutColor?: string
}
function Grid(props: IGridProps) {

  let startingMonth = today.month() + 1;
  let startingYear = today.year();
  let monthsArray = new Array();

  monthsArray.push(<CalendarMonth blackoutColor={props.blackoutColor} key={0} strikethroughDays={true} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} month={startingMonth} year={startingYear.toString()} />)
  startingMonth == 12 ? startingYear++ : startingYear = startingYear;
  startingMonth == 12 ? startingMonth = 1 : startingMonth++

  for (let i = 0; i < 12; i++) {
    monthsArray.push(<CalendarMonth blackoutColor={props.blackoutColor} key={i + 1} strikethroughDays={false} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} month={startingMonth} year={startingYear.toString()} />)
    if (startingMonth == 12) {
      startingYear++;
      startingMonth = 1;
    }
    else {
      startingMonth++
    }
  }
  return (
    <>
      <styles.main_flex_container color={props.bgColor}>
        {monthsArray}
      </styles.main_flex_container>
    </>
  );
}


interface IMonthProps {
  month: number
  year: string
  handleCalendarClicks: (e: React.MouseEvent<HTMLDivElement>) => void;
  strikethroughDays: boolean
  blackoutColor?: string
}

function CalendarMonth(props: IMonthProps) {
  const firstDayOfCurrentMonth = dayjs(`${props.year}-${props.month}-01`)
  const dayOfWeek: number = dayjs(firstDayOfCurrentMonth).day()
  const monthTitle = calendarHelper.getNextMonth(props.month)
  const numberOfDaysInMonth = calendarHelper.getNumberOfDaysInMonth(props.month, props.year)
  const numberOfRows = calendarHelper.getNumberOfRows(props.month, numberOfDaysInMonth, dayOfWeek)

  return (
    <>
      <styles.month>{monthTitle} {props.year}</styles.month>
      <styles.day_names>Sun Mon Tue Wed Thu Fri Sat</styles.day_names>
      <styles.grid_flex_container>
        <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={0} />
        <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={1} />
        <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={2} />
        <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={3} />
        {(numberOfRows >= 5) && <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={4} />}
        {(numberOfRows == 6) && <CalendarRow blackoutColor={props.blackoutColor} strikethroughDays={props.strikethroughDays} handleCalendarClicks={(e) => props.handleCalendarClicks(e)} dayOfWeek={dayOfWeek} numberOfDaysInMonth={numberOfDaysInMonth} rowNumber={5} />}

      </styles.grid_flex_container>
    </>
  );
}


interface IRowProps {
  rowNumber: number,
  dayOfWeek: number,
  numberOfDaysInMonth: number
  handleCalendarClicks?: (e: React.MouseEvent<HTMLDivElement>) => void
  strikethroughDays?: boolean
  blackoutColor?: string
}

function CalendarRow(props: IRowProps) {

  const dates = calendarHelper.getOneMonthArray(props.dayOfWeek, props.numberOfDaysInMonth)
  let rowNumber = 0;
  rowNumber += props.rowNumber;
  let startIndex: number = (rowNumber * 7);
  let endIndex = startIndex + 7;

  return (
    <>
      <styles.flex_row>
        {
          dates.slice(startIndex, endIndex).map((d, index) =>

            <CalendarBox key={index} value={d} strikethroughDays={props.strikethroughDays} blackoutColor={props.blackoutColor} handleCalendarClicks={props.handleCalendarClicks} />

          )
        }
      </styles.flex_row>
    </>
  )
}


interface CalendarBoxProps {
  value: number | string
  handleCalendarClicks?: (event: React.MouseEvent<HTMLDivElement>) => void
  strikethroughDays?: boolean
  blackoutColor?: string
  // handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

function CalendarBox(props: CalendarBoxProps) {

  let value = props.value
  let blackoutDays = new Array()
  if (props.strikethroughDays) {
    blackoutDays = calendarHelper.getBlackoutDays();
    for (let i = 0; i < blackoutDays.length; i++) {
      if (value == blackoutDays[i]) {
        return (
          <styles.blackout_days_p color={props.blackoutColor} onClick={() => { }}>
            {value}
          </styles.blackout_days_p>
        );
      }
    }
  }
  return (
    <styles.grid_flex_container_p
      onClick={props.handleCalendarClicks} >        {value}
    </styles.grid_flex_container_p>

  );
}