---
layout: page
title: NYC Local
permalink: /nyc/
---
<style>.event{padding:24px}.event:nth-child(odd){background:#f8f8f8}.event div,.event h3{margin:0 0 5px}.flex{align-items:center;display:flex}.jBetween{justify-content:space-between}.eventMeta b{font-size:16px}.event a{line-height:1}.event p{color:#444;font-size:18px;line-height:24px;margin:0;max-width:960px}#calendarContainer{padding:0 0 20px}.social{list-style:none;margin:0;padding:0}.bottomLinks a{display:block;font-size:18px;line-height:1;padding:12px}.calendarLink{display:block;font-size:18px;line-height:1}.marg{margin:0 5px}.pad{padding:12px 0 24px}.main-wrapper main{max-width:1024px;padding-left:1.5em;padding-right:1.5em}#new-york-city-tech-workers-coalition{font-size:48px;line-height:56px;margin:0}.blurb{color:#444;font-size:21px;line-height:32px}@media screen and (max-width:920px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2){display:none}}@media screen and (max-width:640px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2),.header .work{display:none}#new-york-city-tech-workers-coalition{font-size:32px;line-height:36px}.clamp{-webkit-box-orient:vertical;-webkit-line-clamp:3;display:-webkit-box;overflow:hidden}.calendarLink{margin:12px 0 0}.hideMobile{display:none}.flex{align-items:initial;flex-direction:column}.event{padding:12px}.bottomLinks a{padding:6px 0}}</style>

# New York City Tech Workers Coalition

<div class="blurb">
  <p>
    We are the New York City local of Tech Workers Coalition, established in October 2018.
  </p>
  <p>We strive to build worker power and an inclusive & equitable tech industry through rank & file self-organization and education.
  </p>
  <p>We discuss and take action on the impacts of technology on workers and communities.</p>
  <p>Broadly, this is what we’ve been doing at our current capacity:</p>
  <ul>
    <li>Building power among tech workers through self-organization and collective action in our workplaces and across our industry.</li>
    <li>Building solidarity between other worker-led movements and creating a community network that is not based on company, career type, professional development, or skill.</li>
    <li>Educating ourselves as a movement in order to understand how change is made, to inform and ground our organizing work, and to challenge the dominant narratives in tech that center around power and privilege at the expense of workers’ own diverse experiences.</li>
  </ul>
  <p>We welcome current and former tech, tech-adjacent, and non-tech workers to organize, learn and build power with us.</p>
  <p>Nervous about attending your first meeting? Read our <a href="https://docs.google.com/document/d/1jvRbOb6MruP_dpL9G0Gk9LlILhYdNlgVEuCEhiu-UKY/edit">onboarding doc</a>!</p>
</div>

<hr />

<div class="flex jBetween pad">
  <b>Upcoming Events</b>
  <a class="calendarLink" href="https://calendar.google.com/calendar?cid=dGVjaHdvcmtlcnNjb2FsaXRpb25ueWNAZ21haWwuY29t">
    Subscribe to our calendar!
  </a>
</div>

<div id='calendarContainer'></div>

<hr />

<div class="flex jBetween bottomLinks">
  <ul class="flex social">
   <li><a href="https://www.facebook.com/TechWorkersCoalition">Facebook</a></li>
   <li><a href="https://www.meetup.com/Tech-Workers-Coalition-NYC">Meetup (NYC)</a></li>
   <li><a href="https://twitter.com/techworkersco)">Twitter</a></li>
  </ul>
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeV4tzvOnYpzfXekaLPqWmIyT09YwNsFa5EEEbmybvT7zXXmw/viewform">
    Have an event idea? Let us know!
  </a>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script>
  const apikey = 'AIzaSyBOuYD41nxrqEFFqrT_M3TgbYVl14BJuc4';
  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/techworkerscoalitionnyc@gmail.com/events?key=${apikey}`;

  const calendarContainer = document.getElementById('calendarContainer');

  const dateTime2Date = dateString => new Date(new Date(dateString).toDateString());

  const showCalendarEvents = json => {
    const items = json.items || [];
    const events = items
      .filter(event => dateTime2Date(event.start.dateTime) >= dateTime2Date(Date.now()))
      .sort((a,b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

    for (const event of events) {
      const eventDiv = document.createElement('div');
      const start = moment(event.start.dateTime).format('LLLL');
      eventDiv.className = 'event';

      const eventMarkup = `
        <h3><a href='${event.htmlLink}'>${event.summary}</a></h3>
        <div class="eventMeta flex">
          <b>${start}</b>
          <span class="marg hideMobile">|</span>
          <b>${event.location || 'Location To Be Determined'}</b>
        </div>
        ${event.description ? `<p class="clamp">${event.description}</p>` : ''}
      `;

      eventDiv.innerHTML = eventMarkup;
      calendarContainer.appendChild(eventDiv);
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
