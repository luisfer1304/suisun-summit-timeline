(function(){
  'use strict';
  const data = window.SUISUN_DATA || {years:{}, speakers:[]};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const esc = (value='') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const initials = name => name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  const yearEntries = Object.values(data.years).filter(item=>item.year>=2022).sort((a,b)=>a.year-b.year);

  // Common, progressive-enhancement interactions.
  const menuToggle = $('.menu-toggle');
  const nav = $('#main-nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click',()=>{
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }
  $$('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Home page: interactive year timeline card.
  const preview = $('#year-preview');
  if(preview){
    const previewContent = {
      2022:{label:'HISTORICAL RECORD · 2022',title:'A year to document',copy:'The 2022 entry is ready for verified dates, program details, speaker information, and original photographs.',meta:'2022 ARCHIVE · DETAILS TO BE CONFIRMED',img:'',alt:'Photo placeholder for the 2022 Summit archive'},
      2023:{label:'VIDEO COLLECTION · 2023',title:'Revisit the sessions',copy:'The official recording collection offers a way back into the presentations. Full agenda and photo records can be added as the archive is assembled.',meta:'RECORDINGS AVAILABLE · 2023',img:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2023.png',alt:'Suisun Summit 2023 cover'},
      2024:{label:'SESSION ARCHIVE · 2024',title:'Build on the conversation',copy:'Explore a session collection spanning event-related potentials, biomarkers, qEEG, neurofeedback, and clinical applications.',meta:'17 LESSONS · 20 HOURS OF VIDEO',img:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2024.png',alt:'Suisun Summit 2024 cover'},
      2025:{label:'RECORDINGS AVAILABLE · 2025',title:'Gunkelman’s Eyeland',copy:'The 2025 edition connected neurofeedback, brain health, epilepsy, TBI, and AI-enabled EEG workflows with a very Suisun celebration.',meta:'OCT 8–12, 2025 · SUISUN CITY, CA',img:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2025.png',alt:'Suisun Summit 2025 cover'},
      2026:{label:'LATEST CHAPTER · 2026',title:'The Gifts of Neurodiversity',copy:'Honoring Jay Gunkelman and exploring strengths-based neuroscience, clinical insight, and the rich complexity of individual brains.',meta:'OCT 7–11, 2026 · SUISUN CITY, CA',img:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/Jay-Gunkelman-as-The-Godfather-qEEG-521x1024.jpg',alt:'Jay Gunkelman commemorative artwork from the 2026 Summit'}
    };
    const paintPreview = year => {
      const item = previewContent[year] || previewContent[2026];
      preview.innerHTML = `<div class="preview-main"><span class="preview-label">${esc(item.label)}</span><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p><div class="preview-meta"><span>${esc(item.meta)}</span></div><a class="text-link" href="summit.html?year=${year}">${year===2022?'Open the 2022 archive':'Open the '+year+' archive'} <span aria-hidden="true">↗</span></a></div><div class="preview-image">${item.img?`<img src="${esc(item.img)}" alt="${esc(item.alt)}" loading="lazy">`:`<div class="preview-image-placeholder"><span>2022</span><strong>Photo archive in progress</strong></div>`}<span class="preview-image-caption">THE SUMMIT, THROUGH THE YEARS</span></div><div class="preview-side"><span class="side-index">A LIVING ARCHIVE</span><p>Agendas, presenters, photographs, special events, and session recordings — collected in one place.</p><a href="summit.html?year=${year}" class="circle-arrow" aria-label="Explore ${year} archive">↗</a></div>`;
      $$('.year-pill').forEach(btn=>{const active=Number(btn.dataset.year)===Number(year);btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
    };
    $$('.year-pill').forEach(btn=>btn.addEventListener('click',()=>paintPreview(Number(btn.dataset.year))));
  }

  // Public portrait assets are shared by speaker profiles and year galleries.
  const portraitAssets={
    jaygunkelman:{src:'https://eegstrategies.com/wp-content/uploads/2025/02/Jay-Gunkelman-portrait.png',alt:'Jay Gunkelman, Summit presenter'},
    lyndathompson:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/lynda_thompson-1.jpg',alt:'Lynda Thompson, 2026 keynote speaker'},
    theresiastoeckldrax:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/theresia-maria-stoeckl-drax.jpg',alt:'Theresia Stoeckl-Drax, 2026 keynote speaker'},
    neilhughes:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/neil-hughes.jpg',alt:'Neil Hughes, 2026 Summit presenter'},
    robinbernhard:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/robin-bernhard.jpg',alt:'Robin Bernhard, 2026 Summit presenter'},
    lisabortolotto:{src:'https://eegstrategies.com/wp-content/uploads/2025/03/Lisa-Bortolotto.jpg',alt:'Lisa Bortolotto, Summit presenter'},
    heatherhargraves:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/04/hather_hargraves.jpg',alt:'Heather Hargraves, 2026 Summit presenter'},
    myahgittelson:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/myah-gittelson.jpg',alt:'Myah Gittelson, 2026 Summit presenter'},
    myahgittleson:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/myah-gittelson.jpg',alt:'Myah Gittelson, 2026 Summit presenter'},
    debramcclendon:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Debra-McClendon-PsyD-PhD.jpg',alt:'Debra McClendon, Summit presenter'},
    deborahmcclendon:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Debra-McClendon-PsyD-PhD.jpg',alt:'Debra McClendon, Summit presenter'},
    stepryall:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/stephaie-ryall.jpg',alt:'Steph Ryall, 2026 Summit presenter'},
    barbaraminton:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/barbara-minton.jpg',alt:'Barbara Minton, 2026 Summit presenter'},
    andreavila:{src:'https://eegstrategies.com/wp-content/uploads/2025/03/Andre-Avila.jpeg',alt:'Andre Avila, Summit presenter'},
    jurikropotov:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/juri_kropotov.jpg',alt:'Juri Kropotov, Summit presenter'},
    tiffthompson:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Tiff-Thompson-PhD-REEGT-BCN-LMFT.jpg',alt:'Tiff Thompson, Summit presenter'},
    nicholasjdogris:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Nicholas-Dogris-PhD-QEEG-D-BCN.jpg',alt:'Nicholas Dogris, Summit presenter'},
    nicholasdogris:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Nicholas-Dogris-PhD-QEEG-D-BCN.jpg',alt:'Nicholas Dogris, Summit presenter'},
    santiagobrand:{src:'https://eegstrategies.com/wp-content/uploads/2025/03/Santiago-Brand.jpg',alt:'Santiago Brand, Summit presenter'},
    lisatataryn:{src:'https://eegstrategies.com/wp-content/uploads/2025/02/Lisa-Tatayrn-MSc.jpg',alt:'Lisa Tataryn, 2025 keynote speaker'},
    leighsteinberg:{src:'https://eegstrategies.com/wp-content/uploads/2025/03/Leigh-Steinberg.jpg',alt:'Leigh Steinberg, 2025 keynote speaker'},
    donnasansone:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Donna-Sansone.jpg',alt:'Donna Sansone, Summit presenter'},
    jessicaeure:{src:'https://eegstrategies.com/wp-content/uploads/2025/06/Jessica-Eure-LPC-BCN-BCB-500px-x-500px.jpg',alt:'Jessica Eure, Summit presenter'},
    jessicameure:{src:'https://eegstrategies.com/wp-content/uploads/2025/06/Jessica-Eure-LPC-BCN-BCB-500px-x-500px.jpg',alt:'Jessica Eure, Summit presenter'},
    silvanamarkovskasimoska:{src:'https://eegstrategies.com/wp-content/uploads/2025/03/Silvana-Markovska.jpg',alt:'Silvana Markovska-Simoska, Summit presenter'},
    jaygattis:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Jay-Gattis-PsyD.jpg',alt:'Jay Gattis, Summit presenter'},
    kabranchapek:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Kabran_Chapek_350x350.jpg',alt:'Kabran Chapek, Summit presenter'},
    isabellaharvison:{src:'https://eegstrategies.com/wp-content/uploads/2025/07/Isabella-Harvison.jpg',alt:'Isabella Harvison, Summit presenter'},
    sharijohansson:{src:'https://eegstrategies.com/wp-content/uploads/2025/02/Shari-Johannson.jpg',alt:'Shari Johansson, Summit presenter'}
  };
  const normalizePerson=name=>String(name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');

  // Speaker directory filters.
  const speakerGrid = $('#speaker-grid');
  if(speakerGrid){
    const search = $('#speaker-search'), yearSelect = $('#speaker-year'), topicSelect = $('#speaker-topic'), count = $('#speaker-count');
    const topics = [...new Set(data.speakers.flatMap(s=>s.focus||[]))].sort((a,b)=>a.localeCompare(b));
    topics.forEach(topic=>{const opt=document.createElement('option');opt.value=topic;opt.textContent=topic;topicSelect.appendChild(opt);});
    const render = () => {
      const term=(search.value||'').trim().toLowerCase(), year=yearSelect.value, topic=topicSelect.value;
      const filtered=data.speakers.filter(s=>{
        const hay=[s.name,s.org,s.talk,...(s.focus||[]),...(s.years||[])].join(' ').toLowerCase();
        return (!term||hay.includes(term))&&(year==='all'||(s.years||[]).includes(Number(year)))&&(topic==='all'||(s.focus||[]).includes(topic));
      }).sort((a,b)=>a.name.localeCompare(b.name));
      count.textContent=`${filtered.length} PRESENTER${filtered.length===1?'':'S'}`;
      if(!filtered.length){speakerGrid.innerHTML='<div class="empty-state"><h3>No matches just yet.</h3><p>Try another name, year, or topic.</p></div>';return;}
      speakerGrid.innerHTML=filtered.map(s=>{
        const key=normalizePerson(s.name);
        const portrait=portraitAssets[key] || (key==='jessicameure'?portraitAssets.jessicaeure:null);
        const letters=initials(s.name);
        const imageMarkup=portrait
          ? `<img class="speaker-profile-photo" src="${esc(portrait.src)}" alt="${esc(portrait.alt||s.name)}" width="50" height="50" loading="lazy" decoding="async" data-speaker-name="${esc(s.name)}" data-speaker-initials="${esc(letters)}">`
          : `<div class="speaker-profile-placeholder" role="img" aria-label="Portrait placeholder for ${esc(s.name)}"><span class="speaker-placeholder-initials" aria-hidden="true">${esc(letters)}</span><span class="speaker-placeholder-label">Portrait pending</span></div>`;
        return `<article class="speaker-card"><div class="speaker-card-top"><span class="speaker-year">${esc((s.years||[]).join(' · '))}</span></div><div class="speaker-profile-heading"><div class="speaker-profile-media">${imageMarkup}</div><div class="speaker-profile-identity"><h3>${esc(s.name)}</h3><div class="speaker-org">${esc(s.org||'Summit presenter')}</div></div></div><p class="speaker-talk">${esc(s.talk||'Presentation details to be added.')}</p><div class="tag-row">${(s.focus||[]).slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="speaker-card-bottom"><span>Summit years: ${(s.years||[]).join(', ')}</span><span aria-hidden="true">✳</span></div></article>`;
      }).join('');
      // If a public image is removed or unavailable, replace it with a named initials placeholder.
      $$('.speaker-profile-photo',speakerGrid).forEach(img=>img.addEventListener('error',()=>{
        const name=img.dataset.speakerName||'Summit presenter';
        const letters=img.dataset.speakerInitials||initials(name);
        const placeholder=document.createElement('div');
        placeholder.className='speaker-profile-placeholder';
        placeholder.setAttribute('role','img');
        placeholder.setAttribute('aria-label',`Portrait placeholder for ${name}`);
        placeholder.innerHTML=`<span class="speaker-placeholder-initials" aria-hidden="true">${esc(letters)}</span><span class="speaker-placeholder-label">Portrait pending</span>`;
        img.replaceWith(placeholder);
      },{once:true}));
    };
    [search,yearSelect,topicSelect].forEach(el=>el.addEventListener(el===search?'input':'change',render));
    render();
  }

  // Video vault: current listing links, prices, and durations.
  const vaultGrid=$('#vault-grid');
  if(vaultGrid){
    const packages=[
      {year:2023,title:'Suisun Summit 2023',description:'The collection includes the full Summit package, selected day packages, and individual presentations. Check the catalog for the current selection and price.',price:'From $50',stats:['Full package listed at $350','Day packages listed'],image:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2023.png',url:'https://courses.eegstrategies.com/collections/suisun-summit-2023',cta:'Browse 2023 catalog'},
      {year:2024,title:'Suisun Summit 2024',description:'Recorded sessions from the 2024 Summit, spanning ERPs, biomarkers, neurofeedback, clinical case discussions, and panels.',price:'$350',stats:['17 lessons','20 hours of video'],image:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2024.png',url:'https://courses.eegstrategies.com/courses/suisun-summit-2024',cta:'Buy on Thinkific'},
      {year:2025,title:'Suisun Summit 2025',description:'Recorded talks covering neurofeedback, brain health, epilepsy, concussion recovery, and clinical applications across a multi-day program.',price:'$350',stats:['17 lessons','18.5 hours of video'],image:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2025.png',url:'https://courses.eegstrategies.com/courses/Suisun-Summit-2025',cta:'Buy on Thinkific'}
    ];
    vaultGrid.innerHTML=packages.map(p=>`<article class="vault-card"><div class="vault-cover"><img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy"><div class="vault-cover-overlay"><span>SUISUN SUMMIT</span><span>${p.year}</span></div></div><div class="vault-card-body"><span class="edition-kicker">RECORDED PRESENTATIONS</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div class="vault-stats">${p.stats.map(s=>`<span>${esc(s)}</span>`).join('')}</div><div class="vault-actions"><span class="price-label">${esc(p.price)} <small>· listed pricing</small></span><a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.cta)} <span aria-hidden="true">↗</span></a></div></div></article>`).join('');
  }

  // Gallery assets sourced from public Suisun Summit / EEG Strategies pages.
  // For a speaker without a verified public portrait, render a named placeholder instead of reusing another person's photo.
  const galleryArtwork={
    2023:{src:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2023.png',alt:'Official Suisun Summit 2023 recording-cover artwork',category:'Edition artwork',title:'Suisun Summit 2023'},
    2024:{src:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2024.png',alt:'Official Suisun Summit 2024 recording-cover artwork',category:'Edition artwork',title:'Suisun Summit 2024'},
    2025:{src:'https://eegstrategies.com/wp-content/uploads/2025/12/suisun-2025.png',alt:'Official Suisun Summit 2025 recording-cover artwork',category:'Edition artwork',title:'Gunkelman’s Eyeland'},
    2026:{src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/Jay-Gunkelman-as-The-Godfather-qEEG-521x1024.jpg',alt:'Official 2026 Summit tribute artwork honoring Jay Gunkelman',category:'Summit tribute',title:'Honoring Jay Gunkelman'}
  };
  const eventPhotosByYear={
    2026:[
      {src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/03/Peppino-Dagostino-press-1-1024x683.webp',alt:'Guitarist Peppino D’Agostino, featured in the Summit special event',category:'Special event',title:'Live music & Pizza Night'},
      {src:'https://suisun.eegstrategies.com/wp-content/uploads/2026/08/Neuronic_tPBM-1024x683.jpg',alt:'Photobiomodulation demonstration equipment featured by Summit partner Neuronic',category:'Technology showcase',title:'Hands-on tPBM demonstration'}
    ]
  };

  const renderGallery=(year)=>{
    const item=data.years[year]||{};
    const speakerNames=Array.isArray(item.speakers)?item.speakers:[];
    const people=speakerNames.map(name=>{
      const key=normalizePerson(name);
      const portrait=portraitAssets[key] || (key==='jessicameure'?portraitAssets.jessicaeure:null);
      return portrait
        ? {src:portrait.src,alt:portrait.alt,category:'Presenter portrait',title:name}
        : {placeholder:true,category:'Portrait to add',title:name,alt:`No verified portrait was found for ${name} on the public Summit pages.`};
    });
    const content=[];
    if(galleryArtwork[year]) content.push(galleryArtwork[year]);
    content.push(...people);
    content.push(...(eventPhotosByYear[year]||[]));
    const heading=`${year} moments & gallery`;
    const headingMarkup=`<div class="content-section-title gallery-section-title"><div><p class="eyebrow"><span class="eyebrow-line"></span> MOMENTS & MEMORIES</p><h2 id="year-gallery-title">${esc(heading)}</h2></div><span>${content.length?`${content.length} GALLERY ITEMS`:'PHOTO ARCHIVE'}</span></div>`;
    if(!content.length){
      return `<section class="year-gallery" aria-labelledby="year-gallery-title">${headingMarkup}<p class="gallery-intro">No verified speaker portraits or edition artwork have been found for ${year} in the current public source set. These labeled placeholders can be replaced with client-approved photographs.</p><div class="gallery-empty-grid"><div class="gallery-empty-card"><span class="gallery-empty-icon" aria-hidden="true">▧</span><strong>Sessions & speakers</strong><small>Photo slot · ${year}</small></div><div class="gallery-empty-card"><span class="gallery-empty-icon" aria-hidden="true">◎</span><strong>People & community</strong><small>Photo slot · ${year}</small></div><div class="gallery-empty-card"><span class="gallery-empty-icon" aria-hidden="true">⌂</span><strong>Venue & special moments</strong><small>Photo slot · ${year}</small></div></div></section>`;
    }
    const html=content.map(photo=>{
      if(photo.placeholder){
        const letters=photo.title.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
        return `<div class="gallery-card gallery-card-placeholder" role="group" aria-label="Portrait placeholder for ${esc(photo.title)}"><div class="gallery-placeholder-portrait"><span class="gallery-placeholder-initials" aria-hidden="true">${esc(letters)}</span><span class="gallery-placeholder-label">Portrait pending</span></div><div class="gallery-caption"><span>${esc(photo.category)}</span><strong>${esc(photo.title)}</strong></div></div>`;
      }
      return `<a class="gallery-card" href="${esc(photo.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: ${esc(photo.title)}"><div class="gallery-image"><img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy" decoding="async"><span class="gallery-open" aria-hidden="true">↗</span></div><div class="gallery-caption"><span>${esc(photo.category)}</span><strong>${esc(photo.title)}</strong></div></a>`;
    }).join('');
    const missing=people.filter(person=>person.placeholder).length;
    const intro=`Portraits publicly listed on the official Summit / EEG Strategies pages are included for presenters where available. ${missing?`${missing} presenter portrait${missing===1?' is':'s are'} still missing and shown as labeled placeholders.`:'Presenter portraits were found for the speakers listed here.'} Portraits are representative headshots and are not necessarily photos taken during the edition shown.`;
    return `<section class="year-gallery" aria-labelledby="year-gallery-title">${headingMarkup}<p class="gallery-intro">${esc(intro)}</p><div class="gallery-grid">${html}</div><p class="gallery-footnote">Image links open the public source image. Placeholder cards can be replaced with approved Summit photography as it becomes available.</p></section>`;
  };

  // Year detail page. The URL controls the edition, e.g. summit.html?year=2025.
  const summitRoot=$('#summit-detail');
  if(summitRoot){
    const params=new URLSearchParams(window.location.search);
    const year=Number(params.get('year')||2026);
    const item=data.years[year];
    if(!item){summitRoot.innerHTML='<div class="archive-placeholder"><h2>That year is not in the timeline yet.</h2><p>Return to the home timeline to choose a year, or check back as the archive expands.</p><a class="button button-dark" href="index.html#timeline">Back to the timeline <span aria-hidden="true">↗</span></a></div>';}
    else{
      document.title=`${item.year} — ${item.title} | Suisun Summit Compendium`;
      const prev=yearEntries.filter(y=>y.year<year).slice(-1)[0],next=yearEntries.find(y=>y.year>year);
      const previousLink=prev?`<a href="summit.html?year=${prev.year}"><span>←</span><span><small>PREVIOUS CHAPTER</small>${prev.year} · ${esc(prev.title)}</span></a>`:'<span></span>';
      const nextLink=next?`<a href="summit.html?year=${next.year}"><span><small>NEXT CHAPTER</small>${next.year} · ${esc(next.title)}</span><span>→</span></a>`:'<a href="index.html#timeline"><span><small>BACK TO OVERVIEW</small>Explore the timeline</span><span>→</span></a>';
      const pending=item.status==='pending';
      const recordingAction=item.recordingUrl ? `<a class="button button-dark" href="${esc(item.recordingUrl)}" target="_blank" rel="noopener">${esc(item.recordingLabel)} <span aria-hidden="true">↗</span></a>`:'';
      const agendaMarkup=item.agenda&&item.agenda.length ? `<div class="agenda-list">${item.agenda.map((day,i)=>`<details class="agenda-day" ${i===0?'open':''}><summary>${esc(day.day)}</summary><ul>${day.talks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></details>`).join('')}</div>` : `<div class="archive-placeholder"><h2>${pending?'Historical details are being curated.':'A fuller program is still being assembled.'}</h2><p>${esc(pending?'This placeholder keeps the timeline navigable while original programs, dates, photos, and speakers are confirmed.':'The official recording catalog is available now. Agenda, photographs, and presentation details can be added to this archive as source material is gathered.')}</p>${item.recordingUrl?recordingAction:''}</div>`;
      summitRoot.innerHTML=`<div class="summit-banner"><div><p class="eyebrow"><span class="eyebrow-line"></span> ${esc(item.label)} · ${esc(String(item.year))}</p><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p></div><div class="summit-banner-aside"><span>SUMMIT EDITION</span><strong>${esc(String(item.year))}</strong>${recordingAction}</div></div><div class="summit-details-grid"><div class="detail-tile"><span>DATE</span><strong>${esc(item.date)}</strong></div><div class="detail-tile"><span>LOCATION</span><strong>${esc(item.location)}</strong></div><div class="detail-tile"><span>THEME / HONOREE</span><strong>${esc(item.theme)}${item.honoree&&item.honoree!=='To be confirmed'&&item.honoree!=='Historical details to confirm'?`<br><small style="font: 11px var(--sans);color:#788880">${esc(item.honoree)}</small>`:''}</strong></div></div><div class="content-columns"><section><div class="content-section-title"><h2>Sessions & agenda</h2><span>${item.agenda&&item.agenda.length?`${item.agenda.length} PROGRAM BLOCKS`:'PROGRAM ARCHIVE'}</span></div>${agendaMarkup}</section><aside><div class="highlight-panel"><p class="eyebrow"><span class="eyebrow-line"></span> WHAT TO REMEMBER</p><h3>Edition highlights</h3><ul class="highlight-list">${item.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul></div><div class="content-section-title" style="margin-top:35px"><h2 style="font-size:30px">Presenters</h2><span>${(item.speakers||[]).length} LISTED</span></div>${item.speakers&&item.speakers.length?`<div class="speaker-chip-list">${item.speakers.map(n=>`<span class="speaker-chip">${esc(n)}</span>`).join('')}</div>`:'<p style="font-size:12px;color:#718078">Presenter list to be confirmed.</p>'}<div style="margin-top:26px"><a class="text-link" href="speakers.html">Explore speaker directory <span aria-hidden="true">↗</span></a></div></aside></div>${renderGallery(year)}<div class="next-previous">${previousLink}${nextLink}</div>`;
      // If a public photo URL no longer resolves, replace it with a named placeholder.
      $$('.year-gallery .gallery-image img', summitRoot).forEach(img=>img.addEventListener('error',()=>{
        const card=img.closest('.gallery-card');
        if(!card || card.classList.contains('gallery-card-placeholder')) return;
        const title=$('.gallery-caption strong',card)?.textContent || 'Summit image';
        const category=$('.gallery-caption span',card)?.textContent || 'Photo to add';
        const letters=title.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
        card.removeAttribute('href'); card.removeAttribute('target'); card.removeAttribute('rel');
        card.className='gallery-card gallery-card-placeholder';
        card.setAttribute('role','group'); card.setAttribute('aria-label',`Image placeholder for ${title}`);
        card.innerHTML=`<div class="gallery-placeholder-portrait"><span class="gallery-placeholder-initials" aria-hidden="true">${esc(letters)}</span><span class="gallery-placeholder-label">Image unavailable</span></div><div class="gallery-caption"><span>${esc(category)}</span><strong>${esc(title)}</strong></div>`;
      },{once:true}));
    }
  }
})();