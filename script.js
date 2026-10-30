const aparecer = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add("visible");
        obs.unobserve(target);
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section-header, .about-text, .interest-card, .project-card, .skills-group, .contact-content")
    .forEach((el) => {
        el.classList.add("aparecer");
        aparecer.observe(el);
    });

const enlaces = document.querySelectorAll('.nav-links a[href^="#"]');

function marcarActivo(id) {
    enlaces.forEach((a) => a.classList.toggle("active", a.hash === `#${id}`));
}

// Se observa también #inicio: al volver arriba no coincide con ningún link y se limpia el activo.
const navegacion = new IntersectionObserver((entradas) => {
    entradas.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) marcarActivo(target.id);
    });
}, { rootMargin: "-25% 0px -60% 0px" });

document.querySelectorAll("#inicio, #sobre-mi, #proyectos, #habilidades, #contacto")
    .forEach((seccion) => navegacion.observe(seccion));

// Contacto es la última sección y es corta: al llegar al final de la página puede no cruzar la franja observada.
window.addEventListener("scroll", () => {
    const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (alFinal) marcarActivo("contacto");
}, { passive: true });
