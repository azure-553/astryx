import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{F as r,P as i}from"./ime-Dy4QRKoo.js";import{t as a}from"./jsx-runtime-DqZldVDK.js";import{t as o}from"./Text-CUw_qAJO.js";import{t as s}from"./Button-CpBrZi1Q.js";import{t as c}from"./Button-BdM_Mlh9.js";import{h as l,t as u}from"./hooks-CkLzhh1G.js";import{i as d,o as f}from"./Stack-Dntpv-r2.js";import{t as p}from"./Layout-C0lADRwM.js";import{t as m}from"./Text-B194cPHg.js";function h({label:e,paragraphs:t}){return(0,v.jsx)(`div`,{ref:l(),"aria-label":e,className:`xhjk10j x1dz1jew xysyzu8 x1b2ylru xmkeg23 x1y0btm7 x14i3s5s x1hviunn x1de1mus`,children:(0,v.jsx)(d,{gap:2,children:Array.from({length:t},(t,n)=>(0,v.jsxs)(o,{children:[e,` — paragraph `,n+1,`.`]},n))})})}function g({label:e,overflow:t}){return(0,v.jsx)(`div`,{ref:l(),"aria-label":e,...r(y.scroller,x.overflow(t)),children:(0,v.jsx)(d,{gap:2,children:Array.from({length:12},(e,t)=>(0,v.jsxs)(o,{children:[`Paragraph `,t+1,`.`]},t))})})}var _,v,y,b,x,S,C,w,T,E,D;e((()=>{_=t(n()),i(),u(),c(),m(),p(),v=a(),y={scroller:{kZKoxP:`xhjk10j`,kzqmXN:`x1dz1jew`,kVQacm:`xysyzu8`,kmVPX3:`x1b2ylru`,kMzoRj:`xmkeg23`,ksu8eU:`x1y0btm7`,kVAM5u:`x14i3s5s`,kaIpWk:`x1hviunn`,kWkggS:`x1de1mus`,$$css:!0}},b={kXHlph:``,kORKVm:``,$$css:!0},x={overflow:e=>[b,{kVQacm:e==null?e:`x1i54egk`,$$css:!0},{"--x-overflow":e??void 0}]},S={title:`Hooks/useScrollableTabStop`,tags:[`autodocs`],decorators:[e=>(0,v.jsx)(`div`,{className:`x1gt495 x1eiddq6`,children:(0,v.jsx)(e,{})})]},C={render:()=>(0,v.jsxs)(f,{gap:6,children:[(0,v.jsx)(h,{label:`Overflowing region`,paragraphs:12}),(0,v.jsx)(h,{label:`Region that fits`,paragraphs:1})]})},w={render:function(){let[e,t]=(0,_.useState)(1),n=l();return(0,v.jsxs)(d,{gap:3,children:[(0,v.jsxs)(f,{gap:2,children:[(0,v.jsx)(s,{label:`Add content`,onClick:()=>t(e=>e+3)}),(0,v.jsx)(s,{label:`Reset`,variant:`secondary`,onClick:()=>t(1)})]}),(0,v.jsx)(`div`,{ref:n,"aria-label":`Growing region`,className:`xhjk10j x1dz1jew xysyzu8 x1b2ylru xmkeg23 x1y0btm7 x14i3s5s x1hviunn x1de1mus`,children:(0,v.jsx)(d,{gap:2,children:Array.from({length:e},(e,t)=>(0,v.jsxs)(o,{children:[`Paragraph `,t+1,`.`]},t))})})]})}},T={render:()=>(0,v.jsxs)(f,{gap:6,children:[(0,v.jsx)(g,{label:`overflow: auto`,overflow:`auto`}),(0,v.jsx)(g,{label:`overflow: hidden`,overflow:`hidden`}),(0,v.jsx)(g,{label:`overflow: clip`,overflow:`clip`})]})},E={render:function(){let[e,t]=(0,_.useState)(!0),n=l({enabled:e});return(0,v.jsxs)(d,{gap:3,children:[(0,v.jsx)(s,{label:e?`Disable the hook`:`Enable the hook`,onClick:()=>t(e=>!e)}),(0,v.jsx)(`div`,{ref:n,"aria-label":`Gated region`,className:`xhjk10j x1dz1jew xysyzu8 x1b2ylru xmkeg23 x1y0btm7 x14i3s5s x1hviunn x1de1mus`,children:(0,v.jsx)(d,{gap:2,children:Array.from({length:12},(e,t)=>(0,v.jsxs)(o,{children:[`Paragraph `,t+1,`.`]},t))})})]})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={6}>
      <ScrollRegion label="Overflowing region" paragraphs={12} />
      <ScrollRegion label="Region that fits" paragraphs={1} />
    </HStack>
}`,...C.parameters?.docs?.source},description:{story:`Two regions with identical styling. The left one overflows and takes a tab
stop; the right one fits and stays out of the tab order.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function GrowingRegion() {
    const [paragraphs, setParagraphs] = useState(1);
    const scrollRef = useScrollableTabStop();
    return <VStack gap={3}>
        <HStack gap={2}>
          <Button label="Add content" onClick={() => setParagraphs(count => count + 3)} />
          <Button label="Reset" variant="secondary" onClick={() => setParagraphs(1)} />
        </HStack>
        <div ref={scrollRef} aria-label="Growing region" {...stylex.props(styles.scroller)}>
          <VStack gap={2}>
            {Array.from({
            length: paragraphs
          }, (_, index) => <Text key={index}>Paragraph {index + 1}.</Text>)}
          </VStack>
        </div>
      </VStack>;
  }
}`,...w.parameters?.docs?.source},description:{story:`The tab stop follows the content. Add paragraphs until the region overflows
and it becomes reachable; remove them and it drops out of the tab order
again — no re-render is involved in either direction.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={6}>
      <ClippingRegion label="overflow: auto" overflow="auto" />
      <ClippingRegion label="overflow: hidden" overflow="hidden" />
      <ClippingRegion label="overflow: clip" overflow="clip" />
    </HStack>
}`,...T.parameters?.docs?.source},description:{story:`Overflowing is not the same as scrollable. All three of these boxes have
more content than height; only the first can be scrolled. The hook checks
the computed overflow per axis, so the clipping two stay out of the tab
order rather than becoming stops the arrow keys do not answer.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function GatedRegion() {
    const [isScrollable, setIsScrollable] = useState(true);
    const scrollRef = useScrollableTabStop({
      enabled: isScrollable
    });
    return <VStack gap={3}>
        <Button label={isScrollable ? 'Disable the hook' : 'Enable the hook'} onClick={() => setIsScrollable(value => !value)} />
        <div ref={scrollRef} aria-label="Gated region" {...stylex.props(styles.scroller)}>
          <VStack gap={2}>
            {Array.from({
            length: 12
          }, (_, index) => <Text key={index}>Paragraph {index + 1}.</Text>)}
          </VStack>
        </div>
      </VStack>;
  }
}`,...E.parameters?.docs?.source},description:{story:"`enabled` gates the hook on whatever makes the element a scroll container,\nso nothing is measured or observed for a container that cannot scroll.",...E.parameters?.docs?.description}}},D=[`OverflowingAndFitting`,`AppearsWhenContentGrows`,`OnlyWhatCanActuallyScroll`,`GatedByEnabled`]}))();export{w as AppearsWhenContentGrows,E as GatedByEnabled,T as OnlyWhatCanActuallyScroll,C as OverflowingAndFitting,D as __namedExportsOrder,S as default};