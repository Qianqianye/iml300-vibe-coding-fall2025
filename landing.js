(() => {
  const { Engine, Runner, Bodies, Body, Composite } = Matter;

  const W = window.innerWidth;
  const H = window.innerHeight;

  // Placeholder image URLs — swap these for real student project screenshots
  const imageUrls = [
    'assets/vibecode1.png',
    'assets/vibecode2.png',
    'assets/vibecode3.png',
    'https://placehold.co/100x100/2c6b4a/fff?text=04',
    'https://placehold.co/100x100/6b5c2c/fff?text=05',
    'https://placehold.co/100x100/2c5a6b/fff?text=06',
    'https://placehold.co/100x100/6b2c5a/fff?text=07',
    'https://placehold.co/100x100/4a6b2c/fff?text=08',
    'https://placehold.co/100x100/1a3a5c/fff?text=09',
    'https://placehold.co/100x100/5c1a3a/fff?text=10',
    'https://placehold.co/100x100/3a5c1a/fff?text=11',
    'https://placehold.co/100x100/5c3a1a/fff?text=12',
  ];

  // Engine setup
  const engine = Engine.create({ gravity: { y: 0.65 } });
  const world = engine.world;

  // Invisible boundary walls
  const wallOpts = { isStatic: true, render: { visible: false } };
  const ground = Bodies.rectangle(W / 2, H + 30, W * 2, 60, wallOpts);
  const wallL  = Bodies.rectangle(-30, H / 2, 60, H * 2, wallOpts);
  const wallR  = Bodies.rectangle(W + 30, H / 2, 60, H * 2, wallOpts);
  Composite.add(world, [ground, wallL, wallR]);

  // Track DOM images paired with physics bodies
  const items = [];

  function spawnItem() {
    const size = 160 + Math.random() * 120;
    const x = 80 + Math.random() * (W - 160);
    const url = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    const body = Bodies.rectangle(x, -size, size, size, {
      restitution: 0.28,
      friction: 0.55,
      frictionAir: 0.011,
      angle: (Math.random() - 0.5) * 1.4,
    });

    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 3.5,
      y: 1.5 + Math.random() * 2.5,
    });

    Composite.add(world, body);

    const img = document.createElement('img');
    img.src = url;
    img.alt = '';
    img.className = 'landing-falling-img';
    img.style.width  = size + 'px';
    img.style.height = size + 'px';
    document.body.appendChild(img);

    items.push({ body, el: img, size });
  }

  // Sync DOM elements with physics positions each frame
  function syncItems() {
    for (const { body, el, size } of items) {
      const { x, y } = body.position;
      el.style.left      = (x - size / 2) + 'px';
      el.style.top       = (y - size / 2) + 'px';
      el.style.transform = `rotate(${body.angle}rad)`;
    }
  }

  // Animation loop
  function loop() {
    Engine.update(engine, 1000 / 60);
    syncItems();
    requestAnimationFrame(loop);
  }
  loop();

  // Stagger item spawning
  let spawnCount = 0;
  const maxItems = 20;

  function scheduleSpawn() {
    if (spawnCount < maxItems) {
      spawnItem();
      spawnCount++;
      setTimeout(scheduleSpawn, 250 + Math.random() * 380);
    }
  }
  scheduleSpawn();

  // Update walls on resize
  window.addEventListener('resize', () => {
    const nW = window.innerWidth;
    const nH = window.innerHeight;
    Body.setPosition(ground, { x: nW / 2,  y: nH + 30 });
    Body.setPosition(wallR,  { x: nW + 30, y: nH / 2  });
  });
})();