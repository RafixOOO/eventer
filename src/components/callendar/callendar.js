import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        firstDay={1}
        weekends={true}
        navLinks={false}
        businessHours={true}
        editable={false}
        selectable={false}
        dayMaxEvents={true}
        eventClick={false}
        events={[
          { title: 'event 1', date: '2023-09-01', url: 'https://www.example.com/event1' },
        ]}
      />
    )
  }
}