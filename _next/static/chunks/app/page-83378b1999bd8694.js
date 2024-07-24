(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3792:function(e,i,t){Promise.resolve().then(t.bind(t,2225))},2225:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return T}});var r=t(7437),s=t(6389),n=t(7238),a=t(5562),l=t(9860),h=t(7644),o=t(3278),d=t(4738),c=t(7024),m=t(8019),u=t(9835),p=t(8130),v=t.n(p);function x(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(u.D,{className:v().title,ta:"center",children:"ALPH mining ROI estimator"})})}var j=t(1640),b=t(2265);let A={"Custom ASIC Miner":{hashrate:1,power:1,cost:1e4},"Bitmain Antminer L1 (with coupon)":{hashrate:15.6,power:3.51,cost:29260},"Bitmain Antminer L1 (without coupon)":{hashrate:15.6,power:3.51,cost:41800},"Goldshell AL BOX II":{hashrate:1.44,power:.36,cost:6350},"Ice River ALPH AL0":{hashrate:.4,power:.1,cost:799}},y=new Date("2025-11-08"),w="https://backend.mainnet.alephium.org";function P(){let e=new Date;return(y.getTime()-e.getTime())/864e5}function T(){var e,i,t,u,p,v,y;let T=(0,j.c)({initialValues:{minerCost:1e4,minerHashrate:1,minerPower:1,electricityCost:.1,networkHashrate:0,alphPrice:2},validate:{minerCost:e=>e>0?void 0:"Cost must be positive",minerHashrate:e=>e>0?void 0:"Hashrate must be positive",minerPower:e=>e>0?void 0:"Power must be positive",electricityCost:e=>e>0?void 0:"Electricity cost must be positive",networkHashrate:e=>e>0?void 0:"Network hashrate must be positive",alphPrice:e=>e>0?void 0:"ALPH price must be positive"}}),f=(0,j.c)({initialValues:{breakEvenDays:void 0,breakEvenAlph:void 0,minedAlph1day:void 0,minedAlph7day:void 0,minedAlph1month:void 0,minedAlph6month:void 0,minedAlph1year:void 0}}),[g,k]=(0,b.useState)("Custom"),[C,H]=(0,b.useState)(void 0);(0,b.useEffect)(()=>{let e=A[g];e&&T.setValues({minerCost:e.cost,minerHashrate:e.hashrate,minerPower:e.power})},[g]),(0,b.useEffect)(()=>{(async()=>{let e=Date.now(),i=e-864e5-1,t=await fetch(w+"/charts/hashrates?fromTs=".concat(i,"&toTs=").concat(e,"&interval-type=daily"));200===t.status&&H(Math.ceil(parseFloat((await t.json())[0].hashrate)/1e12));let r=await fetch(w+"/market/prices?currency=usd",{method:"POST",body:JSON.stringify(["ALPH"])});if(200===r.status){let e=(await r.json())[0];T.setValues({alphPrice:e})}})()},[]);let S=(0,b.useCallback)((e,i)=>i*(e-428e-6*(i-1)/2)*86400*T.values.minerHashrate/T.values.networkHashrate,[T]),L=(0,b.useCallback)(()=>{let e=P(),i=.3125+428e-6*P(),t=Array.from({length:e},(e,i)=>i+1).map(e=>S(i,e)),r=t.map((e,i)=>e*T.values.alphPrice-24*T.values.electricityCost*T.values.minerPower*(i+1)).findIndex(e=>e>T.values.minerCost);-1!==r?f.setValues({breakEvenDays:r+1,breakEvenAlph:t[r],minedAlph1day:t[0],minedAlph7day:t[6],minedAlph1month:t[29],minedAlph6month:t[179],minedAlph1year:t[364]}):f.setValues({breakEvenDays:"> ".concat(e),breakEvenAlph:void 0,minedAlph1day:t[0],minedAlph7day:t[6],minedAlph1month:t[29],minedAlph6month:t[179],minedAlph1year:t[364]})},[T]);return(0,r.jsxs)(s.K,{justify:"center",align:"center",gap:(0,n.h)(24),mx:"auto",mt:32,children:[(0,r.jsx)(x,{}),(0,r.jsx)(a.x,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",children:"This is a simple ROI calculator for ALPH mining based on the current network hashrate and ALPH price. Not Financial Advice."}),(0,r.jsx)(a.x,{c:"blue",ta:"center",size:"lg",maw:580,mx:"auto",children:"The network hashrate might be much higher than the current value in the future. Please take this into consideration."}),(0,r.jsx)(l.p,{miw:300,label:"Select ASIC Miner",description:"Miners are ordered alphabetically",data:Object.keys(A),value:g,onChange:e=>k(e.currentTarget.value)}),(0,r.jsxs)("form",{onSubmit:T.onSubmit(e=>{console.log(e),L()}),children:[(0,r.jsxs)(h.r,{mx:"auto",w:"60%",gutter:"lg",children:[(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"Miner Cost",placeholder:"10000",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"USD"}),...T.getInputProps("minerCost")},T.key("minerCost"))}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"Miner Hashrate",placeholder:"1.0",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"TH/s"}),...T.getInputProps("minerHashrate")},T.key("minerHashrate"))}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"Miner Power",placeholder:"1.0",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"kW"}),...T.getInputProps("minerPower")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"Electricity Cost",placeholder:"1.0",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"USD/kWh"}),rightSectionWidth:70,...T.getInputProps("electricityCost")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"Network Hashrate ".concat(C?"(Current: ".concat(C," TH/s)"):""),placeholder:"1.0",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"Th/s"}),...T.getInputProps("networkHashrate")})}),(0,r.jsx)(h.r.Col,{span:{base:12,xs:4},children:(0,r.jsx)(o.o,{type:"number",label:"ALPH Price",placeholder:"1.0",rightSection:(0,r.jsx)(a.x,{mr:"md",fw:"bold",children:"USD"}),...T.getInputProps("alphPrice")})})]}),(0,r.jsx)(d.Z,{justify:"center",mt:"md",children:(0,r.jsx)(c.z,{type:"submit",children:"Calculate"})})]}),(0,r.jsx)(m.i,{w:"60%",highlightOnHover:!0,withTableBorder:!0,children:(0,r.jsxs)(m.i.Thead,{children:[(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{w:"30%",children:"break-even"}),(0,r.jsxs)(m.i.Td,{w:"30%",children:[null!==(e=f.values.breakEvenDays)&&void 0!==e?e:"???"," days"]}),(0,r.jsxs)(m.i.Td,{w:"30%",children:[null!==(i=f.values.breakEvenAlph)&&void 0!==i?i:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 day"}),(0,r.jsxs)(m.i.Td,{children:[f.values.minedAlph1day?f.values.minedAlph1day*T.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(t=f.values.minedAlph1day)&&void 0!==t?t:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"7 day"}),(0,r.jsxs)(m.i.Td,{children:[f.values.minedAlph7day?f.values.minedAlph7day*T.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(u=f.values.minedAlph7day)&&void 0!==u?u:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 month"}),(0,r.jsxs)(m.i.Td,{children:[f.values.minedAlph1month?f.values.minedAlph1month*T.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(p=f.values.minedAlph1month)&&void 0!==p?p:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"6 month"}),(0,r.jsxs)(m.i.Td,{children:[f.values.minedAlph6month?f.values.minedAlph6month*T.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(v=f.values.minedAlph6month)&&void 0!==v?v:"???"," ALPH"]})]}),(0,r.jsxs)(m.i.Tr,{children:[(0,r.jsx)(m.i.Td,{children:"1 year"}),(0,r.jsxs)(m.i.Td,{children:[f.values.minedAlph1year?f.values.minedAlph1year*T.values.alphPrice:"???"," USD"]}),(0,r.jsxs)(m.i.Td,{children:[null!==(y=f.values.minedAlph1year)&&void 0!==y?y:"???"," ALPH"]})]})]})})]})}},8130:function(e){e.exports={title:"Welcome_title__Cz_nm"}}},function(e){e.O(0,[159,581,971,69,744],function(){return e(e.s=3792)}),_N_E=e.O()}]);