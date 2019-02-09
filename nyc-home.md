---
layout: page
title: NYC Local 
permalink: /nyc/
---

# New York City Tech Workers Coalition

We are the New York City local of Tech Workers Coalition. We strive to build worker power and an inclusive & equitable tech industry through rank & file self-organization and education. We discuss and take action on the impacts of technology on workers and communities.

[Subscribe to our calendar!](https://calendar.google.com/calendar?cid=dGVjaHdvcmtlcnNjb2FsaXRpb25ueWNAZ21haWwuY29t){: .calendarlink }

## Upcoming events
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script>
  const calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/techworkerscoalitionnyc@gmail.com/events?key=AIzaSyBRDQsqmAWq_yKeYOJt3rE58IYsfCLalMU';

  const showCalendarEvents = json => {
    const events = json
      .items
      .sort((a,b) => new Date(a.start.dateTime) - new Date(b.start.dateTime))

    const mainContent = document.querySelector('body > div > main > section > div');

    for (const event of events) {
      const eventName = document.createElement('h3');
      const eventTime = document.createElement('h3');
      eventTime.style.color = '#E6141B';
      const eventEndTime = document.createElement('div');
      const eventLocation = document.createElement('div');

      const start = moment(event.start.dateTime).format('LLLL')

      eventName.innerText = event.summary;
      eventTime.innerText = start;
      eventLocation.innerText = event.location;

      mainContent.appendChild(eventName);
      mainContent.appendChild(eventTime);
      mainContent.appendChild(eventEndTime);
      mainContent.appendChild(eventLocation);
    }
  }

  fetch(calendarUrl)
  .then(function(res) {
    return res.json()
  })
  .then(function(res) {
    showCalendarEvents(res);
  });


</script>

