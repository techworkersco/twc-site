---
layout: home
---
<script>
$(document).ready(function(){
// Add smooth scrolling to all links
$("a").on('click', function(event) {

// Make sure this.hash has a value before overriding default behavior
if (this.hash !== "") {
// Prevent default anchor click behavior
event.preventDefault();

// Store hash
var hash = this.hash;

// Using jQuery's animate() method to add smooth page scroll
// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
$('html, body').animate({
scrollTop: $(hash).offset().top
}, 800, function(){

// Add hash (#) to URL when done scrolling (default click behavior)
window.location.hash = hash;
});
} // End if
});
});
</script>
<div id="home">
<h1><span>Worker</span> power in the tech industry</h1>
<h2>Guided by our vision for an inclusive & equitable tech industry, TWC organizes to build worker power through rank & file self-organization and education.</h2>
</div>
<div id="learn">
<ul>
<li><h3>Who we are</h3><p>We are a coalition of workers in and around the tech industry, labor organizers, community organizers, and friends.</p></li>
<li><h3>Why we organize</h3><p>We organize for activism, civic engagement and education in the Bay Area, Seattle, and across the United States.</p></li>
<li><h3>Who we support</h3><p>We work in solidarity with existing movements towards social justice, workers rights, and economic inclusion.</p></li>
</ul>
<div id="how"><h3>How we work</h3><p>We’re a democratically structured, all-volunteer, and worker-led organization. At this point, membership consists of attending meetings in person and working on the various projects that people are interested in. We organize online but IRL is the crux of what we do. Check out our <a href="https://s3-us-west-1.amazonaws.com/techworkerscoalition.org/assets/files/TWCInfosheet.pdf">Info Sheet</a> and <a href="/community-guide">Community Guide</a> for more info.</p></div>
</div>

<div id= "connect">
<h3>Check out a meeting</h3><p>We currently have monthly organization meetings in <a href="https://www.meetup.com/Tech-Workers-Coalition/">San Francisco</a> and <a href="">Seattle</a></p>
<h3>Join the discussion & know the latest</h3><ul>
<li><a href="/subscribe">Slack channel</a></li>
<li><a href="/subscribe">Newsletter</a></li>
<li><a href="/events">SF Calendar</a> / <a href="">Seattle Calendar</a></li>
<li><a href="https://sites.google.com/view/tech-workers-coalition/learning-club">Learning Club</a></li>
</ul>
<h3>TWC on social media</h3><ul id="social">
<li><a href="https://twitter.com/techworkersco">Twitter</a></li>
<li><a href="https://www.facebook.com/TechWorkersCoalition">Facebook</a></li>
<li><a href="https://medium.com/tech-workers-coalition">TWC Blog</a></li>
</ul>
<h3>Contact us</h3>
<p>We’re also happy to chat, answer any questions you might have, or hear about any social justice efforts in which you need a partner. <a href="mailto:hello@techworkersco.org">Send us an email</a></p>
<p>If you’re a member of the press, please get in touch with us through <a href="mailto:press@techworkersco.org">press@techworkersco.org</a></p>
</div>




