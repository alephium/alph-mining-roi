(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3792:function(e,i,s){Promise.resolve().then(s.bind(s,2225))},2225:function(e,i,s){"use strict";s.r(i),s.d(i,{default:function(){return f}});var r=s(7437),t=s(6389),n=s(7238),l=s(5562),a=s(9860),h=s(7644),d=s(3278),o=s(4738),c=s(7024),m=s(8019),u=s(9835),p=s(8130),v=s.n(p);function x(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(u.D,{className:v().title,ta:"center",children:"ALPH mining ROI estimator"})})}var j=s(1640),b=s(2265);let A={custom:{name:"Unknown ASIC Miner",hashrate:1,power:1,cost:1e4},bitmainAL1:{name:"Bitmain Antminer L1",hashrate:15.6,power:3.51,cost:29260},iceriverAL0:{name:"Ice River ALPH AL0",hashrate:.4,power:.1,cost:799},goldshellALII:{name:"Goldshell AL BOX II",hashrate:1.44,power:.36,cost:6350}},y=new Date("2025-11-08"),w="https://backend.mainnet.alephium.org";function P(){let e=new Date;return(y.getTime()-e.getTime())/864e5}function f(){var e,i,s,u,p,v,y;let f=(0,j.c)({initialValues:{minerCost:1e4,minerHashrate:1,minerPower:1,electricityCost:.1,networkHashrate:2e3,alphPrice:2},validate:{minerCost:e=>e>0?void 0:"Cost must be positive",minerHashrate:e=>e>0?void 0:"Hashrate must be positive",minerPower:e=>e>0?void 0:"Power must be positive",electricityCost:e=>e>0?void 0:"Electricity cost must be positive",networkHashrate:e=>e>0?void 0:"Network hashrate must be positive",alphPrice:e=>e>0?void 0:"ALPH price must be positive"}}),T=(0,j.c)({initialValues:{breakEvenDays:void 0,breakEvenAlph:void 0,minedAlph1day:void 0,minedAlph7day:void 0,minedAlph1month:void 0,minedAlph6month:void 0,minedAlph1year:void 0}}),[g,k]=(0,b.useState)("custom");(0,b.useEffect)(()=>{let e=A[g];e&&f.setValues({minerCost:e.cost,minerHashrate:e.hashrate,minerPower:e.power})},[g]),(0,b.useEffect)(()=>{(async()=>{let e=Date.now(),i=e-864e5-1,s=await fetch(w+"/charts/hashrates?fromTs=".concat(i,"&toTs=").concat(e,"&interval-type=daily"));if(200===s.status){let e=parseFloat((await s.json())[0].hashrate)/1e12;f.setValues({networkHashrate:e})}let r=await fetch(w+"/market/prices?currency=usd",{method:"POST",body:JSON.stringify(["ALPH"])});if(200===r.status){let e=(await r.json())[0];f.setValues({alphPrice:e})}})()},[]);let C=(0,b.useCallback)((e,i)=>i*(e-428e-6*(i-1)/2)*86400*f.values.minerHashrate/f.values.networkHashrate,[f]),H=(0,b.useCallback)(()=>{let e=P(),i=.3125+428e-6*P(),s=Array.from({length:e},(e,i)=>i+1).map(e=>C(i,e)),r=s.map((e,i)=>e*f.values.alphPrice-24*f.values.electricityCost*f.values.minerPower*(i+1)).findIndex(e=>e>f.values.minerCost);T.setValues({breakEvenDays:r+1,breakEvenAlph:s[r],minedAlph1day:s[0],minedAlph7day:s[6],minedAlph1month:s[29],minedAlph6month:s[179],minedAlph1year:s[364]})},[f]);return(0,r.jsxs)(t.K,{h:{base:550,lg:"70vh"},justify:"center",align:"center",gap:(0,n.h)(24),mx:"auto",mt:32,children:[(0,r.jsx)(x,{}),(0,r.jsx)(l.x,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",children:"This is a simple ROI calculator for ALPH mining based on the current network hashrate and ALPH price. Not Financial Advice."}),(0,r.jsx)(a.p,{miw:300,label:"Select ASIC Miner",description:"Randomly ordered list of ASIC miners",data:Object.keys(A),value:g,onChange:e=>k(e.currentTarget.value)}),(0,r.jsxs)("form",{onSubmit:f.onSubmit(e=>{console.log(e),H()}),children:[(0,r.jsxs)(h.r,{mx:"auto",w:"60%",gutter:"lg",children:[(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"Miner Cost",placeholder:"10000",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"USD"}),...f.getInputProps("minerCost")},f.key("minerCost"))}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"Miner Hashrate",placeholder:"1.0",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"TH/s"}),...f.getInputProps("minerHashrate")},f.key("minerHashrate"))}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"Miner Power",placeholder:"1.0",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"kW"}),...f.getInputProps("minerPower")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"Electricity Cost",placeholder:"1.0",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"USD/kWh"}),rightSectionWidth:70,...f.getInputProps("electricityCost")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"Network Hashrate (24h avg)",placeholder:"1.0",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"Th/s"}),...f.getInputProps("networkHashrate")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(d.o,{type:"number",label:"ALPH Price",placeholder:"1.0",rightSection:(0,r.jsx)(l.x,{mr:"md",fw:"bold",children:"USD"}),...f.getInputProps("alphPrice")})})]}),(0,r.jsx)(o.Z,{justify:"center",mt:"md",children:(0,r.jsx)(c.z,{type:"submit",children:"Calculate"})})]}),(0,r.jsx)(m.i,{w:"60%",highlightOnHover:!0,withTableBorder:!0,children:(0,r.jsxs)(m.i.Thead,{children:[(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{w:"30%",children:"break-even"}),(0,r.jsxs)(m.i.Td,{w:"30%",children:[null!==(e=T.values.breakEvenDays)&&void 0!==e?e:"???"," days"]}),(0,r.jsxs)(m.i.Td,{w:"30%",children:[null!==(i=T.values.breakEvenAlph)&&void 0!==i?i:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 day"}),(0,r.jsxs)(m.i.Td,{children:[T.values.minedAlph1day?T.values.minedAlph1day*f.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(s=T.values.minedAlph1day)&&void 0!==s?s:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"7 day"}),(0,r.jsxs)(m.i.Td,{children:[T.values.minedAlph7day?T.values.minedAlph7day*f.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(u=T.values.minedAlph7day)&&void 0!==u?u:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 month"}),(0,r.jsxs)(m.i.Td,{children:[T.values.minedAlph1month?T.values.minedAlph1month*f.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(p=T.values.minedAlph1month)&&void 0!==p?p:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"6 month"}),(0,r.jsxs)(m.i.Td,{children:[T.values.minedAlph6month?T.values.minedAlph6month*f.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(v=T.values.minedAlph6month)&&void 0!==v?v:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 year"}),(0,r.jsxs)(m.i.Td,{children:[T.values.minedAlph1year?T.values.minedAlph1year*f.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(y=T.values.minedAlph1year)&&void 0!==y?y:"???"," ALPH"]})]})]})})]})}},8130:function(e){e.exports={title:"Welcome_title__Cz_nm"}}},function(e){e.O(0,[159,581,971,69,744],function(){return e(e.s=3792)}),_N_E=e.O()}]);