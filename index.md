---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: landing
username: midhundevasia
---

<div class="m-1 p-2 pt-2 row ">
    <div class="col-12 col-md-4 text-center">
        <a href="/" ><img src="/logo.png" width="200px" class="mb-2">
        {% avatar midhundevasia size=300 %}
        </a>
        <div class="pt-3">
        {%- include social.html -%}
        </div>
    </div>
    <div class="col-12 col-md-8 text-muted text-justify">
        <p class="fs-4"> 
I am a computer science professional specializing in PHP and Go development, with a strong passion for open-source contribution. Beyond technology, I’m an avid cyclist and marathon runner who loves outdoor challenges. I also enjoy exploring creativity through various art forms. With a continuous drive to learn and evolve, I strive to build efficient, impactful solutions in everything I do.
</p>
        <p class="text-center">
            <a class="btn btn-primary btn-sm text-light" href="/projects">Projects</a>
            <a class="btn btn-primary btn-sm text-light" href="/blog">Blog</a>
            <a class="btn btn-primary btn-sm text-light" href="/events/2024">Calendar 2024</a>
        </p>
    </div>
</div>
