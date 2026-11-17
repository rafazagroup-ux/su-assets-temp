(function(d, css){
var cnt=0;
function uid(){cnt++;return 'pf'+('000000'+cnt.toString(16)).slice(-6);}
function J(o){var s=JSON.stringify(o); if(/--|[<>&]/.test(s)) throw new Error('bad json '+s); return s;}
function A(a){var s='';for(var k in (a||{}))s+=' '+k+'="'+a[k]+'"';return s;}
function el(tag,cls,inner,attrs,name){var u=uid(),o={uniqueId:u,tagName:tag};if(cls)o.globalClasses=cls;if(attrs)o.htmlAttributes=attrs;if(name)o.metadata={name:name};
 return '<!-- wp:generateblocks/element '+J(o)+' -->\n<'+tag+' class="'+(cls||[]).concat(['gb-element-'+u]).join(' ')+'"'+A(attrs)+'>'+inner+'</'+tag+'>\n<!-- /wp:generateblocks/element -->';}
function tx(tag,cls,html,attrs){var u=uid(),o={uniqueId:u,tagName:tag};if(cls)o.globalClasses=cls;if(attrs)o.htmlAttributes=attrs;
 return '<!-- wp:generateblocks/text '+J(o)+' -->\n<'+tag+' class="'+['gb-text'].concat(cls||[]).concat(['gb-text-'+u]).join(' ')+'"'+A(attrs)+'>'+html+'</'+tag+'>\n<!-- /wp:generateblocks/text -->';}
function img(id,url,alt,cls,cap){var o={id:id,sizeSlug:'full',linkDestination:'none'};if(cls&&cls.length)o.className=cls.join(' ');
 return '<!-- wp:image '+J(o)+' -->\n<figure class="wp-block-image size-full'+(cls&&cls.length?' '+cls.join(' '):'')+'"><img src="'+url+'" alt="'+alt+'" class="wp-image-'+id+'"/>'+(cap?'<figcaption class="wp-element-caption">'+cap+'</figcaption>':'')+'</figure>\n<!-- /wp:image -->';}
function clean(h){return h.replace(/&nbsp;/g,' ').replace(/<a [^>]*><\/a>/g,'').replace(/<strong>\s*<\/strong>/g,'').replace(/<strong>\.\s*<\/strong>/g,'.').replace(/<br\s*\/?>/g,'').replace(/\s+;/g,';').replace(/\s+,/g,',').replace(/\s{2,}/g,' ').trim();}
var N='\n';
var WA={href:'https://wa.me/6285755711079?text=Halo%20Mas%20Sandi%2C%20saya%20ingin%20ngobrol%20soal%20bisnis%20saya.',target:'_blank',rel:'noopener'};
var U='https://sandiiswahyudi.com/wp-content/uploads/';
var pubs=d.pubs.map(clean).filter(Boolean), talks=d.talks.map(clean).filter(Boolean);
var seen={}, partners=[]; d.partners.map(clean).forEach(function(p){var k=p.replace(/<[^>]+>/g,'').trim().toLowerCase(); if(k&&!seen[k]){seen[k]=1;partners.push(p);}});
var books=d.books.map(clean);
var wins=d.wins.map(clean);
// hero
var hero=el('section',['ab-hero','dk'],el('div',['wrap','ab-hero-in'],
  el('div',['ab-hero-copy'],tx('p',['lbl','fi'],'Portofolio')+N+tx('h1',['ab-h1','fi'],'Blogger &amp; Digital Marketing',{id:'pf-h1'})+N+
   tx('p',['ab-lead','mute','fi'],clean(d.intro).replace(/<\/?strong>/g,'')+'.')+N+
   el('div',['ab-ctas','fi'],tx('a',['pill','pill-w'],'Ngobrol via WhatsApp',WA)+N+tx('a',['pill','pill-o','arw'],'Tentang saya',{href:'https://sandiiswahyudi.com/tentang-sandi-iswahyudi/'}),null,'Tombol'),null,'Teks hero')+N+
  el('div',['pf-stats','fi'],
   el('div',['pf-stat'],tx('p',['pf-num'],String(pubs.length))+N+tx('p',['mute'],'tulisan terbit di media cetak dan online'))+N+
   el('div',['pf-stat'],tx('p',['pf-num'],String(talks.length))+N+tx('p',['mute'],'forum sebagai pembicara atau pemateri'))+N+
   el('div',['pf-stat'],tx('p',['pf-num'],String(partners.length))+N+tx('p',['mute'],'brand, UMKM, dan instansi yang pernah bekerja sama')),null,'Angka'),null,'Wrap')+N+
 el('div',['wrap','ab-facts'],'',null,'Jarak'),{'aria-labelledby':'pf-h1',id:'atas'},'Hero');
// hasil
var hasil=el('section',['ab-sec','lt'],el('div',['wrap'],tx('p',['lbl'],'Hasil')+N+tx('h2',['h2','rv'],'Alhamdulillah telah membantu')+N+
  el('ul',['pf-wins'],wins.map(function(w){return tx('li',['stg'],w);}).join(N),null,'Daftar hasil'),null,'Wrap'),{id:'hasil'},'Hasil');
// publikasi
var shown=pubs.slice(0,6), rest=pubs.slice(6);
var det='<!-- wp:details -->\n<details class="wp-block-details pf-more"><summary>Lihat seluruh arsip publikasi ('+rest.length+' lainnya)</summary>'+rest.map(function(p){return '<!-- wp:paragraph -->\n<p>'+p+'</p>\n<!-- /wp:paragraph -->';}).join(N)+'</details>\n<!-- /wp:details -->';
det=det.replace('<!-- wp:details -->','<!-- wp:details {"className":"pf-more"} -->').replace('class="wp-block-details pf-more"','class="wp-block-details pf-more"');
var pub=el('section',['ab-sec','lt','ab-line'],el('div',['wrap'],
  el('div',['pf-pubhead'],el('div',[],tx('p',['lbl'],'Publikasi')+N+tx('h2',['h2','rv'],'Tulisan terbit di media online &amp; cetak lokal-nasional'),null,'Judul')+N+
    tx('p',['mute'],'Dimuat di Kompas, Republika, Koran Sindo, Jawa Pos Radar Malang, Harian Surya, Viva.co.id, hingga My-best.id.'),null,'Kepala')+N+
  img(23341,U+'2026/11/Kliping-tulisan-Sandi-Iswahyudi-di-koran.webp','Kliping koran berisi tulisan Sandi Iswahyudi, di antaranya rubrik Eksotika Radar Malang dan halaman Kompas Kampus',['pf-clip','photo-reveal'],'Arsip asli kliping tulisan saya di koran.')+N+
  el('div',['pf-pubs'],shown.map(function(p){return tx('p',null,p);}).join(N),null,'Tulisan pilihan')+N+det,null,'Wrap'),{id:'publikasi'},'Publikasi');
// buku
var covers=[[23343,'2026/11/Buku-Lautan-Hikmah.webp','Sampul buku Lautan Hikmah karya Sandi Iswahyudi'],[23342,'2026/11/Buku-Langit-Hikmah.webp','Sampul buku Langit Hikmah, kumpulan hikmah SSG 35 Daarut Tauhiid'],[23344,'2026/11/Buku-Aku-Bahagia.webp','Sampul buku Aku Bahagia, 22 sudut pandang kebahagiaan dari adik-adik panti se-Malang Raya']];
var bk=el('section',['ab-sec','dk'],el('div',['wrap'],tx('p',['lbl'],'Buku')+N+tx('h2',['h2','rv'],'Buku yang saya tulis dan prakarsai')+N+
  el('ol',['pf-books'],covers.map(function(c,i){return el('li',['stg'],img(c[0],U+c[1],c[2],[])+N+tx('p',null,books[i]||''));}).join(N),null,'Daftar buku')+N+
  (books[3]?tx('p',['mute','pf-note'],books[3].charAt(0).toUpperCase()+books[3].slice(1)+'.'):''),null,'Wrap'),{id:'buku'},'Buku');
// pembicara
var gimgs=d.imgs.filter(function(i){return /^Menjadi/.test(i.sec);});
var talk=el('section',['ab-sec','lt'],el('div',['wrap'],tx('p',['lbl'],'Pembicara')+N+tx('h2',['h2','rv'],'Menjadi pembicara dan pemateri')+N+
  el('div',['pf-gal'],gimgs.map(function(g){var cap=g.cap.replace(/<[^>]+>/g,'').trim();return img(g.id,g.src,cap||'Sandi Iswahyudi menjadi pembicara',['photo-reveal'],cap);}).join(N),null,'Galeri')+N+
  el('ul',['pf-chips'],talks.map(function(t){return tx('li',null,t);}).join(N),null,'Daftar forum'),null,'Wrap'),{id:'pembicara'},'Pembicara');
// kerja sama
var kerja=el('section',['ab-sec','dk'],el('div',['wrap'],tx('p',['lbl'],'Kolaborasi')+N+tx('h2',['h2','rv'],'Kerja sama dengan UMKM dan instansi')+N+
  el('ul',['pf-chips'],partners.map(function(t){return tx('li',null,t);}).join(N),null,'Daftar brand'),null,'Wrap'),{id:'kerja-sama'},'Kerja sama');
var cta=el('section',['ab-sec','lt','ab-cta'],el('div',['wrap','ab-center'],tx('p',['lbl'],'Mari bekerja sama')+N+tx('h2',['h2'],'Bisnismu berikutnya yang bertumbuh')+N+
  tx('p',['mute'],'Ceritakan bisnis atau kebutuhanmu. Kita diskusi lewat WhatsApp.')+N+
  el('div',['ab-ctas'],tx('a',['pill','pill-k'],'Ngobrol via WhatsApp',WA)+N+tx('a',['pill','pill-o','arw'],'Baca tulisan',{href:'https://sandiiswahyudi.com/baca/'}),null,'Tombol'),null,'Wrap'),{id:'kontak'},'Ajakan');
var body=el('div',['ab7'],[hero,hasil,pub,bk,talk,kerja,cta].join(N),null,'Halaman Portofolio V7');
var style='<!-- wp:html -->\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&amp;display=swap" rel="stylesheet"><style id="pf7-css">'+css+'</style>\n<!-- /wp:html -->';
return style+'\n\n'+body;
})
