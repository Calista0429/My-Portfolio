export async function run(host, ctx) {
  if (ctx.signal.aborted) return;

  const night = ctx.theme === 'dark';
  const display = { x: .3505, y: .3943, width: .2954, height: .2837 };
  const centerX = display.x + display.width / 2;
  const centerY = display.y + display.height / 2;
  // Image URLs come from the mount options (bundled by Next.js) instead of import.meta.url.
  const roomAsset = new URL(ctx.assets[night ? 'night' : 'day'], location.href);
  const operatorAsset = new URL(ctx.assets.operator, location.href);
  host.innerHTML = `
    <style>
      .pt-root{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#e9e4d6;opacity:0}
      .pt-root[data-theme="dark"]{background:#192531}
      .pt-world{position:absolute;transform-origin:${centerX * 100}% ${centerY * 100}%;will-change:transform}
      .pt-scene{position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;pointer-events:none}
      .pt-screen{position:absolute;box-sizing:border-box;left:${display.x * 100}%;top:${display.y * 100}%;width:${display.width * 100}%;height:${display.height * 100}%;overflow:hidden;background:#fff;color:#24313a;padding:calc(var(--pt-font)*2.2) calc(var(--pt-font)*1.6);font:400 var(--pt-font)/1.45 ui-monospace,"SFMono-Regular",Consolas,monospace;letter-spacing:-.045em}
      .pt-root[data-theme="dark"] .pt-screen{background:#000;color:#ecece5}
      .pt-command{display:flex;align-items:center;white-space:nowrap}
      .pt-prompt{margin-right:.58em;color:#54766a}
      .pt-caret{width:.42em;height:1.03em;margin-left:.2em;background:#24313a;flex:none}
      .pt-ready{margin-top:.78em;font-size:.57em;line-height:1.5;letter-spacing:.015em;color:#38614b;opacity:0}
      .pt-root[data-theme="dark"] .pt-prompt{color:#abc7af}
      .pt-root[data-theme="dark"] .pt-caret{background:#d2bc82}
      .pt-root[data-theme="dark"] .pt-ready{color:#a6c9ac}
      .pt-ready::before{content:'✓';margin-right:.65em}
      .pt-operator{position:absolute;left:26.5%;top:52%;width:32%;aspect-ratio:1;background-image:url("${operatorAsset.href}");background-size:300% 100%;background-repeat:no-repeat;background-position:0 0;image-rendering:pixelated;pointer-events:none}
      .pt-operator[data-frame="1"]{background-position:50% 0}
      .pt-operator[data-frame="2"]{background-position:100% 0}
      .pt-root[data-theme="dark"] .pt-operator{filter:brightness(.87) saturate(.9)}
    </style>
    <div class="pt-root" data-theme="${night ? 'dark' : 'light'}">
      <div class="pt-world">
        <img class="pt-scene" alt="" decoding="async" src="${roomAsset.href}">
        <div class="pt-screen">
          <div class="pt-command"><span class="pt-prompt">&gt;</span><span class="pt-text"></span><span class="pt-caret"></span></div>
          <div class="pt-ready">ready</div>
        </div>
        <div class="pt-operator" data-frame="0"></div>
      </div>
    </div>`;

  const get = (selector) => host.querySelector(selector);
  const root = get('.pt-root');
  const world = get('.pt-world');
  const scene = get('.pt-scene');
  const operator = get('.pt-operator');
  const command = get('.pt-text');
  const sprite = new Image();
  sprite.src = operatorAsset.href;
  let finalScale = 3.2;

  const layout = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const imageWidth = scene.naturalWidth || 1672;
    const imageHeight = scene.naturalHeight || 941;
    // Cover the host on every side while placing the physical display at its center.
    const scale = Math.max(
      width / (imageWidth * 2 * Math.min(centerX, 1 - centerX)),
      height / (imageHeight * 2 * Math.min(centerY, 1 - centerY)),
    );
    const worldWidth = imageWidth * scale;
    const worldHeight = imageHeight * scale;
    Object.assign(world.style, {
      width: `${worldWidth}px`,
      height: `${worldHeight}px`,
      left: `${width / 2 - worldWidth * centerX}px`,
      top: `${height / 2 - worldHeight * centerY}px`,
    });
    world.style.setProperty('--pt-font', `${worldWidth * .018}px`);
    finalScale = Math.max(width / (worldWidth * display.width), height / (worldHeight * display.height)) * 1.025;
  };
  const observer = new ResizeObserver(layout);
  const cleanup = () => observer.disconnect();
  ctx.signal.addEventListener('abort', cleanup, { once: true });
  observer.observe(host);
  layout();

  try {
    const decode = (image) => typeof image.decode === 'function'
      ? image.decode().then(() => true, () => false)
      : Promise.resolve(image.complete && image.naturalWidth > 0);
    await Promise.race([
      Promise.all([decode(scene), decode(sprite)]),
      ctx.wait(2800),
    ]);
    if (ctx.signal.aborted) return;
    layout();

    // 4.75 seconds after decoding; every pause and camera move is abortable.
    await ctx.animate(root, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: 'ease-out' });
    await ctx.wait(300);

    await Promise.all([
      ctx.animate(world, [{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }], {
        duration: 1790,
        easing: 'cubic-bezier(.22,.65,.35,1)',
      }),
      (async () => {
        for (const [index, character] of [...'npm run hello'].entries()) {
          if (ctx.signal.aborted) return;
          operator.dataset.frame = String(index % 2 + 1);
          await ctx.wait(55);
          command.textContent += character;
          operator.dataset.frame = '0';
          await ctx.wait(55);
        }
        await ctx.wait(180);
        // The last hand pose presses Enter before the terminal reports ready.
        operator.dataset.frame = '2';
        await ctx.wait(180);
        operator.dataset.frame = '0';
      })(),
    ]);

    await Promise.all([
      ctx.animate(get('.pt-ready'), [{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' }),
      ctx.animate(get('.pt-caret'), [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'steps(1,end)' }),
    ]);
    await ctx.wait(700);

    await Promise.all([
      ctx.animate(world, [{ transform: 'scale(1.1)' }, { transform: `scale(${finalScale})` }], {
        duration: 1350,
        easing: 'cubic-bezier(.65,.02,.3,1)',
      }),
      ctx.animate(root, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 280,
        delay: 1070,
        easing: 'ease-in-out',
      }),
    ]);
  } finally {
    cleanup();
    ctx.signal.removeEventListener('abort', cleanup);
  }

  if (!ctx.signal.aborted) ctx.finish();
}
