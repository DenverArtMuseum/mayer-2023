---
layout: base.11ty.js
classes:
  - title-page
order: 3
outputs:
  - pdf
toc: false
---

<section class="title-block">

<h1 class="title">Collecting the<br>“Other Americas” <span class="pdf-title-page-subtitle">Ancient Americas Collections<br>in American Art Museums</span></h1>

{%- if publication.contributor_as_it_appears -%}
  <p class="contributor">{{ publication.contributor_as_it_appears | markdownify }}</p>
{%- else -%}
  <p class="contributor">{% contributors context=publicationContributors type="primary" format="string" %}</p>
{%- endif -%}

</section>

<section class="publisher-block">

{%- for publisher in publication.publisher -%}
  {%- if publisher.name -%}
    <p class="publisher">{{ publisher.name }}{% if publisher.location %}, {{ publisher.location }}{% endif %}</p>
  {%- endif %}
{%- endfor -%}

</section>
