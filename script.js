document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    });

    // GSAP Zoom Animations
    gsap.utils.toArray('[data-gsap="zoom"]').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.05, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.3 }));
    });

    // ScrollMagic Controller
    const controller = new ScrollMagic.Controller();
    document.querySelectorAll('[data-scroll]').forEach(el => {
        const type = el.dataset.scroll;
        new ScrollMagic.Scene({
            triggerElement: el,
            triggerHook: 0.8,
            duration: '50%'
        })
        .setClassToggle(el, 'scroll-active')
        .addTo(controller);
    });

    // Anime.js Typography
    anime({
        targets: '.anime-text',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeOutQuad'
    });

    // D3.js Donut Charts
    document.querySelectorAll('.d3-chart').forEach(svg => {
        const percentage = svg.dataset.values;
        const width = 150, height = 150, radius = 75;
        const data = [percentage, 100 - percentage];
        const color = d3.scaleOrdinal(['#3498db', '#f0f0f0']);
        const arc = d3.arc().innerRadius(55).outerRadius(radius);
        const pie = d3.pie();
        const g = d3.select(svg).attr('width', width).attr('height', height)
            .append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
        g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .transition()
            .duration(1000)
            .attrTween('d', d => {
                const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return t => arc(i(t));
            });
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(`${percentage}%`);
    });

    // Matter.js Simulator
    const simulatorCanvas = document.querySelector('.simulator-canvas');
    const engine = Matter.Engine.create();
    const world = engine.world;
    const render = Matter.Render.create({
        element: simulatorCanvas,
        engine: engine,
        options: { width: 600, height: 300, wireframes: false }
    });
    const balls = [
        Matter.Bodies.circle(100, 100, 20, { restitution: 0.8, render: { fillStyle: '#3498db' } }),
        Matter.Bodies.circle(200, 150, 20, { restitution: 0.8, render: { fillStyle: '#e74c3c' } })
    ];
    Matter.World.add(world, balls);
    Matter.World.add(world, [
        Matter.Bodies.rectangle(300, 300, 600, 20, { isStatic: true }),
        Matter.Bodies.rectangle(300, 0, 600, 20, { isStatic: true }),
        Matter.Bodies.rectangle(0, 150, 20, 300, { isStatic: true }),
        Matter.Bodies.rectangle(600, 150, 20, 300, { isStatic: true })
    ]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);
    document.querySelectorAll('.sim-control').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'reset') Matter.Body.setPosition(balls[0], { x: 100, y: 100 });
            if (btn.dataset.action === 'speed') Matter.Body.setVelocity(balls[0], { x: 5, y: -5 });
        });
    });

    // D3.js Interactive Map (Simplified)
    const mapSvg = d3.select('#map-vis');
    mapSvg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#f0f0f0');
    mapSvg.selectAll('circle')
        .data([{ x: 100, y: 100, r: 20 }, { x: 200, y: 150, r: 15 }])
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.r)
        .attr('fill', '#3498db')
        .on('mouseover', function() { d3.select(this).attr('fill', '#e74c3c'); })
        .on('mouseout', function() { d3.select(this).attr('fill', '#3498db'); });

    // Tab Switching
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Progress Bar (Debounced with Lodash)
    const updateProgressBar = _.debounce(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.progress-bar').style.width = `${scrollPercent}%`;
    }, 10);
    window.addEventListener('scroll', updateProgressBar);

    // Mobile Nav Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const tabsContainer = document.querySelector('.tabs');
    mobileNavToggle.addEventListener('click', () => tabsContainer.classList.toggle('open'));
});

function switchTab(tabId) {
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
    window.scrollTo({ top: document.querySelector('nav').offsetTop, behavior: 'smooth' });
}