---
layout: page
title: TWC NYC
permalink: /nyc/
---
<style>.event div,.event h3{margin:0 0 5px}.eventMeta b{font-size:16px}.event a{line-height:1}#calendarContainer{padding:0 0 20px}.social{list-style:none;margin:0;padding:0}.bottomLinks a{display:block;font-size:18px;line-height:1;padding:12px}.calendarLink{display:block;font-size:18px;line-height:1}.marg{margin:0 5px}.pad{padding:12px 0 24px}.main-wrapper main{max-width:1024px;padding-left:1.5em;padding-right:1.5em}.blurb p{font-size:21px;line-height:34px}@media screen and (max-width:920px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2){display:none}}@media screen and (max-width:640px){.header .supporting-links li:nth-child(1),.header .supporting-links li:nth-child(2),.header .work{display:none}.hideMobile{display:none}.event{padding:12px}.bottomLinks a{padding:6px 0}}#tech-workers-coalition-nyc {font-size:32px;line-height:1;}.mc-field-group{font-size:14px;}.mc-field-group label{display:block;}.mc-field-group input{margin: 0;padding:8px;width:100%;}#mc_embed_label{display:block;font-size:20px;font-weight:600;line-height:1;text-align:left !important;margin-bottom: 10px;}.col{flex:1;}.mR4{margin-right:4px;}.mB12{margin-bottom:12px}input{box-sizing:border-box;} #mc-embedded-subscribe{text-transform: initial;border-radius: 4px;font-size: 14px;font-weight: 600;margin: 0 auto;text-align: center;display: block}#mc_embed_signup{padding: 8px 0;}
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

<!-- Begin Mailchimp Signup Form -->
<div id="mc_embed_signup">
<form action="https://gmail.us20.list-manage.com/subscribe/post?u=31ceb0f0ef45a17d52c2763f4&amp;id=b4ea083849" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label id="mc_embed_label" for="mce-EMAIL" class="marg-b-2">Keep in touch with us - sign up for our <a href="https://us20.campaign-archive.com/home/?u=31ceb0f0ef45a17d52c2763f4&id=b4ea083849">newsletter</a></label>
  <div class="flex flex-row">
	<input type="email" value="" name="EMAIL" class="mR4" id="mce-EMAIL" placeholder="Your email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_31ceb0f0ef45a17d52c2763f4_b4ea083849" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
  </div>
</form>
</div>
<!--End mc_embed_signup-->

<hr />

<div class="flex justify-between ai-center pad">
  <b>Upcoming Events</b>
  <a class="calendarLink" href="https://calendar.google.com/calendar?cid=dGVjaHdvcmtlcnNjb2FsaXRpb25ueWNAZ21haWwuY29t">
    Subscribe!
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
        <h3><a href='${event.htmlLink}'>${event.summary}</a></h3>
        <div class="eventMeta flex">
          <b>${start}</b>
          <span class="marg hideMobile">|</span>
          <b>${event.location || ''}</b>
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
