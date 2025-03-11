document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabs = document.querySelectorAll('.tabs li');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Scroll Animations with GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Typography Animation with Anime.js
    anime({
        targets: '.typing-text',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1500,
        easing: 'easeOutExpo'
    });

    // Skills Donut Chart with D3.js
    const skillsData = [
        { title: 'Data Viz', percentage: 85 },
        { title: 'Financial Reporting', percentage: 90 },
        { title: 'HTML/CSS', percentage: 80 },
        { title: 'JavaScript', percentage: 75 },
        { title: 'Adobe Illustrator', percentage: 70 },
        { title: 'Data Analysis', percentage: 85 }
    ];
    const donutSvg = d3.select('#skills-donut')
        .selectAll('.donut-chart')
        .data(skillsData)
        .enter()
        .append('div')
        .attr('class', 'donut-chart-container')
        .append('svg')
        .attr('width', 120)
        .attr('height', 120)
        .append('g')
        .attr('transform', 'translate(60, 60)');

    donutSvg.each(function(d) {
        const arc = d3.arc().innerRadius(40).outerRadius(60);
        const pie = d3.pie()([d.percentage, 100 - d.percentage]);
        d3.select(this)
            .selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => i === 0 ? '#ff6b6b' : '#ddd')
            .attr('aria-label', `${d.data.title}: ${d.data.percentage}%`);
        d3.select(this)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(`${d.percentage}%`)
            .attr('aria-hidden', 'true');
        d3.select(this)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-1em')
            .text(d.title)
            .attr('aria-hidden', 'true');
    });

    // Crokinole Open 20 Chart
    const open20Data = [
        { player: 'Justin Slater', attempts: 594, percent: 75.6 },
        { player: 'Josh Carrafiello', attempts: 334, percent: 68.0 },
        { player: 'Connor Reinman', attempts: 703, percent: 66.0 },
        // Add remaining data...
    ];
    const open20Svg = d3.select('#open-20-chart')
        .append('svg')
        .attr('width', 600)
        .attr('height', 400);
    const xScale = d3.scaleBand().domain(open20Data.map(d => d.player)).range([50, 550]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, 100]).range([350, 50]);
    open20Svg.selectAll('.bar')
        .data(open20Data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.player))
        .attr('y', 350)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', '#ff6b6b')
        .attr('aria-label', d => `${d.player}: ${d.percent}%`)
        .transition()
        .duration(1000)
        .attr('y', d => yScale(d.percent))
        .attr('height', d => 350 - yScale(d.percent));

    // Invisible Epidemic Charts (Example for Family Time)
    const familyTimeSvg = d3.select('#family-time-chart')
        .append('svg')
        .attr('width', 600)
        .attr('height', 400);
    // Add similar D3 code for other charts...

    // Debounce Scroll for Performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                ticking = false;
            });
            ticking = true;
        }
    });
});