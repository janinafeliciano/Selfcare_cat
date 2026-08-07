(function(){
  "use strict";

  /* ---------------- catalog ----------------
     slot: which equip slot the item occupies. 'toy'/'deco' allow up to 3 owned items shown
     at once (see TOY_SLOTS/DECO_SLOTS); every other slot is single-equip (see renderShop).
     minLevel (optional): item stays visible but locked/unbuyable until the player reaches it. */
  const SHOP_ITEMS = [
    {id:'ribbon_blue',   name:'Blaue Schleife',  price:40, cat:'ribbon', slot:'ribbon', icon:'mochi_idle_ribbon_blue_icon'},
    {id:'ribbon_yellow', name:'Gelbe Schleife',  price:40, cat:'ribbon', slot:'ribbon', icon:'mochi_idle_ribbon_yellow_icon'},
    {id:'ribbon_white',  name:'Weiße Schleife',  price:40, cat:'ribbon', slot:'ribbon', icon:'mochi_idle_ribbon_white_icon'},
    {id:'ribbon_red',    name:'Rote Schleife',   price:40, cat:'ribbon', slot:'ribbon', icon:'mochi_idle_ribbon_red_icon'},

    {id:'toy_yarn',        name:'Wollknäuel',   price:20, cat:'toy', slot:'toy', icon:'toy_yarn'},
    {id:'toy_mouse',       name:'Spielmaus',    price:20, cat:'toy', slot:'toy', icon:'toy_mouse'},
    {id:'toy_blueball',    name:'Blauer Ball',  price:15, cat:'toy', slot:'toy', icon:'toy_blueball'},
    {id:'toy_mouse_plush', name:'Plüschmaus',   price:20, cat:'toy', slot:'toy', icon:'toy_mouse_plush'},
    {id:'toy_rubik1',      name:'Würfel-Spielzeug', price:18, cat:'toy', slot:'toy', icon:'toy_rubik1'},
    {id:'toy_ball_grey',   name:'Grauer Ball',  price:15, cat:'toy', slot:'toy', icon:'toy_ball_grey'},

    {id:'food_dry_green',  name:'Futternapf Grün',  price:15, cat:'decor', slot:'deco', icon:'food_dry_green'},
    {id:'food_dry_blue',   name:'Futternapf Blau',  price:15, cat:'decor', slot:'deco', icon:'food_dry_blue'},
    {id:'water_blue',   name:'Wassernapf Blau',   price:15, cat:'decor', slot:'deco', icon:'water_blue'},
    {id:'water_green',  name:'Wassernapf Grün',   price:15, cat:'decor', slot:'deco', icon:'water_green'},

    {id:'stool_white',  name:'Kratzhocker Weiß', price:45, cat:'decor', slot:'stool', icon:'scratching_post_twothickcircles_white', minLevel:2},
    {id:'stool_yellow', name:'Kratzhocker Gelb', price:45, cat:'decor', slot:'stool', icon:'scratching_post_twothickcircles_yellow', minLevel:2},

    {id:'plant_blue',  name:'Zimmerpflanze Blau',  price:30, cat:'decor', slot:'plant', icon:'plant_big_blue', minLevel:2},
    {id:'plant_pink',  name:'Zimmerpflanze Rosa',  price:30, cat:'decor', slot:'plant', icon:'plant_big_pink', minLevel:2},

    {id:'frame_cat_white', name:'Katzenbild Weiß', price:30, cat:'decor', slot:'frame', icon:'canva_right_cat_white', minLevel:2},
    {id:'frame_cat_blue',  name:'Katzenbild Blau', price:30, cat:'decor', slot:'frame', icon:'canva_right_cat_blue', minLevel:2},

    {id:'table_yellow', name:'Beistelltisch Gelb', price:35, cat:'decor', slot:'table', icon:'table_yellow', minLevel:3},
    {id:'table_blue',   name:'Beistelltisch Blau', price:35, cat:'decor', slot:'table', icon:'table_blue', minLevel:3},

    {id:'window_grey', name:'Fenster Grau', price:40, cat:'decor', slot:'window', icon:'window_big_left_grey', minLevel:3},
    {id:'window_blue', name:'Fenster Blau', price:40, cat:'decor', slot:'window', icon:'window_big_left_blue', minLevel:3},

    {id:'tower_white',  name:'Kratzturm Weiß',  price:80, cat:'decor', slot:'tower', icon:'scratching_post_foursquares_white', minLevel:4},
    {id:'tower_blue',   name:'Kratzturm Blau',  price:80, cat:'decor', slot:'tower', icon:'scratching_post_foursquares_blue', minLevel:4},

    {id:'bed_turkis', name:'Türkises Bett', price:50, cat:'bed', slot:'bed', icon:'bed_turkis', minLevel:3},
    {id:'bed_blue',   name:'Blaues Bett',   price:50, cat:'bed', slot:'bed', icon:'bed_blue', minLevel:3},
    {id:'bed_grey',   name:'Graues Bett',   price:50, cat:'bed', slot:'bed', icon:'bed_grey', minLevel:3},

    {id:'wall_room2',  name:'Wand: Blaugrau',   price:35, cat:'wall', slot:'wall', icon:'wall_room2'},
    {id:'wall_room3',  name:'Wand: Karamell',   price:35, cat:'wall', slot:'wall', icon:'wall_room3'},
    {id:'wall_room4',  name:'Wand: Flieder',    price:35, cat:'wall', slot:'wall', icon:'wall_room4'},
    {id:'wall_room5',  name:'Wand: Salbeigrün', price:35, cat:'wall', slot:'wall', icon:'wall_room5'},
    {id:'wall_room6',  name:'Wand: Petrol',     price:35, cat:'wall', slot:'wall', icon:'wall_room6'},
    {id:'wall_room7',  name:'Wand: Olivgrün',   price:35, cat:'wall', slot:'wall', icon:'wall_room7'},
    {id:'wall_room8',  name:'Wand: Grau',       price:35, cat:'wall', slot:'wall', icon:'wall_room8'},
    {id:'wall_room9',  name:'Wand: Aubergine',  price:35, cat:'wall', slot:'wall', icon:'wall_room9'},
    {id:'wall_room10', name:'Wand: Braun',      price:35, cat:'wall', slot:'wall', icon:'wall_room10'},
    {id:'wall_room11', name:'Wand: Hellgrau',   price:35, cat:'wall', slot:'wall', icon:'wall_room11'},
    {id:'wall_room12', name:'Wand: Himmelblau', price:35, cat:'wall', slot:'wall', icon:'wall_room12'},
    {id:'wall_room13', name:'Wand: Blauviolett',price:35, cat:'wall', slot:'wall', icon:'wall_room13'},
    {id:'wall_room14', name:'Wand: Mint',       price:35, cat:'wall', slot:'wall', icon:'wall_room14'},
    {id:'wall_room15', name:'Wand: Altrosa',    price:35, cat:'wall', slot:'wall', icon:'wall_room15'},
  ];

  const CHIPS = [
    {key:'all', label:'Alle'},
    {key:'ribbon', label:'Schleifen'},
    {key:'bed', label:'Betten'},
    {key:'toy', label:'Spielzeug'},
    {key:'decor', label:'Deko'},
    {key:'wall', label:'Wände'},
  ];

  // fixed room-card positions (percent of the room card, top-left anchored); tuned by eye
  // against the isometric room artwork so items don't overlap the walls/floor edges
  const TOY_SLOTS = [
    {left:'62%', top:'66%', width:'10%'},
    {left:'70%', top:'58%', width:'9%'},
    {left:'54%', top:'72%', width:'8%'},
  ];
  const DECO_SLOTS = [
    {left:'38%', top:'70%', width:'9%'},
    {left:'48%', top:'74%', width:'8%'},
    {left:'28%', top:'72%', width:'7%'},
  ];
  const BED_POS    = {left:'50%', top:'44%', width:'28%'};
  const TOWER_POS  = {left:'71%', top:'24%', width:'22%'};
  const STOOL_POS  = {left:'13%', top:'40%', width:'15%'};
  const PLANT_POS  = {left:'46%', top:'20%', width:'13%'};
  const TABLE_POS  = {left:'26%', top:'58%', width:'15%'};
  const WINDOW_POS = {left:'16%', top:'26%', width:'11%'};
  const FRAME_POS  = {left:'60%', top:'16%', width:'9%'};

  const TASK_REWARD = 10;
  const XP_PER_TASK = 10;
  const XP_PER_LEVEL = 50;
  const LEVEL_UP_BONUS = 20;

  /* ---------------- state ----------------
     single source of truth for the whole app; every render* function reads from this,
     every user action (toggleTask, buyItem, equipItem, ...) writes to it and then re-renders. */
  const state = {
    coins: 40,
    tasks: [
      {id:cryptoId(), text:'Für die Matheprüfung lernen', done:false},
      {id:cryptoId(), text:'20 Seiten lesen', done:false},
      {id:cryptoId(), text:'30 Min. programmieren üben', done:false},
      {id:cryptoId(), text:'8 Gläser Wasser trinken', done:false},
      {id:cryptoId(), text:'Um 23 Uhr schlafen gehen', done:false},
    ],
    history: {},          // 'YYYY-MM-DD' -> completedCount
    totalCompleted: 0,
    xp: 0,
    owned: [],             // item ids
    equipped: { ribbon:null, bed:null, wall:null, tower:null, stool:null, plant:null, table:null, window:null, frame:null },
    weekOffset: 0,
    shopFilter: 'all',
  };

  // generates a short unique id for tasks (not a real UUID, just good enough locally)
  function cryptoId(){ return 'id-' + Math.random().toString(36).slice(2,10); }
  // formats a Date as 'YYYY-MM-DD', used as the key for state.history
  function todayKey(d){
    d = d || new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function fmtMoney(n){ return n + ''; }
  // current level from total XP; level 1 starts at 0 XP, each level costs XP_PER_LEVEL
  function getLevel(){ return Math.floor(state.xp / XP_PER_LEVEL) + 1; }

  /* ---------------- toast ---------------- */
  let toastTimer;
  // shows a small auto-hiding notification bubble; restarts the hide-timer on repeated calls
  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove('show'), 1600);
  }

  /* ---------------- tabs ---------------- */
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click', ()=> switchView(tab.dataset.view));
  });
  // toggles which of the three main views (home/overview/shop) is visible and re-renders it
  function switchView(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.getElementById('view-'+name).classList.add('active');
    document.querySelector('.tab[data-view="'+name+'"]').classList.add('active');
    if(name==='overview') renderOverview();
    if(name==='shop') renderShop();
  }

  /* ---------------- drawer ---------------- */
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  document.getElementById('menuBtn').addEventListener('click', ()=>{
    updateShareCard(); // refresh the preview so it reflects the current level/streak before opening
    drawer.classList.add('show'); overlay.classList.add('show');
  });
  overlay.addEventListener('click', ()=>{
    drawer.classList.remove('show'); overlay.classList.remove('show');
  });

  /* ---------------- level-up ---------------- */
  const levelupOverlay = document.getElementById('levelupOverlay');
  document.getElementById('levelupCloseBtn').addEventListener('click', ()=>{
    levelupOverlay.classList.remove('show');
  });
  // clicking the dimmed backdrop (but not the card itself) also dismisses the popup
  levelupOverlay.addEventListener('click', (e)=>{
    if(e.target === levelupOverlay) levelupOverlay.classList.remove('show');
  });

  document.getElementById('sharePreviewIcon').style.backgroundImage = "url("+ASSETS.mochi_idle_plain_icon+")";

  // shared numbers for both the share-card preview and the actual share text, so they never drift apart
  function weeklyStats(){
    const activeDays = getWeekDates(0).filter(d => (state.history[todayKey(d)]||0) > 0).length;
    const level = getLevel();
    const xpToday = (state.history[todayKey()]||0) * XP_PER_TASK;
    return {activeDays, level, xpToday};
  }
  // fills in the "Diese Woche teilen" preview card shown in the drawer
  function updateShareCard(){
    const {activeDays, level, xpToday} = weeklyStats();
    const goalTarget = 7;
    document.getElementById('shareLevel').textContent = 'Level '+level;
    document.getElementById('shareDays').textContent = activeDays+' / '+goalTarget+' Tage';
    document.getElementById('shareBar').style.width = Math.min(100, Math.round(activeDays/goalTarget*100))+'%';
    document.getElementById('shareXp').textContent = '+'+xpToday+' XP';
  }
  document.getElementById('shareBtn').addEventListener('click', ()=>{
    const {activeDays, level, xpToday} = weeklyStats();
    const text = '🐾 Mochi Level '+level+' – '+activeDays+'/7 Tage aktiv diese Woche, +'+xpToday+' XP heute! 🎉';
    // prefer the native share sheet; fall back to clipboard; worst case just show the text in a toast
    if(navigator.share){
      navigator.share({text: text, title: 'Mochi – Habit Tracker'}).catch(()=>{});
    } else if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(()=> showToast('In Zwischenablage kopiert!'));
    } else {
      showToast(text);
    }
  });
  document.getElementById('resetBtn').addEventListener('click', ()=>{
    if(confirm('Wirklich den gesamten Fortschritt zurücksetzen?')){
      state.coins = 40; state.tasks.forEach(t=>t.done=false); state.history={};
      state.totalCompleted=0; state.xp=0; state.owned=[];
      state.equipped={ribbon:null,bed:null,wall:null,tower:null,stool:null,plant:null,table:null,window:null,frame:null};
      renderAll();
      drawer.classList.remove('show'); overlay.classList.remove('show');
    }
  });

  /* ---------------- room rendering ---------------- */
  // rebuilds the isometric room from scratch based on what's currently equipped/owned;
  // draw order below also defines the stacking (z-index) of each layer
  function renderRoom(container){
    container.innerHTML = '';
    const bg = document.createElement('img');
    bg.className = 'room-bg';
    bg.src = state.equipped.wall ? ASSETS[state.equipped.wall] : ASSETS.room_base;
    container.appendChild(bg);

    // window & wall frame (single, behind furniture)
    if(state.equipped.window){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.window)], WINDOW_POS, 1);
    }
    if(state.equipped.frame){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.frame)], FRAME_POS, 1);
    }
    // tower / stool / plant / table (single)
    if(state.equipped.tower){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.tower)], TOWER_POS, 3);
    }
    if(state.equipped.stool){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.stool)], STOOL_POS, 3);
    }
    if(state.equipped.plant){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.plant)], PLANT_POS, 3);
    }
    if(state.equipped.table){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.table)], TABLE_POS, 3);
    }
    // bed (single)
    if(state.equipped.bed){
      addRoomImg(container, ASSETS[itemIcon(state.equipped.bed)], BED_POS, 2);
    }
    // toys (multi, up to 3)
    const toys = state.owned.filter(id => itemById(id) && itemById(id).slot==='toy').slice(0,3);
    toys.forEach((id,i)=> addRoomImg(container, ASSETS[itemIcon(id)], TOY_SLOTS[i], 4, itemIcon(id).startsWith('toy_') ));
    // deco (multi, up to 3)
    const decos = state.owned.filter(id => itemById(id) && itemById(id).slot==='deco').slice(0,3);
    decos.forEach((id,i)=> addRoomImg(container, ASSETS[itemIcon(id)], DECO_SLOTS[i], 4));

    // mochi: background-position steps through the sprite-sheet frames to animate the idle pose.
    // steps(frames-1) (not frames) is intentional: background-position 0%-100% only spans
    // (frames-1) frame-widths, so using the full frame count would misalign/blend frames.
    const mochi = document.createElement('div');
    mochi.className = 'mochi-sprite';
    const stripKey = state.equipped.ribbon ? ('mochi_idle_ribbon_'+state.equipped.ribbon.replace('ribbon_','')+'_strip') : 'mochi_idle_plain_strip';
    const frames = state.equipped.ribbon ? 4 : 6; // plain strip (Waiting.png) has 6 square frames, ribbon strips have 4
    mochi.style.backgroundImage = "url("+ASSETS[stripKey]+")";
    mochi.style.backgroundSize = (frames*100)+"% 100%";
    mochi.style.animation = "mochi-idle "+(frames*0.225)+"s steps("+(frames-1)+") infinite";
    mochi.style.zIndex = 5;
    container.appendChild(mochi);
  }
  // places a single owned/equipped item's image at a fixed room position (see the *_POS/*_SLOTS constants above)
  function addRoomImg(container, src, pos, z, isGif){
    const img = document.createElement('img');
    img.className = 'room-item';
    img.src = src;
    img.style.left = pos.left; img.style.top = pos.top; img.style.width = pos.width;
    img.style.zIndex = z;
    container.appendChild(img);
  }
  function itemById(id){ return SHOP_ITEMS.find(i=>i.id===id); }
  // looks up an item's sprite key; falls back to the id itself if the item isn't in the catalog
  function itemIcon(id){ const it = itemById(id); return it ? it.icon : id; }

  /* ---------------- tasks ---------------- */
  // (re)draws the today's-tasks checklist from state.tasks
  function renderTasks(){
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    if(state.tasks.length===0){
      list.innerHTML = '<div class="empty-note">Noch keine Aufgaben – füg unten eine hinzu 🐾</div>';
      return;
    }
    state.tasks.forEach(t=>{
      const row = document.createElement('div');
      row.className = 'task' + (t.done ? ' done' : '');
      row.innerHTML = '<div class="box">'+(t.done ? '✓' : '')+'</div><span class="label">'+escapeHtml(t.text)+'</span><span class="del">✕</span>';
      row.querySelector('.box').addEventListener('click', ()=> toggleTask(t.id));
      row.querySelector('.label').addEventListener('click', ()=> toggleTask(t.id));
      row.querySelector('.del').addEventListener('click', (e)=>{ e.stopPropagation(); deleteTask(t.id); });
      list.appendChild(row);
    });
  }
  // escapes user-entered task text before inserting it as innerHTML, to avoid injecting markup
  function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

  // completes/uncompletes a task, awards or reverts coins+XP, and fires the level-up
  // celebration if this completion just pushed the player into a new level
  function toggleTask(id){
    const t = state.tasks.find(x=>x.id===id);
    if(!t) return;
    const levelBefore = getLevel();
    t.done = !t.done;
    const key = todayKey();
    state.history[key] = state.history[key] || 0;
    if(t.done){
      state.coins += TASK_REWARD;
      state.xp += XP_PER_TASK;
      state.totalCompleted += 1;
      state.history[key] += 1;
      showToast('+'+TASK_REWARD+' Coins!');
    } else {
      state.coins = Math.max(0, state.coins - TASK_REWARD);
      state.xp = Math.max(0, state.xp - XP_PER_TASK);
      state.totalCompleted = Math.max(0, state.totalCompleted - 1);
      state.history[key] = Math.max(0, state.history[key]-1);
    }
    const levelAfter = getLevel();
    if(t.done && levelAfter > levelBefore){
      celebrateLevelUp(levelAfter);
    } else {
      renderAll();
    }
  }
  // grants the level-up coin bonus and pops the "Level X erreicht!" overlay
  function celebrateLevelUp(level){
    state.coins += LEVEL_UP_BONUS;
    renderAll();
    document.getElementById('levelupTitle').textContent = 'Level '+level+' erreicht!';
    document.getElementById('levelupBonus').textContent = '+'+LEVEL_UP_BONUS+' Bonus-Coins';
    document.getElementById('levelupOverlay').classList.add('show');
  }
  function deleteTask(id){
    state.tasks = state.tasks.filter(t=>t.id!==id);
    renderTasks();
  }
  document.getElementById('addTaskBtn').addEventListener('click', addTaskFromInput);
  document.getElementById('taskInput').addEventListener('keydown', e=>{ if(e.key==='Enter') addTaskFromInput(); });
  function addTaskFromInput(){
    const input = document.getElementById('taskInput');
    const val = input.value.trim();
    if(!val) return;
    state.tasks.push({id:cryptoId(), text:val, done:false});
    input.value = '';
    renderTasks();
  }

  /* ---------------- overview ---------------- */
  const WEEKDAY_LABELS = ['Mo','Di','Mi','Do','Fr','Sa','So'];
  // returns the 7 Date objects (Mon-Sun) of the week at `offset` weeks from the current one
  function getWeekDates(offset){
    const now = new Date();
    const day = (now.getDay()+6)%7; // 0=Mo
    const monday = new Date(now);
    monday.setDate(now.getDate() - day + offset*7);
    const days = [];
    for(let i=0;i<7;i++){
      const d = new Date(monday);
      d.setDate(monday.getDate()+i);
      days.push(d);
    }
    return days;
  }
  document.getElementById('weekPrev').addEventListener('click', ()=>{ state.weekOffset--; renderOverview(); });
  document.getElementById('weekNext').addEventListener('click', ()=>{ state.weekOffset++; renderOverview(); });

  // draws the week-strip, weekly-goal bar, level/XP bar and lifetime stats on the Overview tab
  function renderOverview(){
    const days = getWeekDates(state.weekOffset);
    document.getElementById('weekTitle').textContent = state.weekOffset===0 ? 'Diese Woche' : (state.weekOffset<0 ? 'Vor '+(-state.weekOffset)+' Woche(n)' : 'In '+state.weekOffset+' Woche(n)');

    const row = document.getElementById('weekRow');
    row.innerHTML = '';
    const todayStr = todayKey();
    let activeDaysThisWeek = 0;
    days.forEach((d,i)=>{
      const key = todayKey(d);
      const active = (state.history[key]||0) > 0;
      if(active) activeDaysThisWeek++;
      const el = document.createElement('div');
      el.className = 'day' + (key===todayStr ? ' today' : '');
      el.innerHTML = '<span>'+WEEKDAY_LABELS[i]+'</span><div class="dot'+(active?'':'')+'" style="'+(active?'':'')+'"></div>';
      const dot = el.querySelector('.dot');
      if(active){ dot.parentElement.classList.add('active'); dot.textContent='✓'; }
      row.appendChild(el);
    });

    const goalTarget = 7;
    const pct = Math.min(100, Math.round(activeDaysThisWeek/goalTarget*100));
    document.getElementById('goalLabel').textContent = activeDaysThisWeek+' / '+goalTarget+' Tage aktiv';
    document.getElementById('goalBar').style.width = pct+'%';

    const level = getLevel();
    const xpIntoLevel = state.xp % XP_PER_LEVEL;
    document.getElementById('levelLabel').textContent = 'LV. '+level;
    document.getElementById('xpLabel').textContent = 'XP '+xpIntoLevel+' / '+XP_PER_LEVEL;
    document.getElementById('xpBar').style.width = Math.round(xpIntoLevel/XP_PER_LEVEL*100)+'%';

    document.getElementById('statTasks').textContent = state.totalCompleted;
    document.getElementById('statDays').textContent = Object.values(state.history).filter(v=>v>0).length;
  }

  /* ---------------- shop ---------------- */
  const chipsEl = document.getElementById('chips');
  CHIPS.forEach(c=>{
    const el = document.createElement('div');
    el.className = 'chip' + (c.key===state.shopFilter?' active':'');
    el.textContent = c.label;
    el.addEventListener('click', ()=>{ state.shopFilter = c.key; renderShop(); });
    chipsEl.appendChild(el);
  });

  // renders the shop grid for the active category chip; each card ends up in one of four
  // states, checked in this order: locked (below minLevel) > buyable > equip/unequip > already owned
  function renderShop(){
    document.querySelectorAll('.chip').forEach((el,i)=> el.classList.toggle('active', CHIPS[i].key===state.shopFilter));
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';
    const items = SHOP_ITEMS.filter(i => state.shopFilter==='all' || i.cat===state.shopFilter);
    const level = getLevel();
    items.forEach(item=>{
      const owned = state.owned.includes(item.id);
      // slots where only one item can be equipped at a time (as opposed to 'toy'/'deco', which allow several)
      const equippableSlot = (item.slot==='ribbon' || item.slot==='bed' || item.slot==='wall' || item.slot==='tower' || item.slot==='stool' || item.slot==='plant' || item.slot==='table' || item.slot==='window' || item.slot==='frame');
      const isEquipped = equippableSlot && state.equipped[item.slot]===item.id;
      const canAfford = state.coins >= item.price;
      const locked = item.minLevel && level < item.minLevel;

      const card = document.createElement('div');
      card.className = 'item-card' + (locked ? ' locked' : '');
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      const img = document.createElement('img');
      img.src = ASSETS[item.icon];
      thumb.appendChild(img);
      card.appendChild(thumb);

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = item.name;
      card.appendChild(name);

      const btn = document.createElement('button');
      btn.className = 'item-btn';
      if(locked){
        btn.classList.add('locked');
        btn.textContent = '🔒 Ab Level '+item.minLevel;
        btn.disabled = true;
      } else if(!owned){
        btn.classList.toggle('disabled', !canAfford);
        btn.innerHTML = canAfford
          ? '<svg class="mini-coin" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#F6CD62" stroke="#C9962E" stroke-width="1.5"/></svg> '+item.price
          : 'Zu teuer';
        btn.addEventListener('click', ()=> buyItem(item));
      } else if(equippableSlot){
        btn.classList.toggle('equipped', isEquipped);
        btn.textContent = isEquipped ? 'Ausgerüstet ✓' : 'Ausrüsten';
        btn.addEventListener('click', ()=> equipItem(item));
      } else {
        btn.classList.add('owned');
        btn.textContent = 'Gekauft ✓';
        btn.disabled = true;
      }
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }

  // buys an item (guards duplicate the shop's lock/afford checks in case this is ever called
  // from somewhere other than an enabled button); auto-equips it if that slot is still empty
  function buyItem(item){
    if(state.coins < item.price) return;
    if(item.minLevel && getLevel() < item.minLevel) return;
    state.coins -= item.price;
    state.owned.push(item.id);
    if(item.slot==='ribbon' || item.slot==='bed' || item.slot==='wall' || item.slot==='tower' || item.slot==='stool' || item.slot==='plant' || item.slot==='table' || item.slot==='window' || item.slot==='frame'){
      if(!state.equipped[item.slot]) state.equipped[item.slot] = item.id;
    }
    showToast(item.name+' gekauft!');
    renderAll();
  }
  // toggles an owned item on/off in its slot (only one item per slot can be equipped)
  function equipItem(item){
    if(state.equipped[item.slot] === item.id){
      state.equipped[item.slot] = null;
    } else {
      state.equipped[item.slot] = item.id;
    }
    renderAll();
  }

  /* ---------------- global render ---------------- */
  // re-renders everything that depends on state; the overview/shop views only redraw
  // themselves if they're currently visible (the room and task list are always live on Home)
  function renderAll(){
    document.getElementById('coinCountHome').textContent = fmtMoney(state.coins);
    document.getElementById('coinCountShop').textContent = fmtMoney(state.coins);
    renderRoom(document.getElementById('roomCardHome'));
    renderTasks();
    if(document.getElementById('view-overview').classList.contains('active')) renderOverview();
    if(document.getElementById('view-shop').classList.contains('active')) renderShop();
  }

  renderAll();
})();
