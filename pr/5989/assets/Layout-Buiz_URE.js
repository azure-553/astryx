import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{D as r,E as i,F as a,P as o}from"./ime-Dy4QRKoo.js";import{i as s,r as c}from"./LayoutHeader-C7Itb1EI.js";import{i as l,n as u,r as d,t as f}from"./stackItem.stylex-GHZ4wVym.js";import{P as p,i as m,o as h,t as g}from"./utils-eYNPhPe_.js";import{l as _,t as v}from"./i18n-Cx-Q5UQa.js";import{t as y}from"./jsx-runtime-DqZldVDK.js";import{a as b,c as x,g as S,n as C,o as w,s as T,t as E}from"./padding.stylex-Hr1weLfK.js";var D,O,k=e((()=>{D=t(n(),1),O=(0,D.createContext)(null),O.displayName=`LayoutAreaContext`})),A,j,M,N=e((()=>{A=t(n(),1),j={hasHeader:!1,hasFooter:!1,hasStart:!1,hasEnd:!1,hasMiddleScroll:!1},M=(0,A.createContext)(j),M.displayName=`LayoutSlotsContext`}));function P({children:e,isScrollable:t=!0,padding:n,label:i,role:o,xstyle:s,className:c,style:l,ref:u,...d}){let{hasHeader:f,hasFooter:m,hasStart:h,hasEnd:g,hasMiddleScroll:_}=(0,F.use)(M),v=n===0,y=_&&!t;return(0,I.jsx)(`div`,{ref:u,role:o,"aria-label":i,...p(r(`layout-content`),a(L.content,!h&&!v&&n==null&&L.noStart,!g&&!v&&n==null&&L.noEnd,!f&&!v&&n==null&&L.noHeader,!m&&!v&&n==null&&L.noFooter,t&&L.scrollable,y&&L.sharedScrollParticipant,v&&L.fullBleed,n!=null&&S[n],n!=null&&b[n],n!=null&&C[n],n!=null&&E[n],s),c,l),...d,children:e})}var F,I,L,R=e((()=>{F=t(n(),1),o(),N(),g(),i(),w(),I=y(),L={content:{kB7OPa:`astryx9f619`,kZKoxP:`astryx5yr21d`,kUk6DE:`astryx98rzlu`,kAzted:`astryx2lwn1j`,kVQacm:`astryx7giv3`,kZCmMZ:`astryxwjyata`,kwRFfy:`astryx1peupej`,kLKAdn:`astryxqty4a astryx1u0vwcr`,kGO01o:`astryxg476vw astryx307h6p`,"--container-padding-inline-start":`astryx408pgh`,"--container-padding-inline-end":`astryxikqloz`,"--container-padding-block-start":`astryxjmgx01`,"--container-padding-block-end":`astryxi9ns85`,$$css:!0},noStart:{kZCmMZ:`astryx139j0dd`,"--container-padding-inline-start":`astryxdvaxxn`,"--container-padding-inline-end":`astryxqpvj4r`,$$css:!0},noEnd:{kwRFfy:`astryxpc6k2p`,$$css:!0},noHeader:{kLKAdn:`astryx81pis9`,"--container-padding-block-start":`astryxzz8v79`,$$css:!0},noFooter:{kGO01o:`astryxon7vh3`,"--container-padding-block-end":`astryx1xjq73n`,$$css:!0},scrollable:{kVQacm:`astryxysyzu8`,$$css:!0},sharedScrollParticipant:{kZKoxP:`astryxt7dq6l`,kAzted:`astryx1us19tq`,kVQacm:`astryx1rea2x4`,$$css:!0},fullBleed:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kLKAdn:`astryxexx8yu`,kGO01o:`astryx18d9i69`,"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0}},P.displayName=`LayoutContent`,P.__docgenInfo={description:`Scrollable main content area for Layout. Wraps the primary body content
with automatic scroll containment and context-aware padding.

Provides context-aware padding and either owns an independent scrollport or
participates in its fill-height Layout's middle scrollport. Don't add padding
or overflow to children. Use \`padding={0}\` if you need edge-to-edge content.

@example
\`\`\`
<LayoutContainer variant="card">
  <Layout
    header={<LayoutHeader>Title</LayoutHeader>}
    content={<LayoutContent>Main body content</LayoutContent>}
  />
</LayoutContainer>
<LayoutContainer variant="card">
  <Layout
    content={
      <LayoutContent padding={0}>
        <Table />
      </LayoutContent>
    }
  />
</LayoutContainer>
<LayoutContainer variant="card">
  <Layout
    content={
      <LayoutContent isScrollable={false}>
        <StickyElement />
      </LayoutContent>
    }
  />
</LayoutContainer>
\`\`\``,methods:[],displayName:`LayoutContent`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the content area.`},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Internal padding of the content area using the spacing scale.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
Overrides the default padding from the layout container.`},isScrollable:{required:!1,tsType:{name:`boolean`},description:`Controls whether this region owns an independent scrollport.
- \`true\`: this content area scrolls independently (default).
- \`false\`: in a fill-height Layout, this region moves with the Layout's
  middle scrollport; in an auto-height Layout, the page/ancestor scrolls.
@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the landmark.
Required when role is set and multiple landmarks of the same type exist.`},role:{required:!1,tsType:{name:`AriaRole`},description:`ARIA landmark role for accessibility.
Use 'main' only for the primary content area of the page (not in nested layouts).`}},composes:[`Omit`]}}));function z({children:e,hasDivider:t=!1,isScrollable:n=!0,label:i,padding:o,role:s,width:c,resizable:l,xstyle:u,className:d,style:f,ref:m,...h}){let g=(0,B.use)(O),{hasHeader:_,hasFooter:v,hasMiddleScroll:y}=(0,B.use)(M),x=l?l._size:c,w=g===`start`,T=g===`end`,D=o===0,k=!t&&!D&&o==null,A=w?H.dividerEnd:T?H.dividerStart:null,j=w?H.collapseEnd:T?H.collapseStart:null;return(0,V.jsx)(`div`,{ref:m,role:s,"aria-label":i,...p(r(`layout-panel`),a(H.panel,U.sizing(x??null),w&&!D&&o==null&&H.startPanel,T&&!D&&o==null&&H.endPanel,!_&&!D&&o==null&&H.noHeader,!v&&!D&&o==null&&H.noFooter,n&&H.scrollable,y&&n&&H.pinnedInMiddleScroll,y&&!n&&H.sharedScrollParticipant,D&&H.fullBleed,o!=null&&S[o],o!=null&&b[o],o!=null&&C[o],o!=null&&E[o],t&&A,k&&j,u),d,f),...h,children:e})}var B,V,H,U,W=e((()=>{B=t(n(),1),o(),k(),N(),g(),i(),w(),V=y(),H={panel:{kB7OPa:`astryx9f619`,kmuXW:`astryx2lah0s`,kVQacm:`astryx7giv3`,kZCmMZ:`astryxwjyata`,kwRFfy:`astryx1peupej`,kLKAdn:`astryxqty4a`,kGO01o:`astryxg476vw`,"--container-padding-inline-start":`astryx408pgh`,"--container-padding-inline-end":`astryxikqloz`,"--container-padding-block-start":`astryxjmgx01`,"--container-padding-block-end":`astryxi9ns85`,$$css:!0},startPanel:{kZCmMZ:`astryx139j0dd`,kE3dHu:null,kpe85a:null,$$css:!0},endPanel:{kwRFfy:`astryxpc6k2p`,kE3dHu:null,kpe85a:null,$$css:!0},noHeader:{kLKAdn:`astryx81pis9`,$$css:!0},noFooter:{kGO01o:`astryxon7vh3`,$$css:!0},fullBleed:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kE3dHu:null,kpe85a:null,kLKAdn:`astryxexx8yu`,kGO01o:`astryx18d9i69`,"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0},scrollable:{kVQacm:`astryxysyzu8`,kXHlph:null,kORKVm:null,$$css:!0},pinnedInMiddleScroll:{kSGwAc:`astryxqcrz7y`,kZKoxP:`astryx5yr21d`,kVAEAm:`astryx7wzq59`,k87sOh:`astryx13vifvy`,$$css:!0},sharedScrollParticipant:{kVQacm:`astryx1rea2x4`,kXHlph:null,kORKVm:null,$$css:!0},dividerEnd:{ke9TFa:`astryx1lun4ml`,kZ1KPB:null,kWqL5O:null,k8ry5P:`astryx18b5jzi`,k4WBpm:null,kSWEuD:null,kBCPoo:`astryx1gejf6u`,kaZRDh:null,k26BEO:null,$$css:!0},dividerStart:{k2ei4v:`astryxpilrb4`,kZ1KPB:null,kWqL5O:null,kVhnKS:`astryx1t7ytsu`,k4WBpm:null,kSWEuD:null,kGJrpR:`astryx1j92z86`,kaZRDh:null,k26BEO:null,$$css:!0},collapseStart:{keTefX:`astryx1wim8z0`,koQZXg:null,km5ZXQ:null,$$css:!0},collapseEnd:{k71WvV:`astryx1kpg4um`,koQZXg:null,km5ZXQ:null,$$css:!0}},U={sizing:e=>[{kzqmXN:e==null?e:`astryx5lhr3w`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}]},z.displayName=`LayoutPanel`,z.__docgenInfo={description:`Sidebar or side panel for Layout. Use in the \`start\` slot for left navigation
or in the \`end\` slot for detail/inspector panels.
Renders with optional divider and context-aware padding.
Divider position is auto-detected based on which slot the panel is in.

Provides context-aware padding and either owns an independent scrollport or
participates in its fill-height Layout's middle scrollport. Don't add padding
or overflow to children. Use \`padding={0}\` if you need edge-to-edge content.

@example
\`\`\`
<LayoutContainer variant="card">
  <Layout
    start={
      <LayoutPanel hasDivider role="navigation">
        <Navigation />
      </LayoutPanel>
    }
    content={<LayoutContent>Main content</LayoutContent>}
    end={
      <LayoutPanel hasDivider role="complementary">
        <Sidebar />
      </LayoutPanel>
    }
  />
</LayoutContainer>
\`\`\``,methods:[],displayName:`LayoutPanel`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the panel.`},hasDivider:{required:!1,tsType:{name:`boolean`},description:`Adds a themed border on the appropriate edge.
- Start panel: border on end edge (right in LTR)
- End panel: border on start edge (left in LTR)
When false, spacing collapse is applied automatically for seamless visual flow.

Note: When using \`resizable\` with an adjacent \`ResizeHandle hasDivider\`,
set this to \`false\` to avoid a double-line artifact.
@default false`,defaultValue:{value:`false`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Internal padding of the panel using the spacing scale.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
Overrides the default padding from the layout container.`},isScrollable:{required:!1,tsType:{name:`boolean`},description:`Controls whether this panel owns an independent scrollport.
- \`true\`: this panel stays pinned and scrolls independently (default).
- \`false\`: in a fill-height Layout, this panel moves with the Layout's
  middle scrollport; in an auto-height Layout, the page/ancestor scrolls.
@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the landmark.
Required when role is set and multiple landmarks of the same type exist.`},role:{required:!1,tsType:{name:`AriaRole`},description:`ARIA landmark role for accessibility.
Use 'navigation' or 'complementary' only for top-level layouts (not nested).`},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Width of the panel.
Numbers are treated as pixels, strings are used as-is.
When \`resizable\` is provided, this is ignored — the hook controls width.`},resizable:{required:!1,tsType:{name:`ResizableProps`},description:`Resize props from \`useResizable()\`. When provided, the panel width
is driven by the hook and a resize handle should be placed adjacent
to this panel.

@example
\`\`\`
const sidebar = useResizable({ defaultSize: 250, minSizePx: 200 });
<LayoutPanel resizable={sidebar.props}>
  <Navigation />
</LayoutPanel>
<ResizeHandle resizable={sidebar.props} />
\`\`\``}},composes:[`Omit`]}}));function ee(e){if(e==null||typeof e==`number`)return!0;let t=e.trim().toLowerCase();return t===`0`||/^-?(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%)$/.test(t)||/^(?:calc|min|max|clamp)\(/.test(t)}function G(e,t){return(0,Y.isValidElement)(e)&&e.type===t&&e.props.isScrollable===!1}function K(e,t){return(0,Y.isValidElement)(e)&&e.type===t?e.props.label:void 0}function q({area:e,children:t}){return t==null?null:(0,X.jsx)(O,{value:e,children:t})}function J({children:e,content:t,contentWidth:n,defaultHasDividers:i,end:o,footer:s,header:d,height:f=`fill`,padding:h,ref:g,start:v,xstyle:y,className:b,style:S}){let C=_(),w=f===`fill`,E=t??e,D=(0,Y.useMemo)(()=>i==null?null:{defaultHasDividers:i},[i]),O=d!=null,k=s!=null,A=v!=null,j=o!=null,N=G(v,z),F=G(E,P),I=G(o,z),L=w&&(N||F||I),R=L&&ee(n),B=L&&(0,Y.isValidElement)(E)&&E.type===P&&E.props.isScrollable!==!1,V=(N?K(v,z):void 0)??(F?K(E,P):void 0)??(I?K(o,z):void 0)??C(`@astryx.layout.middleScrollRegion`),H=(0,Y.useMemo)(()=>({hasHeader:O,hasFooter:k,hasStart:A,hasEnd:j,hasMiddleScroll:L}),[O,k,A,j,L]),U=[...l({direction:`horizontal`}),Z.middle,L&&Z.middleScrollable,R&&Z.middleScrollableExpanded],W=L?m.focusVisible(...U):a(...U),J=(0,X.jsx)(M,{value:H,children:(0,X.jsx)(`div`,{ref:g,...p(r(`layout`,{height:f}),a(Z.layoutOuter,w?Z.fill:Z.auto,y),b,S),children:(0,X.jsxs)(`div`,{...a($,Z.layoutInner,...l({direction:`vertical`}),w?Z.fill:Z.auto,h===0&&Z.fullBleed,h!=null&&T[h],h!=null&&x[h],n!=null&&Q.contentWidthVar(n)),children:[(0,X.jsx)(q,{area:`header`,children:d}),(0,X.jsxs)(`div`,{tabIndex:L?0:void 0,role:L?`group`:void 0,"aria-label":L?V:void 0,...W,children:[(0,X.jsx)(q,{area:`start`,children:v}),(0,X.jsx)(`div`,{...a(...u({size:`fill`}),B&&Z.contentLanePinned),children:(0,X.jsx)(q,{area:`content`,children:E})}),(0,X.jsx)(q,{area:`end`,children:o})]}),(0,X.jsx)(q,{area:`footer`,children:s})]})})});return D==null?J:(0,X.jsx)(c,{value:D,children:J})}var Y,X,Z,Q,$,te=e((()=>{Y=t(n(),1),o(),k(),N(),s(),d(),f(),g(),i(),h(),v(),R(),W(),w(),X=y(),Z={layoutOuter:{keTefX:`astryxojxgvx`,k71WvV:`astryx1fcf3bl`,keoZOQ:`astryx1sa9bsh`,k1K539:`astryx6h7pi7`,$$css:!0},layoutInner:{"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0},fill:{kZKoxP:`astryx12qplqi`,kskxy:`astryxenllk4`,$$css:!0},auto:{kAzted:`astryx1us19tq`,$$css:!0},middle:{kB7OPa:`astryx9f619`,kUk6DE:`astryx98rzlu`,kzQI83:null,kmuXW:null,kCS8Yb:null,kAzted:`astryx2lwn1j`,kzqmXN:`astryxh8yej3`,ks0D6T:`astryxjl2t3p`,kUOVxO:`astryxvueqy4`,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,$$css:!0},middleScrollable:{kVQacm:`astryxysyzu8`,kXHlph:null,kORKVm:null,$$css:!0},middleScrollableExpanded:{ks0D6T:`astryx1x1rfll`,kZCmMZ:`astryxyphv3q`,kwRFfy:`astryx1fe2ux5`,kE3dHu:null,kpe85a:null,$$css:!0},contentLanePinned:{kSGwAc:`astryxqcrz7y`,kZKoxP:`astryx5yr21d`,kVAEAm:`astryx7wzq59`,k87sOh:`astryx13vifvy`,$$css:!0},fullBleed:{"--layout-padding-outer-x":`astryx1wbjvqu`,"--layout-padding-outer-y":`astryxzxxx64`,$$css:!0}},Q={contentWidthVar:e=>[{"--layout-content-width":(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryx4906uf`,$$css:!0},{"--x---layout-content-width":(typeof e==`number`?`${e}px`:e)==null?void 0:typeof e==`number`?`${e}px`:e}]},$={"astryx-default-marker":`astryx-default-marker`,$$css:!0},J.displayName=`Layout`,J.__docgenInfo={description:`General layout primitive with header, start, content, end, and footer slots.
Use it to arrange regions within a page or bounded container. AppShell owns
the page shell, app-wide navigation, responsive shell behavior, skip link,
and main landmark.

Handles padding collapse between adjacent slots, scroll containment in the
content area, and automatic RTL support via CSS logical properties.

Structure:
\`\`\`
┌─────────────────────────────────────────┐
│                 header                  │
├──────┬─────────────────────────┬────────┤
│      │                         │        │
│start │        content          │  end   │
│      │                         │        │
├──────┴─────────────────────────┴────────┤
│                 footer                  │
└─────────────────────────────────────────┘
\`\`\`

When to use Layout vs raw flexbox:
- Page with a sidebar → Layout with \`start\` slot
- Dashboard with header + scrollable body → Layout with \`header\` + \`content\`
- Settings page with nav panel → Layout with \`start\` + \`content\`
- Simple vertical stack of items → use VStack instead

@example
\`\`\`
<Layout
  header={<LayoutHeader hasDivider>App Name</LayoutHeader>}
  start={
    <LayoutPanel hasDivider width={240} role="navigation">
      <Navigation />
    </LayoutPanel>
  }
  content={
    <LayoutContent role="main">
      <MainContent />
    </LayoutContent>
  }
/>
\`\`\``,methods:[],displayName:`Layout`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root DOM element.`},content:{required:!1,tsType:{name:`ReactNode`},description:`Main content area (center).`},contentWidth:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Maximum width of the aligned content within each slot (header, content,
footer, panels). Dividers remain full-bleed. Content is centered with
\`margin-inline: auto\` when narrower than the available space.

\`contentWidth\` always includes the complete start + content + end
composition. In a fill-height layout, regions with
\`isScrollable={false}\` move together in the middle scrollport while regions
with the default \`isScrollable={true}\` remain pinned and scroll
independently.

Numbers are treated as pixels, strings are used as-is (e.g., '60ch').
Common page widths:
- \`640\` — forms, settings, text-focused pages
- \`960\` — content pages, component demos, wider layouts`},end:{required:!1,tsType:{name:`ReactNode`},description:`End panel slot (right in LTR, left in RTL).`},footer:{required:!1,tsType:{name:`ReactNode`},description:`Footer slot.`},header:{required:!1,tsType:{name:`ReactNode`},description:`Header slot.`},height:{required:!1,tsType:{name:`union`,raw:`'fill' | 'auto'`,elements:[{name:`literal`,value:`'fill'`},{name:`literal`,value:`'auto'`}]},description:"Controls the height behavior:\n- `fill`: Layout fills container height, content scrolls internally (default)\n- `auto`: Layout grows with content, container/page scrolls\n@default 'fill'",defaultValue:{value:`'fill'`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:"Padding at the layout's outer edges using the spacing scale.\nControls both `--layout-padding-outer-x` and `--layout-padding-outer-y`.\nAccepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10."},start:{required:!1,tsType:{name:`ReactNode`},description:`Start panel slot (left in LTR, right in RTL).`},defaultHasDividers:{required:!1,tsType:{name:`boolean`},description:`Default divider visibility for LayoutHeader and LayoutFooter children.
When set, headers/footers that don't explicitly pass \`hasDivider\` will use this value.
When not set, nested layouts inherit from their parent context.`},children:{required:!1,tsType:{name:`ReactNode`},description:"Children are a shorthand for the `content` slot:\n`<Layout>{main}</Layout>` is equivalent to `<Layout content={main} />`.\nThe surrounding zones (`header`/`start`/`end`/`footer`) stay explicit\nprops. If both `content` and `children` are provided, `content` wins.\nAccepting children keeps the natural `<Layout>…</Layout>` form from\nrendering a blank shell."}},composes:[`Omit`]}}));export{P as a,W as i,te as n,R as o,z as r,J as t};