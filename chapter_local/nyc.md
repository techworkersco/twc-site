---
layout: page
title: TWC NYC
permalink: /nyc/
---
<style>.event a{line-height:1}#calendarContainer{padding:0 0 20px}.social{list-style:none;margin:0;padding:0}.bottomLinks a{display:block;font-size:18px;line-height:1;padding:12px}.calendarLink{display:block;font-size:18px;line-height:1}.marg{margin:0 5px}.pad{padding:12px 0 24px}.main-wrapper main{max-width:1024px;padding-left:1.5em;padding-right:1.5em}@media screen and (max-width:920px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2){display:none}}@media screen and (max-width:640px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2),.header .work{display:none}.hideMobile{display:none}.event{padding:12px}.bottomLinks a{padding:6px 0}}#tech-workers-coalition-nyc {font-size:32px;line-height:1;}.mc-field-group{font-size:14px;}.mc-field-group label{display:block;}.mc-field-group input{margin: 0;padding:8px;width:100%;}#mc_embed_label{display:block;font-size:20px;font-weight:600;line-height:1;text-align:left !important;margin-bottom: 10px;}.col{flex:1;}.mR4{margin-right:4px;}.mB12{margin-bottom:12px}input{box-sizing:border-box;} #mc-embedded-subscribe{text-transform: initial;border-radius: 4px;font-size: 14px;font-weight: 600;margin: 0 auto;text-align: center;display: block}#mc_embed_signup{padding: 8px 0;}
.event{background:#f8f8f8;border-radius:4px;padding:24px;margin:24px 0;}
.event article {font-size:18px;line-height:24px;margin:0;max-width:960px;max-height: 200px;overflow:scroll;}
@media (prefers-color-scheme: dark) {
  .event{background:#222;}
}</style>

<h1 class="marg-b-2">
  Tech Workers Coalition (NYC)
</h1>

<div class="blurb">
  <p>We are the New York City local of Tech Workers Coalition, established in October 2018.</p>
  <p>We strive to build worker power and an inclusive & equitable tech industry through rank & file self-organization and education.</p>
  <p>We discuss and take action on the impacts of technology on workers and communities.</p>
  <p>We build bridges between tech workers of different companies, and between tech workers and the labor movement.</p>
  <p>We welcome current and former tech, tech-adjacent, and non-tech workers to organize, learn and build power with us.</p>
  <p>Nervous about attending your first meeting? Read our <a href="https://docs.google.com/document/d/1jvRbOb6MruP_dpL9G0Gk9LlILhYdNlgVEuCEhiu-UKY/edit">onboarding doc</a> to learn more!</p>
  <p>And last, but not least, if you have any questions or requests regarding accessibility or childcare, please reach out to us at our email, info AT techworkersco.nyc, and we will do our best to address them!</p>
</div>

<!-- Begin ActionNetwork Signup Form -->
<link
  href='https://actionnetwork.org/css/style-embed-whitelabel-v3.css'
  rel='stylesheet'
  type='text/css' />
<style>
  #can_embed_form_inner > * {
    display: none;
  }
  #can_embed_form {
    border: none !important;
    padding: 0 !important;
  }
  #can_main_col {
    display: none;
  }
  #can_sidebar h4 {
    display: none;
  }
  #can_embed_form input[type=submit] {
    padding: 10px !important;
  }
</style>
<script src='https://actionnetwork.org/widgets/v5/form/nyc-signup?format=js&source=widget'></script>
<div id='can-form-area-nyc-signup' class="mt-4 mb-4"></div>
<!-- Begin ActionNetwork Signup Form -->

<hr />

<div class="flex justify-between ai-center pad">
  <b>Upcoming Events</b>
  <a class="calendarLink" href="https://calendar.google.com/calendar?cid=dGVjaHdvcmtlcnNjb2FsaXRpb25ueWNAZ21haWwuY29t">
    Calendar Subscribe!
  </a>
</div>
<div id='calendarContainer'></div>

<hr />

<div class="d:flex justify-between bottomLinks">
  <ul class="d:flex social">
   <li><a href="https://www.meetup.com/Tech-Workers-Coalition-NYC">Meetup (NYC)</a></li>
   <li><a href="https://twitter.com/techworkerscony">Twitter (NYC)</a></li>
  </ul>
  <ul class="d:flex social">
    <li>
      <a href="https://forms.gle/1rFMvppxPj7FvShbA">
        Suggest an event
      </a>
    </li>
    <li>
      <a href="mailto:info@techworkersco.nyc">
        Contact Us
      </a>
    </li>
  </ul>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script nonce="{% nonce %}">
  const apikey = 'AIzaSyB9Gj0gvJvkQYaFPlxtsIGj8QkefAp5jgo';
  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/techworkerscoalitionnyc@gmail.com/events?key=${apikey}`;

  const calendarContainer = document.getElementById('calendarContainer');
  const dateTime2Date = dateString => new Date(new Date(dateString).toDateString());

  const showCalendarEvents = json => {
    const items = json.items || [];
    const events = items
      .filter((ev = {}) => {
        const dateTime = ev.start ? ev.start.dateTime : "";
        return dateTime2Date(dateTime) >= dateTime2Date(Date.now())
      })
      .sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

    for (const event of events) {
      const eventDiv = document.createElement('div');
      const start = moment(event.start.dateTime).format('LLLL');
      eventDiv.className = 'event';

      const eventMarkup = `
        <h3 class="marg-b-2"><a href='${event.htmlLink}'>${event.summary}</a></h3>
        <div class="marg-b-2">
          <div><b>${start}</b></div>
          <div><b>${event.location || 'Check the slack channel for location details'}</b></div>
        </div>
        <article>
          ${event.description}
        </article>
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
