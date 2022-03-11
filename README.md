# date-range-calendar
> A calendar and date/date-range picker for react.  

* [Dependencies](#dependencies)
* [Setup](#setup)
* [Features](#features)


## Dependencies
* dayjs
* styled-components

## Setup
`npm i date-range-calendar`

## Code Examples
Default calendar with no props:
<img src='./img/default_example.png' width='100'>
```
import { Calendar } from 'date-range-calendar';

function App() {
  return (
    <Calendar />
  );
}
export default App;
```
Pass props to customize colors:
<img src='./img/colors_example.png' width='100'>

```
import { Calendar } from 'date-range-calendar';

function App() {
  return (
    <Calendar
      bgColor='#e0ffff'
      startBgColor='#228b22'
      endBgColor='#ab4e52'
      rangeColor='#faf0be'
    />
  );
}
export default App;
```
Pass set functions to receive start and end date values:
<img src='./img/callback_example.png' width='100'>
```
import React, { useState } from 'react';
import { Calendar } from 'date-range-calendar';

function App() {
  const [startDate, startDateSet] = useState('');
  const [endDate, endDateSet] = useState('');

  return (
    <div style={{padding: '2%'}}>
      
      <div style={{border: '1px solid black', padding: '5%', margin: '2%'}}>
        <div>Start Date: {startDate}</div>
        <div>End Date: {endDate}</div>
      </div>
    <div>
            <Calendar
      
        startSet={startDateSet}
        endSet={endDateSet}
        />
    </div>
        </div>
  );
}
export default App;
```
## Features
