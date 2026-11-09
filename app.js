'use strict';

const PREP_MS = 15 * 60 * 1000;
const TALK_MS = 60 * 1000;
const STORAGE_KEY = 'randomizador-buceo-v1';
const CATEGORIES = [
  {id:'seguridad', label:'Seguridad', icon:'◇'},
  {id:'fisiologia', label:'Fisiología', icon:'♡'},
  {id:'equipos', label:'Equipos', icon:'⚙'},
  {id:'operaciones', label:'Operaciones', icon:'↗'},
  {id:'emergencias', label:'Emergencias', icon:'✚'},
  {id:'fisica', label:'Física y técnica', icon:'◉'},
  {id:'medioambiente', label:'Medioambiente', icon:'≈'},
  {id:'historia', label:'Cultura del buceo', icon:'⌁'}
];

// Banco de cuestiones didácticas. Las preguntas no sustituyen protocolos de buceo.
const TOPIC_DATA = [
  ['seguridad','Evaluación previa de riesgos','¿Qué información se debe estudiar antes de planificar una inmersión?'],
  ['seguridad','El compañero de buceo','¿Qué funciones tiene el binomio y cómo se comprueba su disponibilidad?'],
  ['seguridad','Briefing previo a la inmersión','¿Qué información debería contener un briefing claro?'],
  ['seguridad','Revisión del equipo antes de entrar','¿Por qué se realiza y qué errores puede detectar?'],
  ['seguridad','Límites personales y operativos','¿Cómo influyen la formación y las condiciones en la decisión de bucear?'],
  ['seguridad','Visibilidad reducida','¿Qué riesgos introduce y cómo cambia la comunicación?'],
  ['seguridad','Gestión del consumo de gas','¿Por qué hay que prever reservas y supervisar el consumo?'],
  ['seguridad','Control de flotabilidad','¿Cómo influye en la seguridad y en la protección del entorno?'],
  ['seguridad','Trabajo en equipo bajo el agua','¿Qué aporta una distribución previa de responsabilidades?'],
  ['seguridad','Condiciones meteorológicas y marinas','¿Qué variables pueden obligar a modificar la actividad?'],
  ['seguridad','Criterios de cancelación','¿Por qué es esencial definir cuándo no se debe iniciar o continuar?'],
  ['seguridad','Registro y aprendizaje de incidentes','¿Cómo se aprovechan los incidentes para mejorar la prevención?'],
  ['seguridad','Comunicaciones en superficie','¿Qué debe conocer el personal de apoyo durante la inmersión?'],
  ['seguridad','Procedimientos normalizados','¿Por qué hay que utilizar los procedimientos aprobados para cada actividad?'],
  ['fisiologia','Presión y espacios aéreos','¿Cómo afecta un cambio de profundidad a las cavidades con aire?'],
  ['fisiologia','Barotraumatismos','¿Qué son y qué zonas del cuerpo pueden verse afectadas?'],
  ['fisiologia','Enfermedad descompresiva','¿Cuál es el mecanismo general y por qué requiere asistencia especializada?'],
  ['fisiologia','Narcosis por nitrógeno','¿Qué efectos puede tener sobre la percepción y las decisiones?'],
  ['fisiologia','Toxicidad del oxígeno','¿Por qué deben respetarse los límites del gas y la exposición?'],
  ['fisiologia','Hipotermia en el agua','¿Qué factores favorecen la pérdida de calor corporal?'],
  ['fisiologia','Hidratación y estado físico','¿Cómo pueden influir en el rendimiento y la seguridad?'],
  ['fisiologia','Fatiga en el buceo','¿Qué causas habituales pueden aumentarla?'],
  ['fisiologia','Respiración con presión ambiental','¿Qué cambia en el trabajo respiratorio bajo el agua?'],
  ['fisiologia','Estrés y toma de decisiones','¿Qué señales pueden revelar una situación de sobrecarga?'],
  ['fisiologia','Oído medio y compensación','¿Por qué son relevantes los cambios de presión para el oído?'],
  ['fisiologia','Dióxido de carbono y ventilación','¿Por qué es importante controlar el esfuerzo respiratorio?'],
  ['fisiologia','Reconocimiento de síntomas tras bucear','¿Qué importancia tiene comunicar síntomas sin demora?'],
  ['equipos','Reguladores de buceo','¿Qué función cumplen las distintas etapas de un regulador?'],
  ['equipos','Botellas y válvulas','¿Qué conceptos de mantenimiento, identificación e inspección conviene conocer?'],
  ['equipos','Chaleco compensador','¿Para qué sirve y qué limitaciones presenta?'],
  ['equipos','Traje húmedo frente a seco','¿Qué diferencias hay en aislamiento, uso y cuidados?'],
  ['equipos','Ordenador de buceo','¿Qué información presenta y cuáles son sus limitaciones?'],
  ['equipos','Manómetro y control de presión','¿Por qué no se debe depender de una única lectura aislada?'],
  ['equipos','Máscara y campo visual','¿Cómo influye el diseño en la visión subacuática?'],
  ['equipos','Aletas y propulsión','¿Cómo afecta la técnica de aleteo al esfuerzo y al entorno?'],
  ['equipos','Equipos de comunicación subacuática','¿Qué métodos existen y cuándo son útiles?'],
  ['equipos','Umbilical de suministro desde superficie','¿Qué funciones generales puede integrar?'],
  ['equipos','Cascos y máscaras faciales completas','¿Qué ventajas y exigencias tienen los sistemas integrales?'],
  ['equipos','Sistemas de respiración de circuito cerrado','¿En qué se diferencian conceptualmente de los de circuito abierto?'],
  ['equipos','Mantenimiento documental del equipo','¿Qué aporta la trazabilidad de las inspecciones?'],
  ['equipos','Iluminación subacuática','¿Qué aspectos condicionan su elección y su uso seguro?'],
  ['operaciones','Buceo desde embarcación','¿Qué coordinación hace falta entre cubierta y equipo de buceo?'],
  ['operaciones','Buceo desde costa','¿Qué factores afectan la entrada y salida del agua?'],
  ['operaciones','Buceo profesional y recreativo','¿Qué diferencias generales existen en objetivos y organización?'],
  ['operaciones','Equipo de apoyo en superficie','¿Qué responsabilidades pueden existir durante una operación?'],
  ['operaciones','Señalización de actividades subacuáticas','¿Por qué es necesaria la identificación del área de buceo?'],
  ['operaciones','Búsqueda subacuática','¿Qué criterios generales ayudan a organizar una búsqueda?'],
  ['operaciones','Inspección de estructuras sumergidas','¿Qué riesgos particulares puede presentar una inspección?'],
  ['operaciones','Cartografía del fondo','¿Qué información aporta un reconocimiento previo de la zona?'],
  ['operaciones','Corrientes y mareas','¿Cómo condicionan el momento y la planificación de una inmersión?'],
  ['operaciones','Uso de ROV','¿Cuándo puede ser preferible un vehículo operado a distancia?'],
  ['operaciones','Buceo en puerto','¿Qué riesgos proceden de buques, cabos e infraestructuras?'],
  ['operaciones','Buceo de intervención y mantenimiento','¿Cómo se diferencia una tarea operativa de una inmersión de observación?'],
  ['operaciones','Registro posterior a la inmersión','¿Qué datos deben conservarse para el seguimiento de la actividad?'],
  ['operaciones','Descompresión como parte de la planificación','¿Por qué la planificación de descompresión necesita criterios aprobados?'],
  ['emergencias','Activación del plan de emergencia','¿Por qué debe conocerse antes de empezar una operación?'],
  ['emergencias','Pérdida de contacto con el compañero','¿Qué factores deben definir los procedimientos de respuesta?'],
  ['emergencias','Fallo de suministro de gas','¿Por qué se ensayan respuestas de emergencia en formación supervisada?'],
  ['emergencias','Asistencia en superficie','¿Cómo se organiza la recepción de una persona rescatada?'],
  ['emergencias','Incidente por hipotermia','¿Qué importancia tiene el reconocimiento y la atención temprana?'],
  ['emergencias','Sospecha de accidente descompresivo','¿Qué papel cumplen la coordinación y los servicios sanitarios?'],
  ['emergencias','Comunicación con servicios de rescate','¿Qué información facilita una respuesta rápida?'],
  ['emergencias','Pérdida de visibilidad o iluminación','¿Por qué se necesitan acuerdos previos sobre señales y retorno?'],
  ['emergencias','Enredo en cabos o redes','¿Qué riesgos plantea y por qué se requiere formación específica?'],
  ['emergencias','Simulacros de emergencia','¿Qué permite comprobar un simulacro bien preparado?'],
  ['emergencias','Gestión de incidentes sin lesiones','¿Por qué conviene documentar también los casi accidentes?'],
  ['emergencias','Oxigenoterapia de emergencia','¿Qué papel puede tener en la atención inicial según formación y protocolos?'],
  ['fisica','Ley de Boyle-Mariotte','¿Qué relación existe entre presión y volumen de un gas?'],
  ['fisica','Ley de Dalton','¿Qué significa presión parcial en una mezcla respirable?'],
  ['fisica','Principio de Arquímedes','¿Cómo se relaciona con la flotabilidad en el agua?'],
  ['fisica','Densidad del agua dulce y salada','¿Qué diferencia produce en la flotabilidad?'],
  ['fisica','Transmisión del sonido bajo el agua','¿Por qué percibimos los sonidos de forma distinta?'],
  ['fisica','Refracción de la luz','¿Por qué parecen variar el tamaño y la distancia de los objetos?'],
  ['fisica','Absorción de colores con la profundidad','¿Cómo cambia la luz disponible durante el descenso?'],
  ['fisica','Densidad y trabajo respiratorio','¿Por qué aumenta el esfuerzo de respirar en determinadas condiciones?'],
  ['fisica','Mezclas respirables','¿Qué conceptos de composición e identificación hay que dominar?'],
  ['fisica','Velocidad de ascenso','¿Por qué está contemplada en los planes y procedimientos de buceo?'],
  ['fisica','Profundidad y presión ambiental','¿Cómo varía la presión al descender en el agua?'],
  ['fisica','Flotabilidad neutra y equilibrio','¿Qué fuerzas intervienen cuando una persona se mantiene a una cota?'],
  ['medioambiente','Praderas de posidonia','¿Por qué es importante evitar daños a este hábitat?'],
  ['medioambiente','Residuos marinos','¿Qué efectos tienen los plásticos y otros restos sumergidos?'],
  ['medioambiente','Buceo de bajo impacto','¿Qué comportamientos pueden reducir el daño al entorno?'],
  ['medioambiente','Especies invasoras','¿Cómo pueden alterar los ecosistemas marinos?'],
  ['medioambiente','Áreas marinas protegidas','¿Qué objetivos tienen y qué normas pueden aplicarse?'],
  ['medioambiente','Observación responsable de fauna','¿Por qué se debe evitar tocar o perseguir animales?'],
  ['medioambiente','Arrecifes artificiales','¿Qué usos y efectos ecológicos pueden tener?'],
  ['medioambiente','Contaminación acústica submarina','¿Qué actividades pueden generarla y a qué organismos afecta?'],
  ['medioambiente','Cambio climático y fondos marinos','¿Qué cambios ambientales se están observando?'],
  ['medioambiente','Arqueología subacuática','¿Por qué se debe preservar el patrimonio sumergido?'],
  ['medioambiente','Redes fantasma','¿Qué son y qué peligros generan para la fauna y el buceador?'],
  ['medioambiente','Ciencia ciudadana y buceo','¿Cómo puede contribuir la observación submarina a conocer el mar?'],
  ['historia','Jacques-Yves Cousteau','¿Qué aportaciones hizo a la divulgación de los océanos?'],
  ['historia','Origen de la escafandra autónoma','¿Cómo evolucionaron los sistemas de respiración?'],
  ['historia','Campanas de buceo','¿Cuál es su principio básico y qué uso histórico tuvieron?'],
  ['historia','Historia del buceo militar','¿Cómo se han desarrollado las misiones submarinas a lo largo del tiempo?'],
  ['historia','Evolución de las tablas de buceo','¿Qué problema tratan de gestionar?'],
  ['historia','Primeras exploraciones del fondo marino','¿Qué limitaciones técnicas tuvieron?'],
  ['historia','Buceo científico','¿Qué tipos de investigaciones se realizan bajo el agua?'],
  ['historia','Nacimiento del buceo deportivo','¿Cómo se extendió la práctica entre la población civil?'],
  ['historia','ROV y exploración moderna','¿Qué avances han ampliado el conocimiento del fondo marino?'],
  ['historia','Señales internacionales de buceo','¿Por qué se necesitan códigos de comunicación compartidos?'],
  ['historia','Buceo de saturación','¿Cuál es su concepto general y en qué contextos se utiliza?'],
  ['historia','Oficios vinculados al buceo','¿Qué profesiones requieren trabajo bajo el agua?']
];
const TOPICS = TOPIC_DATA.map(([category, title, cue], index) => ({id:`b-${index}`, category, title, cue}));

function freshState() {return {participants:[], mode:'collective', categories:CATEGORIES.map(c=>c.id),customTopics:[], usedTopicIds:[], sound:true, customOpen:false, session:null};}
function loadState(){
  const defaults=freshState();
  try {
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(!stored || typeof stored!=='object')return defaults;
    return {
      ...defaults,
      participants:Array.isArray(stored.participants)?stored.participants.filter(n=>typeof n==='string').slice(0,150):[],
      mode:stored.mode==='individual'?'individual':'collective',
      categories:Array.isArray(stored.categories)?stored.categories.filter(id=>CATEGORIES.some(c=>c.id===id)):defaults.categories,
      customTopics:Array.isArray(stored.customTopics)?stored.customTopics.filter(t=>t&&typeof t.title==='string'&&CATEGORIES.some(c=>c.id===t.category)).slice(0,300):[],
      usedTopicIds:Array.isArray(stored.usedTopicIds)?stored.usedTopicIds.filter(id=>typeof id==='string').slice(-500):[],
      sound:stored.sound!==false,
      customOpen:!!stored.customOpen,
      session:validateSession(stored.session)
    };
  } catch {return defaults;}
}
function validateSession(s){
  if(!s||!['collective-prep','individual-prep','presenting','finished'].includes(s.phase)||!Array.isArray(s.assignments)||!s.assignments.length||!['collective','individual'].includes(s.mode))return null;
  if(!Number.isInteger(s.index)||s.index<0||s.index>=s.assignments.length)return null;
  if(s.phase!=='finished'&&(!s.timer||!Number.isFinite(s.timer.remainingMs)))return null;
  return s;
}
let state=loadState();
let toastTimeout=null;
let audioContext=null;
let wakeLock=null;
const app=document.getElementById('app');
const toastElement=document.getElementById('toast');

function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(err){console.warn('No se pudo guardar la sesión:',err);}}
function esc(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function normalize(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();}
function allTopics(){return [...TOPICS,...state.customTopics];}
function selectedTopics(){return allTopics().filter(t=>state.categories.includes(t.category));}
function categoryFor(id){return CATEGORIES.find(c=>c.id===id)||CATEGORIES[0];}
function randomIndex(max){if(globalThis.crypto?.getRandomValues){const nums=new Uint32Array(1);const bound=Math.floor(0x100000000/max)*max;let n;do{crypto.getRandomValues(nums);n=nums[0];}while(n>=bound);return n%max;}return Math.floor(Math.random()*max);}
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=randomIndex(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function addParticipants(raw){
  const names=raw.split(/[\n,;]+/).map(n=>n.trim().replace(/\s+/g,' ').slice(0,65)).filter(Boolean);
  if(!names.length){showToast('Escribe al menos un nombre.');return;}
  const seen=new Set(state.participants.map(normalize));let added=0;
  for(const name of names){const key=normalize(name);if(!key||seen.has(key))continue;if(state.participants.length>=150)break;state.participants.push(name);seen.add(key);added++;}
  save();render();showToast(added?`${added} participante${added===1?' añadido':'s añadidos'}.`:'Esos nombres ya están en la lista.');
}
function showToast(message){toastElement.textContent=message;toastElement.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toastElement.classList.remove('visible'),3000);}
function modeLabel(){return state.mode==='collective'?'Colectiva':'Individual';}

function renderSetup(){
  const selected=selectedTopics();
  const customHtml=state.customTopics.map(t=>`<div class="custom-row"><span><strong>${esc(t.title)}</strong><small>${esc(categoryFor(t.category).label)}</small></span><button type="button" class="remove-link" data-action="remove-topic" data-id="${esc(t.id)}" aria-label="Quitar ${esc(t.title)}">Quitar</button></div>`).join('');
  app.innerHTML=`
    <div class="section-heading"><div><span class="step-tag">01 / PREPARAR LA DINÁMICA</span><h2>Configura la sesión</h2><p>Añade a los participantes y elige los temas del sorteo.</p></div><span class="counter-flag">MODO <strong>${modeLabel().toUpperCase()}</strong></span></div>
    <div class="config-grid">
      <section class="panel config-panel" aria-labelledby="participants-heading">
        <div class="panel-header"><div><h3 id="participants-heading">Participantes</h3><small>Participarán en el sorteo de temas</small></div><span class="count-pill">${state.participants.length} inscrito${state.participants.length===1?'':'s'}</span></div>
        <form id="participants-form"><label class="field-label" for="participants-input">INTRODUCIR NOMBRES</label><textarea id="participants-input" class="form-input" maxlength="10000" placeholder="Ana García&#10;Juan Pérez&#10;Lucía Martín" aria-describedby="participant-help"></textarea><p id="participant-help" class="form-hint">Uno por línea; también puedes separarlos con comas.</p><button type="submit" class="btn btn-secondary btn-full">+ Añadir participantes</button></form>
        <div class="participant-list" aria-label="Lista de participantes">${state.participants.length?state.participants.map((name,i)=>`<span class="participant-chip"><span>${esc(name)}</span><button type="button" data-action="remove-participant" data-index="${i}" title="Eliminar a ${esc(name)}" aria-label="Eliminar a ${esc(name)}">×</button></span>`).join(''):'<div class="empty-list">◌ &nbsp;Aún no hay participantes.</div>'}</div>
        <div class="panel-divider"></div>
        <div class="panel-header"><div><h3>Modalidad</h3><small>Elige cómo se utiliza el tiempo de preparación</small></div></div>
        <div class="mode-grid" role="group" aria-label="Modalidad de preparación">
          <button type="button" class="mode-option ${state.mode==='collective'?'selected':''}" data-action="set-mode" data-mode="collective" aria-pressed="${state.mode==='collective'}"><span class="mode-icon">◷</span><strong>Colectiva</strong><small>15 minutos para todos y después 1 minuto por persona.</small></button>
          <button type="button" class="mode-option ${state.mode==='individual'?'selected':''}" data-action="set-mode" data-mode="individual" aria-pressed="${state.mode==='individual'}"><span class="mode-icon">◉</span><strong>Individual</strong><small>Cada persona dispone de 15 minutos y luego expone durante 1 minuto.</small></button>
        </div>
      </section>
      <section class="panel topics-panel" aria-labelledby="topics-heading">
        <div class="panel-header"><div><h3 id="topics-heading">Banco de temas</h3><small>Selecciona las categorías que entrarán en el sorteo</small></div><span class="count-pill">${allTopics().length} temas</span></div>
        <div class="category-grid">${CATEGORIES.map(c=>`<label class="category-option ${state.categories.includes(c.id)?'checked':''}"><input type="checkbox" data-category="${c.id}" ${state.categories.includes(c.id)?'checked':''}><span class="cat-icon" aria-hidden="true">${c.icon}</span><span>${esc(c.label)}</span><span>${allTopics().filter(t=>t.category===c.id).length}</span></label>`).join('')}</div>
        <div class="topic-summary"><div><strong>${selected.length}</strong><small>TEMAS ACTIVOS PARA EL SORTEO</small></div><div class="inline-info"><span style="color:var(--cyan)">◎</span> Sin repetir hasta agotar</div></div>
        <details id="topic-details" class="topic-manage" ${state.customOpen?'open':''}><summary>Gestionar temas personalizados</summary><div class="topic-manage-inner"><form id="topic-form" class="custom-form"><div class="span-all"><label class="field-label" for="new-topic-title">TEMA</label><input id="new-topic-title" name="title" class="form-input" maxlength="100" required placeholder="Ej.: Buceo nocturno"></div><div><label class="field-label" for="new-topic-category">CATEGORÍA</label><select id="new-topic-category" name="category" class="form-input">${CATEGORIES.map(c=>`<option value="${c.id}">${esc(c.label)}</option>`).join('')}</select></div><div><label class="field-label" for="new-topic-cue">PREGUNTA GUÍA (OPCIONAL)</label><input id="new-topic-cue" name="cue" maxlength="160" class="form-input" placeholder="¿Qué explicarías?"></div><button type="submit" class="btn btn-secondary span-all">+ Añadir tema al banco</button></form>${state.customTopics.length?`<p class="form-hint">Tus temas (${state.customTopics.length}):</p><div class="custom-list">${customHtml}</div>`:'<p class="form-hint">Los temas que añadas quedarán guardados en este navegador.</p>'}</div></details>
      </section>
    </div>
    <div class="action-strip"><div><strong>Todo preparado para el sorteo</strong><small>${state.participants.length?`${state.participants.length} participante${state.participants.length===1?'':'s'} · `:'Añade participantes · '}${selected.length} temas posibles</small></div><button type="button" data-action="draw" class="btn btn-primary" ${!state.participants.length||!selected.length?'disabled':''}>Sortear temas <span class="btn-arrow">↗</span></button></div>
    ${renderHelp()}`;
}
function renderHelp(){return `<div class="help-area"><div class="help-tile"><span class="help-number">01</span><div><strong>Introduce los nombres</strong><p>Añade una persona o pega una lista. El orden de exposición se sortea automáticamente.</p></div></div><div class="help-tile"><span class="help-number">02</span><div><strong>Sortea conceptos</strong><p>Cada participante recibe un tema. Puedes añadir otros o seleccionar categorías.</p></div></div><div class="help-tile"><span class="help-number">03</span><div><strong>Prepara y explica</strong><p>Cuenta atrás de 15 minutos de preparación y 1 minuto para cada intervención.</p></div></div></div>`;}

function drawSession(){
  const possible=selectedTopics();if(!state.participants.length||!possible.length){showToast('Añade participantes y activa al menos una categoría.');return;}
  const names=shuffled(state.participants);
  let unused=shuffled(possible.filter(t=>!state.usedTopicIds.includes(t.id)));
  if(unused.length<names.length){
    const alreadyPicked=new Set(unused.map(t=>t.id));
    unused=unused.concat(shuffled(possible.filter(t=>!alreadyPicked.has(t.id))));
  }
  const chosen=[];
  for(let i=0;i<names.length;i++)chosen.push(unused[i%unused.length]);
  state.usedTopicIds=[...new Set([...state.usedTopicIds,...chosen.map(t=>t.id)])].slice(-500);
  state.session={mode:state.mode,phase:state.mode==='collective'?'collective-prep':'individual-prep',index:0,assignments:names.map((name,i)=>({...chosen[i],name,done:false})),timer:newTimer(PREP_MS),startedAt:new Date().toISOString()};
  save();render();document.getElementById('app').scrollIntoView({behavior:'smooth',block:'start'});
  if(possible.length<names.length)showToast('Hay más participantes que temas: se han repetido algunos.');
  else showToast('Sorteo realizado. ¡Preparados para empezar!');
}
function newTimer(duration){return {duration,remainingMs:duration,running:false,endsAt:null};}
function remaining(t){return t.running?Math.max(0,t.endsAt-Date.now()):Math.max(0,t.remainingMs);}
function formatTime(ms){const seconds=Math.ceil(ms/1000);return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
function currentAssignment(){return state.session?.assignments[state.session.index];}
function phaseInfo(){
  const s=state.session;const a=currentAssignment();
  if(s.phase==='collective-prep')return {overline:'PREPARACIÓN COLECTIVA',badge:'TODOS A LA VEZ',heading:'Tiempo para preparar los temas',context:'Todos los participantes preparan su tema durante el mismo intervalo de 15 minutos.',label:'PREPARACIÓN',primary:'Pasar a exposiciones'};
  if(s.phase==='individual-prep')return {overline:'PREPARACIÓN INDIVIDUAL',badge:`TURNO ${s.index+1} DE ${s.assignments.length}`,heading:a.name,context:`Tema asignado: ${a.title}`,label:'PREPARACIÓN',primary:'Pasar a exposición'};
  return {overline:'EXPOSICIÓN INDIVIDUAL',badge:`TURNO ${s.index+1} DE ${s.assignments.length}`,heading:a.name,context:`Tema: ${a.title}`,label:'EXPOSICIÓN',primary:s.index===s.assignments.length-1?'Finalizar ronda':s.mode==='collective'?'Siguiente participante':'Siguiente preparación'};
}
function renderSession(){
  const s=state.session;
  if(s.phase==='finished'){renderFinished();return;}
  const p=phaseInfo();const prep=s.phase!=='presenting';const t=s.timer;const ms=remaining(t);const percent=((t.duration-ms)/t.duration*100).toFixed(2)+'%';
  const lineup=s.assignments.map((a,i)=>{
    const active=s.phase==='collective-prep'?!a.done:i===s.index;
    const stat=a.done?'Completado':s.phase==='collective-prep'?'Preparando':i===s.index?(prep?'Preparando':'Exponiendo'):'Pendiente';
    return `<div class="lineup-item ${active?'current':''} ${a.done?'done':''}"><div class="lineup-number">${String(i+1).padStart(2,'0')}</div><div><div class="lineup-name">${esc(a.name)}</div><div class="lineup-topic">${esc(a.title)}</div><div class="lineup-meta"><span>${esc(categoryFor(a.category).label)}</span><span class="dot"></span><span class="item-state ${a.done?'done-state':!active?'waiting-state':''}">${stat}</span></div></div></div>`;
  }).join('');
  app.innerHTML=`
    <div class="section-heading"><div><span class="step-tag">02 / SESIÓN EN CURSO</span><h2>${prep?'Tiempo de preparación':'Turno de exposición'}</h2><p>Reparto aleatorio realizado · Modo ${s.mode==='collective'?'colectivo':'individual'}</p></div><span class="counter-flag"><strong>${s.assignments.filter(a=>a.done).length}</strong> / ${s.assignments.length} COMPLETADOS</span></div>
    <div class="active-grid"><section class="panel timer-panel" aria-label="Cronómetro de ${prep?'15 minutos':'1 minuto'}">
      <div class="timer-top"><span class="overline">${p.overline}</span><span class="timer-phase-badge">${p.badge}</span></div>
      <h3 class="timer-subject">${esc(p.heading)}</h3><p class="timer-context">${esc(p.context)}</p>
      <div id="timer-dial" class="timer-dial ${ms===0?'finished':''}" style="--pct:${percent}"><div class="timer-dial-inner"><time id="countdown" class="timer-number" datetime="PT${prep?'15M':'1M'}" role="timer" aria-label="Tiempo restante: ${formatTime(ms)}">${formatTime(ms)}</time><span id="timer-state" class="timer-dial-label">${timerStatus(t)}</span></div></div>
      <div class="timer-actions"><button type="button" data-action="toggle-timer" class="btn ${t.running?'btn-secondary':'btn-primary'}" ${ms===0?'disabled':''}>${t.running?'Ⅱ Pausar':ms===t.duration?'▶ Iniciar':'▶ Reanudar'}</button><button type="button" data-action="reset-timer" class="btn btn-ghost">↺ Reiniciar</button></div>
      <div class="timer-bottom"><button type="button" data-action="advance" class="btn btn-secondary">${p.primary} <span class="btn-arrow">→</span></button></div>
      <span class="timer-help">${ms===0?'Tiempo cumplido. Puedes pasar al siguiente paso.':'El cronómetro se puede pausar o reiniciar en cualquier momento.'}</span>
    </section><aside class="panel lineup-panel"><div class="lineup-title"><div><h3>Orden y temas asignados</h3><p>${s.assignments.length} participante${s.assignments.length===1?'':'s'} · Orden aleatorio</p></div><span class="count-pill">${s.assignments.length} turnos</span></div><div class="lineup-list">${lineup}</div><div class="operation-bar"><button type="button" data-action="export">↓ Exportar reparto CSV</button><button type="button" data-action="new-session">↺ Nueva ronda</button></div></aside></div>${renderHelp()}`;
}
function timerStatus(t){return remaining(t)===0?'TIEMPO AGOTADO':t.running?'EN MARCHA':remaining(t)<t.duration?'EN PAUSA':'LISTO PARA EMPEZAR';}
function renderFinished(){
  const s=state.session;
  app.innerHTML=`<div class="section-heading"><div><span class="step-tag">03 / RONDA FINALIZADA</span><h2>Sesión completada</h2><p>Todos los participantes han terminado su turno.</p></div><span class="counter-flag"><strong>${s.assignments.length}</strong> / ${s.assignments.length} COMPLETADOS</span></div><div class="panel finish-panel"><div class="finish-copy"><span class="finish-mark">✓</span><h3>¡Ronda terminada!</h3><p>Has completado la dinámica de buceo con ${s.assignments.length} participante${s.assignments.length===1?'':'s'}. Puedes guardar el reparto o iniciar una ronda nueva.</p><div class="finish-actions"><button type="button" data-action="new-session" class="btn btn-primary">↺ Nueva ronda</button><button type="button" data-action="export" class="btn btn-ghost">↓ Exportar CSV</button></div></div><div class="finish-list">${s.assignments.map((a,i)=>`<div class="finish-item"><strong>${i+1}. ${esc(a.name)}</strong><span>${esc(a.title)}</span></div>`).join('')}</div></div>${renderHelp()}`;
}
function render(){document.getElementById('hero-topic-count').textContent=allTopics().length;const sound=document.getElementById('sound-toggle');sound.classList.toggle('muted',!state.sound);sound.setAttribute('aria-pressed',String(state.sound));sound.title=state.sound?'Desactivar avisos sonoros':'Activar avisos sonoros';state.session?renderSession():renderSetup();}

async function requestWakeLock(){try{if('wakeLock' in navigator&&document.visibilityState==='visible'&&!wakeLock)wakeLock=await navigator.wakeLock.request('screen');}catch{} }
function releaseWakeLock(){try{wakeLock?.release();}catch{}wakeLock=null;}
function playBeep(){if(!state.sound)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;if(!audioContext)audioContext=new AC();if(audioContext.state==='suspended')audioContext.resume();for(let i=0;i<2;i++){const osc=audioContext.createOscillator();const gain=audioContext.createGain();const at=audioContext.currentTime+i*.23;osc.type='sine';osc.frequency.setValueAtTime(i===0?740:880,at);gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.14,at+.02);gain.gain.exponentialRampToValueAtTime(.0001,at+.18);osc.connect(gain).connect(audioContext.destination);osc.start(at);osc.stop(at+.2);}}catch{} }
function toggleTimer(){const s=state.session;if(!s||s.phase==='finished')return;const t=s.timer;if(t.running){t.remainingMs=remaining(t);t.running=false;t.endsAt=null;releaseWakeLock();}else if(t.remainingMs>0){t.endsAt=Date.now()+t.remainingMs;t.running=true;requestWakeLock();}save();render();}
function resetTimer(){const t=state.session?.timer;if(!t)return;t.running=false;t.endsAt=null;t.remainingMs=t.duration;releaseWakeLock();save();render();}
function advance(){const s=state.session;if(!s)return;releaseWakeLock();if(s.phase==='collective-prep'||s.phase==='individual-prep'){s.phase='presenting';s.timer=newTimer(TALK_MS);}else if(s.phase==='presenting'){
    s.assignments[s.index].done=true;
    if(s.index>=s.assignments.length-1){s.phase='finished';s.timer=null;playBeep();showToast('Ronda completada.');}
    else{s.index++;s.phase=s.mode==='collective'?'presenting':'individual-prep';s.timer=newTimer(s.phase==='presenting'?TALK_MS:PREP_MS);}
  }
  save();render();
}
function tick(){const s=state.session;if(!s||!s.timer||!s.timer.running)return;const ms=remaining(s.timer);if(ms===0){s.timer.remainingMs=0;s.timer.running=false;s.timer.endsAt=null;releaseWakeLock();save();render();playBeep();showToast('¡Tiempo cumplido!');return;}const clock=document.getElementById('countdown');if(clock){const display=formatTime(ms);if(clock.textContent!==display){clock.textContent=display;clock.setAttribute('aria-label',`Tiempo restante: ${display}`);}}const dial=document.getElementById('timer-dial');if(dial)dial.style.setProperty('--pct',((s.timer.duration-ms)/s.timer.duration*100)+'%');}
function exportCSV(){const s=state.session;if(!s)return;const quote=value=>{let v=String(value??'');if(/^[\s]*[=+@\-]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';};const lines=[['Orden','Participante','Tema','Categoría','Pregunta guía','Modalidad','Completado'].map(quote).join(';'),...s.assignments.map((a,i)=>[i+1,a.name,a.title,categoryFor(a.category).label,a.cue,s.mode==='collective'?'Colectiva':'Individual',a.done?'Sí':'No'].map(quote).join(';'))];const blob=new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`randomizador-buceo-${new Date().toISOString().slice(0,10)}.csv`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);showToast('Reparto exportado.');}

app.addEventListener('submit',event=>{
  if(event.target.id==='participants-form'){event.preventDefault();const field=document.getElementById('participants-input');addParticipants(field.value);}
  if(event.target.id==='topic-form'){
    event.preventDefault();const title=event.target.elements.title.value.trim().replace(/\s+/g,' ').slice(0,100);const category=event.target.elements.category.value;const cue=event.target.elements.cue.value.trim().slice(0,160);
    if(!title||!CATEGORIES.some(c=>c.id===category))return;
    if(allTopics().some(t=>normalize(t.title)===normalize(title))){showToast('Ese tema ya existe en el banco.');return;}
    if(state.customTopics.length>=300){showToast('Has alcanzado el máximo de temas personalizados.');return;}
    state.customTopics.push({id:'c-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),category,title,cue:cue||'Explica qué sabes sobre este tema.'});state.customOpen=true;
    if(!state.categories.includes(category))state.categories.push(category);
    save();render();showToast('Tema incorporado al banco.');
  }
});
app.addEventListener('change',event=>{
  if(event.target.matches('input[data-category]')){const id=event.target.dataset.category;if(event.target.checked&&!state.categories.includes(id))state.categories.push(id);if(!event.target.checked)state.categories=state.categories.filter(c=>c!==id);save();render();}
});
app.addEventListener('toggle',event=>{if(event.target.id==='topic-details'){state.customOpen=event.target.open;save();}},true);
app.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='remove-participant'){state.participants.splice(Number(button.dataset.index),1);save();render();}
  else if(action==='set-mode'){state.mode=button.dataset.mode;save();render();}
  else if(action==='remove-topic'){state.customTopics=state.customTopics.filter(t=>t.id!==button.dataset.id);state.usedTopicIds=state.usedTopicIds.filter(id=>id!==button.dataset.id);state.customOpen=true;save();render();}
  else if(action==='draw'){drawSession();}
  else if(action==='toggle-timer'){toggleTimer();}
  else if(action==='reset-timer'){resetTimer();}
  else if(action==='advance'){advance();}
  else if(action==='export'){exportCSV();}
  else if(action==='new-session'){if(state.session?.phase!=='finished'&&!confirm('¿Terminar la ronda actual y volver a la configuración?'))return;releaseWakeLock();state.session=null;save();render();document.getElementById('app').scrollIntoView({behavior:'smooth',block:'start'});}
});
document.getElementById('sound-toggle').addEventListener('click',()=>{state.sound=!state.sound;save();render();showToast(state.sound?'Avisos sonoros activados.':'Avisos sonoros desactivados.');});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&state.session?.timer?.running)requestWakeLock();});
window.addEventListener('pagehide',()=>releaseWakeLock());
setInterval(tick,175);
render();
if(state.session?.timer?.running){tick();requestWakeLock();}
if('serviceWorker' in navigator&&location.protocol==='https:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));