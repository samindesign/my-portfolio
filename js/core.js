history.scrollRestoration='manual';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(window.Lenis){window.lenis=new Lenis({lerp:.09});(function r(t){lenis.raf(t);requestAnimationFrame(r)})(0)}
