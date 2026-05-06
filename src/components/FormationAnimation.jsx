import { useEffect, useState } from "react";

export default function FormationAnimation({ entryId }) {
  switch (entryId) {
    case "pyroclastic": return <PyroclasticAnim />;
    case "bombSag":     return <BombSagAnim />;
    case "ripple":      return <RippleAnim />;
    case "seaCliff":    return <SeaCliffAnim />;
    case "nokgoTear":   return <NokgoTearAnim />;
    case "japCave":     return <JapCaveAnim />;
    default: return null;
  }
}

/* ─── 공통 래퍼 ───────────────────────────────── */
function AnimBox({ children }) {
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height: 164, background: "#04090f" }}>
      {children}
    </div>
  );
}

/* ─── 1. 화산쇄설층: 화산재가 층층이 쌓임 ─────── */
function PyroclasticAnim() {
  const layers = [
    { y: 128, h: 14, color: "#3d2810" },
    { y: 114, h: 12, color: "#9b8060" },
    { y: 101, h: 13, color: "#4a3520" },
    { y: 89,  h: 10, color: "#b09070" },
    { y: 79,  h: 9,  color: "#3a2610" },
    { y: 70,  h: 8,  color: "#c4a882" },
  ];
  const particles = Array.from({ length: 22 }, (_, i) => ({
    x: 88 + (i % 7) * 16,
    delay: (i * 0.22) % 3.6,
    dur: 1.6 + (i % 4) * 0.35,
    r: 1.4 + (i % 3) * 0.7,
    dx: (i % 5 - 2) * 14,
  }));

  return (
    <AnimBox>
      <style>{`
        @keyframes pyroFade{0%,8%{opacity:0}32%,82%{opacity:1}100%{opacity:0}}
        @keyframes ashFall{0%{transform:translateY(0) translateX(0);opacity:.85}100%{transform:translateY(120px) translateX(var(--adx));opacity:0}}
        @keyframes eruptPuff{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.22);opacity:.7}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{ display:"block" }}>
        <defs>
          <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#200800" /><stop offset="100%" stopColor="#091220" />
          </linearGradient>
        </defs>
        <rect width="280" height="164" fill="url(#p-sky)" />

        {/* 화산 실루엣 */}
        <polygon points="140,26 102,68 178,68" fill="#180c04" />
        <polygon points="140,26 124,68 156,68" fill="#241408" />

        {/* 분출 연기 */}
        {[{cx:140,cy:20,r:13,d:0},{cx:127,cy:15,r:9,d:.6},{cx:153,cy:15,r:8,d:1.2},{cx:140,cy:9,r:7,d:.35}].map((c,i)=>(
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#c85500" opacity=".55"
            style={{animation:`eruptPuff 1.6s ease-in-out ${c.d}s infinite`}} />
        ))}

        {/* 화산재 입자 */}
        {particles.map((p,i)=>(
          <circle key={i} cx={p.x} cy={32} r={p.r}
            fill={["#c4a882","#8b7355","#ddc9a8"][i%3]}
            style={{"--adx":`${p.dx}px`, animation:`ashFall ${p.dur}s linear ${p.delay}s infinite`}} />
        ))}

        {/* 지층들 – 순차적으로 나타남 */}
        {layers.map((l,i)=>(
          <rect key={i} x={0} y={l.y} width={280} height={l.h} fill={l.color}
            style={{animation:`pyroFade 4.2s ease ${i*.55}s infinite`}} />
        ))}

        {/* 기반암 */}
        <rect x={0} y={142} width={280} height={22} fill="#140a02" />

        {/* 레이블 */}
        <text x={6} y={157} fontSize={7} fill="#8b7355" opacity=".55">기반암</text>
        <text x={6} y={124} fontSize={7} fill="#c4a882" opacity=".6">조립질(어두운) ↕ 세립질(밝은) 반복</text>
        <text x={6} y={14} fontSize={8} fill="#f97316" opacity=".7" fontWeight="bold">🌋 수성화산 폭발 → 화산재 누적</text>
      </svg>
    </AnimBox>
  );
}

/* ─── 2. 탄낭 구조: 화산탄 낙하 → V자 변형 ────── */
function BombSagAnim() {
  const [phase, setPhase] = useState(0);
  const dur = [2400, 680, 260, 2600];
  useEffect(()=>{
    const t = setTimeout(()=>setPhase(p=>(p+1)%4), dur[phase]);
    return ()=>clearTimeout(t);
  },[phase]);

  const layerColors = ["#9b8060","#3d2810","#9b8060","#3d2810","#9b8060"];

  const flatRects = [
    {y:70,h:11},{y:83,h:11},{y:96,h:12},{y:110,h:11},{y:123,h:11},
  ];
  // V자 변형 경로
  const vPaths = [
    "M0,70 L112,70 L128,80 L140,90 L152,80 L168,70 L280,70 L280,81 L168,81 L152,91 L140,101 L128,91 L112,81 L0,81 Z",
    "M0,81 L110,81 L126,94 L140,106 L154,94 L170,81 L280,81 L280,92 L170,92 L154,105 L140,117 L126,105 L110,92 L0,92 Z",
    "M0,94 L108,94 L124,106 L140,120 L156,106 L172,94 L280,94 L280,106 L172,106 L156,121 L140,133 L124,121 L108,106 L0,106 Z",
    "M0,108 L108,108 L122,116 L140,124 L158,116 L172,108 L280,108 L280,119 L172,119 L158,127 L140,135 L122,127 L108,119 L0,119 Z",
    "M0,121 L108,121 L121,126 L140,130 L159,126 L172,121 L280,121 L280,132 L172,132 L159,131 L140,135 L121,131 L108,132 L0,132 Z",
  ];

  const bombY = phase===0 ? 18 : 74;

  return (
    <AnimBox>
      <style>{`
        @keyframes bombDrop{from{transform:translateY(18px)}to{transform:translateY(74px)}}
        @keyframes flashOut{0%{opacity:.8}100%{opacity:0}}
        @keyframes fuseFlicker{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes archHint{from{opacity:0;transform:scaleY(.2)}to{opacity:.55;transform:scaleY(1)}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{display:"block"}}>
        <defs>
          <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#091a2c"/><stop offset="100%" stopColor="#0d1f30"/>
          </linearGradient>
        </defs>
        <rect width="280" height="164" fill="url(#bs-sky)"/>
        <rect x={0} y={134} width={280} height={30} fill="#140a02"/>

        {/* 충돌 플래시 */}
        {phase===2 && <circle cx={140} cy={84} r={55} fill="white" style={{animation:"flashOut .25s ease both"}}/>}

        {/* 지층 */}
        {phase<=1
          ? flatRects.map((l,i)=><rect key={i} x={0} y={l.y} width={280} height={l.h} fill={layerColors[i]}/>)
          : vPaths.map((p,i)=><path key={i} d={p} fill={layerColors[i]}/>)
        }

        {/* 주변 지층 들림 힌트 */}
        {phase>=3 && <>
          <path d="M100,70 Q88,56 76,70" fill="none" stroke="#9b8060" strokeWidth={2} style={{animation:"archHint .4s ease both"}}/>
          <path d="M180,70 Q192,56 204,70" fill="none" stroke="#9b8060" strokeWidth={2} style={{animation:"archHint .4s ease both"}}/>
        </>}

        {/* 화산탄 */}
        {phase!==2 && (
          <g style={{
            transform:`translateY(${bombY}px)`,
            transition: phase===1 ? "transform .65s cubic-bezier(.4,0,.9,1)" : "none"
          }}>
            <circle cx={140} cy={0} r={13} fill="#252525"/>
            <circle cx={135} cy={-4} r={3.5} fill="#3a3a3a" opacity={.45}/>
            {/* 도화선 */}
            <path d="M140,-13 Q149,-22 145,-30" fill="none" stroke="#8b6914" strokeWidth={2.2} strokeLinecap="round"/>
            {phase===0 && <circle cx={145} cy={-30} r={3.5} fill="#f97316" style={{animation:"fuseFlicker .55s ease-in-out infinite"}}/>}
          </g>
        )}
        {/* 박힌 화산탄 */}
        {phase>=3 && <>
          <circle cx={140} cy={90} r={11} fill="#252525"/>
          <circle cx={136} cy={87} r={3} fill="#3a3a3a" opacity={.35}/>
        </>}

        {/* 단계 안내 */}
        <text x={8} y={15} fontSize={8} fill="#7dd3fc" opacity={.7} fontWeight="bold">
          {["① 화산탄 상승","② 낙하 중...","③ 충돌!","④ V자 탄낭 구조 형성"][phase]}
        </text>
        {phase>=3 && <text x={100} y={152} fontSize={7} fill="#c4a882" opacity={.6}>탄낭(bomb sag) 구조</text>}
      </svg>
    </AnimBox>
  );
}

/* ─── 3. 연흔 구조: 파도 → 퇴적물 물결 자국 ────── */
function RippleAnim() {
  return (
    <AnimBox>
      <style>{`
        @keyframes waveShift{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}
        @keyframes ripGrow{0%,100%{opacity:.35;transform:scaleY(.55)}50%{opacity:.85;transform:scaleY(1)}}
        @keyframes shimmer{0%,100%{opacity:.12}50%{opacity:.28}}
        @keyframes arrowBob{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{display:"block"}}>
        <defs>
          <linearGradient id="rip-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0369a1" stopOpacity=".65"/>
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity=".92"/>
          </linearGradient>
          <linearGradient id="rip-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9a7e50"/>
            <stop offset="100%" stopColor="#5c4a2a"/>
          </linearGradient>
          <clipPath id="rip-wclip"><rect x={0} y={0} width={280} height={88}/></clipPath>
          <marker id="rip-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#7dd3fc" opacity=".55"/>
          </marker>
        </defs>

        <rect width="280" height="164" fill="#040c18"/>

        {/* 퇴적물 */}
        <rect x={0} y={98} width={280} height={66} fill="url(#rip-sand)"/>

        {/* 연흔 능선 */}
        {[0,40,80,120,160,200,240].map((x,i)=>(
          <g key={i} style={{animation:`ripGrow 2.2s ease-in-out ${i*.28}s infinite`}}>
            <path d={`M${x},98 Q${x+20},90 ${x+40},98`} fill="none" stroke="#c9a87a" strokeWidth={2.8}/>
          </g>
        ))}
        <text x={8} y={113} fontSize={7} fill="#d4b896" opacity={.6}>퇴적물 (물결 능선)</text>

        {/* 물 */}
        <rect x={0} y={0} width={280} height={96} fill="url(#rip-water)" opacity={.88}/>

        {/* 파도 레이어 3겹 */}
        {[0,1,2].map(layer=>(
          <g key={layer} clipPath="url(#rip-wclip)"
            style={{animation:`waveShift ${1.9+layer*.42}s linear ${layer*.5}s infinite`}}>
            {[-80,0,80,160,240,320].map((x,i)=>(
              <path key={i}
                d={`M${x},${84-layer*7} Q${x+20},${77-layer*7} ${x+40},${84-layer*7} Q${x+60},${91-layer*7} ${x+80},${84-layer*7}`}
                fill="none" stroke={`rgba(147,210,240,${.42-layer*.1})`} strokeWidth={1.6+layer*.5}/>
            ))}
          </g>
        ))}

        {/* 빛 반짝임 */}
        {[50,130,210].map((x,i)=>(
          <ellipse key={i} cx={x} cy={38+i*12} rx={18} ry={5} fill="white"
            style={{animation:`shimmer ${1.6+i*.5}s ease-in-out ${i*.4}s infinite`}}/>
        ))}

        {/* 파도 방향 화살표 */}
        <g style={{animation:"arrowBob 1s ease-in-out infinite"}}>
          <line x1={22} y1={52} x2={56} y2={52} stroke="#7dd3fc" strokeWidth={1.5} opacity={.55} markerEnd="url(#rip-arrow)"/>
        </g>
        <text x={62} y={56} fontSize={7} fill="#7dd3fc" opacity={.5}>파도 방향</text>
        <text x={8} y={14} fontSize={8} fill="#7dd3fc" opacity={.7} fontWeight="bold">🌊 파도가 퇴적물 표면에 물결 자국 형성</text>
      </svg>
    </AnimBox>
  );
}

/* ─── 4. 해식애: 파도 침식 → 절벽 후퇴 ─────────── */
function SeaCliffAnim() {
  const [phase, setPhase] = useState(0);
  const dur = [2000, 3200, 700, 2200];
  useEffect(()=>{
    const t = setTimeout(()=>setPhase(p=>(p+1)%4), dur[phase]);
    return ()=>clearTimeout(t);
  },[phase]);

  const notch = phase>=1 ? (phase===1 ? 28 : 22) : 0;

  return (
    <AnimBox>
      <style>{`
        @keyframes waveRoll{0%{transform:translateX(-110px);opacity:0}35%{opacity:.9}75%{transform:translateX(55px);opacity:.55}100%{transform:translateX(75px);opacity:0}}
        @keyframes collapseDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(35px);opacity:0}}
        @keyframes sprayOut{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--sx),var(--sy));opacity:0}}
        @keyframes notchGrow{from{width:0}to{width:28px}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{display:"block"}}>
        <defs>
          <linearGradient id="sc-ocean" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0369a1"/><stop offset="100%" stopColor="#0c4a6e"/>
          </linearGradient>
          <linearGradient id="sc-cliff" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6b7280"/><stop offset="100%" stopColor="#4b5563"/>
          </linearGradient>
        </defs>

        <rect width="280" height="164" fill="#091525"/>

        {/* 파도들 */}
        {[0,1,2].map(i=>(
          <g key={i} style={{animation:`waveRoll ${2.1+i*.45}s ease-in-out ${i*.65}s infinite`}}>
            <path d={`M-30,${108+i*5} Q5,${100+i*5} 30,${108+i*5} Q55,${116+i*5} 80,${108+i*5} Q105,${100+i*5} 120,${108+i*5}`}
              fill={`rgba(147,210,240,${.52-i*.1})`}/>
          </g>
        ))}

        {/* 바다 */}
        <rect x={0} y={112} width={188} height={52} fill="url(#sc-ocean)" opacity={.72}/>

        {/* 절벽 본체 */}
        <rect x={188} y={8} width={92} height={156} fill="url(#sc-cliff)"/>

        {/* 절벽 지층선 */}
        {[28,50,72,92,112].map((y,i)=>(
          <line key={i} x1={188} y1={y} x2={280} y2={y}
            stroke={i%2===0?"#9b8060":"#3d2810"} strokeWidth={8} opacity={.35}/>
        ))}

        {/* 해식 노치 */}
        {notch>0 && (
          <rect x={188} y={110} width={notch} height={26} fill="#091525"
            style={phase===1?{animation:"notchGrow 3s ease-out both"}:{}}/>
        )}

        {/* 상부 붕괴 */}
        {phase===2 && <>
          <rect x={188} y={8} width={28} height={102} fill="#6b7280"
            style={{animation:"collapseDown .65s ease-in both"}}/>
          {[...Array(7)].map((_,i)=>(
            <circle key={i} cx={202} cy={112} r={2.5} fill="#94a3b8"
              style={{"--sx":`${(i-3)*16}px`,"--sy":`${-(i%3+1)*18}px`,
                animation:"sprayOut .6s ease-out both"}}/>
          ))}
        </>}

        {/* 해수면 선 */}
        <line x1={0} y1={112} x2={188} y2={112} stroke="#7dd3fc" strokeWidth={.8} opacity={.38} strokeDasharray="4,3"/>

        <text x={190} y={22} fontSize={7} fill="#e2e8f0" opacity={.45}>해식애</text>
        <text x={8} y={14} fontSize={8} fill="#7dd3fc" opacity={.7} fontWeight="bold">
          {["① 파도가 절벽 기저부 반복 타격","② 해식 노치(파식동) 형성 중","③ 상부 암석 붕괴!","④ 절벽이 내륙으로 후퇴"][phase]}
        </text>
      </svg>
    </AnimBox>
  );
}

/* ─── 5. 녹고의 눈물: 지하수 침투 → 절벽 용출 ──── */
function NokgoTearAnim() {
  return (
    <AnimBox>
      <style>{`
        @keyframes rainFall{0%{transform:translateY(-8px);opacity:.75}100%{transform:translateY(40px);opacity:0}}
        @keyframes seepDown{0%{transform:translateY(0);opacity:.85}100%{transform:translateY(22px);opacity:0}}
        @keyframes dripDrop{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(44px);opacity:0}}
        @keyframes poolPulse{0%,100%{transform:scaleX(1);opacity:.45}50%{transform:scaleX(1.08);opacity:.65}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{display:"block"}}>
        <defs>
          <linearGradient id="ng-perm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a3520" stopOpacity=".75"/>
            <stop offset="100%" stopColor="#3a2a14" stopOpacity=".95"/>
          </linearGradient>
          <linearGradient id="ng-imp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#374151"/><stop offset="100%" stopColor="#1f2937"/>
          </linearGradient>
          <pattern id="ng-dots" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="4.5" cy="4.5" r="1.8" fill="#7b5e38" opacity=".45"/>
          </pattern>
          <pattern id="ng-imp-hatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="8" x2="8" y2="0" stroke="#4b5563" strokeWidth="1.5" opacity=".5"/>
          </pattern>
        </defs>

        <rect width="280" height="164" fill="#040c18"/>

        {/* 지표면 (하늘) */}
        <rect x={0} y={0} width={228} height={32} fill="#091a2e"/>
        {/* 빗방울 */}
        {[18,48,78,108,138,168,198].map((x,i)=>(
          <ellipse key={i} cx={x} cy={8} rx={1.4} ry={4} fill="#7dd3fc" opacity={.65}
            style={{animation:`rainFall 1.35s linear ${i*.2}s infinite`}}/>
        ))}
        <text x={4} y={26} fontSize={7} fill="#7dd3fc" opacity={.5}>빗물</text>

        {/* 지표선 */}
        <line x1={0} y1={32} x2={228} y2={32} stroke="#7dd3fc" strokeWidth={.8} opacity={.3} strokeDasharray="3,3"/>

        {/* 투수층 */}
        <rect x={0} y={32} width={228} height={50} fill="url(#ng-perm)"/>
        <rect x={0} y={32} width={228} height={50} fill="url(#ng-dots)"/>
        <text x={4} y={60} fontSize={7} fill="#c4a882" opacity={.65}>투수층 (화산재 — 물이 스며듦)</text>

        {/* 스며드는 물 */}
        {[30,68,108,148,188].map((x,i)=>(
          <ellipse key={i} cx={x} cy={38} rx={1.4} ry={3.8} fill="#38bdf8" opacity={.72}
            style={{animation:`seepDown 1.7s linear ${i*.28}s infinite`}}/>
        ))}

        {/* 불투수층 */}
        <rect x={0} y={82} width={228} height={22} fill="url(#ng-imp)"/>
        <rect x={0} y={82} width={228} height={22} fill="url(#ng-imp-hatch)"/>
        <text x={4} y={97} fontSize={7} fill="#94a3b8" opacity={.65}>불투수층 (치밀한 지층 — 차단)</text>

        {/* 경계 축적 물 */}
        <ellipse cx={114} cy={82} rx={102} ry={4.5} fill="#0ea5e9" opacity={.5}
          style={{animation:"poolPulse 2.2s ease-in-out infinite"}}/>

        {/* 절벽 단면 */}
        <rect x={228} y={0} width={52} height={164} fill="#374151"/>
        {[18,40,62,82,102,122,142].map((y,i)=>(
          <line key={i} x1={228} y1={y} x2={280} y2={y}
            stroke={i%2===0?"#9b8060":"#3d2810"} strokeWidth={8} opacity={.3}/>
        ))}
        <text x={230} y={158} fontSize={7} fill="#94a3b8" opacity={.45}>절벽</text>

        {/* 용출 지점 */}
        <circle cx={228} cy={86} r={5} fill="#0ea5e9" opacity={.85}/>

        {/* 떨어지는 물방울 */}
        {[0,1,2,3].map(i=>(
          <ellipse key={i} cx={220-i*3} cy={88} rx={2.2} ry={3.5} fill="#38bdf8" opacity={.8}
            style={{animation:`dripDrop 1.3s ease-in ${i*.32}s infinite`}}/>
        ))}

        <text x={4} y={14} fontSize={8} fill="#38bdf8" opacity={.75} fontWeight="bold">
          💧 지하수가 불투수층 경계에서 절벽 밖으로 용출
        </text>
      </svg>
    </AnimBox>
  );
}

/* ─── 6. 일제 진지동굴: 응회암 굴착 ────────────── */
function JapCaveAnim() {
  const [phase, setPhase] = useState(0);
  const dur = [900, 900, 900, 2400];
  useEffect(()=>{
    const t = setTimeout(()=>setPhase(p=>(p+1)%4), dur[phase]);
    return ()=>clearTimeout(t);
  },[phase]);

  const rx = [0, 18, 30, 42][phase];
  const ry = [0, 14, 24, 34][phase];

  return (
    <AnimBox>
      <style>{`
        @keyframes pickSwing{0%,100%{transform:rotate(-22deg)}50%{transform:rotate(22deg)}}
        @keyframes chipFly{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--cx),var(--cy));opacity:0}}
        @keyframes torchFlicker{0%,100%{opacity:.55}50%{opacity:1}}
        @keyframes dustDrift{0%{transform:translateX(0);opacity:.5}100%{transform:translateX(20px);opacity:0}}
      `}</style>
      <svg viewBox="0 0 280 164" className="w-full h-full" style={{display:"block"}}>
        <defs>
          <linearGradient id="jc-rock" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4b5563"/><stop offset="100%" stopColor="#374151"/>
          </linearGradient>
          <radialGradient id="jc-cave" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a0d04" stopOpacity=".9"/>
            <stop offset="100%" stopColor="#000" stopOpacity="1"/>
          </radialGradient>
          <radialGradient id="jc-torch" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity=".45"/>
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* 암반 전면 */}
        <rect width="280" height="164" fill="url(#jc-rock)"/>
        {/* 응회암 지층 */}
        {[18,42,66,90,114,138].map((y,i)=>(
          <line key={i} x1={0} y1={y} x2={280} y2={y}
            stroke={i%2===0?"#9b8060":"#3d2810"} strokeWidth={10} opacity={.22}/>
        ))}

        {/* 동굴 입구 */}
        {rx>0 && <>
          <ellipse cx={140} cy={92} rx={rx} ry={ry} fill="url(#jc-cave)"/>
          {/* 깊이감 링 */}
          {rx>18 && <ellipse cx={140} cy={92} rx={rx*.68} ry={ry*.65} fill="none" stroke="rgba(0,0,0,.45)" strokeWidth={3}/>}
          {rx>30 && <ellipse cx={140} cy={92} rx={rx*.38} ry={ry*.35} fill="none" stroke="rgba(0,0,0,.3)" strokeWidth={2}/>}
        </>}

        {/* 횃불 빛 (완성 단계) */}
        {phase===3 && <>
          <ellipse cx={140} cy={92} rx={rx*2.2} ry={ry*2} fill="url(#jc-torch)"
            style={{animation:"torchFlicker .55s ease-in-out infinite"}}/>
          <circle cx={140} cy={92} r={5} fill="#f97316" opacity={.9}
            style={{animation:"torchFlicker .45s ease-in-out infinite"}}/>
        </>}

        {/* 곡괭이 */}
        {phase<3 && (
          <g transform={`translate(${140+rx+2},${92-ry*.2})`}
            style={{animation:"pickSwing .9s ease-in-out infinite", transformOrigin:"0 0"}}>
            <line x1={0} y1={0} x2={20} y2={-14} stroke="#c4a882" strokeWidth={3} strokeLinecap="round"/>
            <line x1={20} y1={-14} x2={26} y2={-8} stroke="#7b5e38" strokeWidth={6} strokeLinecap="round"/>
          </g>
        )}

        {/* 암석 파편 */}
        {phase<3 && [...Array(6)].map((_,i)=>(
          <circle key={i} cx={140+rx+4} cy={92-ry*.15} r={2+(i%2)} fill="#9b8060"
            style={{"--cx":`${(i-2.5)*14}px`,"--cy":`${-(i%3+1)*14}px`,
              animation:`chipFly .9s ease-out ${i*.1}s infinite`}}/>
        ))}
        {/* 먼지 */}
        {phase<3 && [0,1,2].map(i=>(
          <circle key={i} cx={140+rx+8} cy={92} r={3+i} fill="#94a3b8" opacity={.25}
            style={{animation:`dustDrift ${1+i*.3}s ease-out ${i*.25}s infinite`}}/>
        ))}

        <text x={8} y={15} fontSize={8} fill="#fbbf24" opacity={.75} fontWeight="bold">
          {["① 응회암 굴착 시작 (무른 암석)","② 수직갱 확장 중","③ 내부 굴착 중","④ 진지동굴 완성"][phase]}
        </text>
        <text x={8} y={157} fontSize={7} fill="#9b8060" opacity={.5}>
          응회암: 화산재가 굳은 암석, 강도 낮아 굴착 용이
        </text>
      </svg>
    </AnimBox>
  );
}
