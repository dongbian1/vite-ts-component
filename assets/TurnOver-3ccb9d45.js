import{_ as p,o as n,c as r,F as _,j as g,n as o,b as s,t as d,N as u,a_ as m,aY as x}from"./app-037f133e.js";const v={data(){return{width:0,height:0,totalHeight:0,prize:{},click:!1,maskVis:!1,prizeList:[{index:1,name:"一等奖",color:"red"},{index:2,name:"二等奖",color:"red"},{index:3,name:"三等奖",color:"red"},{index:4,name:"四等奖",color:"red"},{index:5,name:"五等奖",color:"red"},{index:6,name:"六等奖",color:"red"},{index:7,name:"谢谢惠顾",color:"red"},{index:8,name:"再来一次",color:"red"}]}},created(){this.prizeList=this.prizeList.sort((t,i)=>Math.random()>.5?-1:1)},mounted(){var i;const t=(i=this.$refs)==null?void 0:i.container.scrollWidth;this.countSize(t),window.onresize=()=>(()=>{var c;this.countSize((c=this.$refs)==null?void 0:c.container.scrollWidth)})()},methods:{countSize(t){const i=t-80,c=i%4,l=(i-c)/4,e=l*1.5;this.width=l,this.height=e,this.totalHeight=this.prizeList.length/4>1?e*Math.ceil(this.prizeList.length/4):e*2},handleCard(t){this.click=!0,this.prize=t,setTimeout(()=>{this.maskVis=!0},1e3)},handleReceive(){this.click=!1,this.prize={}}}},f=t=>(m("data-v-2bc48f4a"),t=t(),x(),t),k={class:"info"},z={key:0,class:"container",ref:"container"},w=["onClick"],y={class:"content"},H=f(()=>s("div",{class:"background"},[s("i",{class:"light"})],-1)),b=["src"],S={class:"prizeNme"},L={key:2,style:{"text-align":"center",overflow:"hidden"}};function C(t,i,c,l,e,a){return n(),r("div",k,[e.click?(n(),r("div",{key:1,class:"mask appear",ref:"container",style:o({height:`${e.totalHeight}px`,"--cardHeight":`${e.totalHeight/2*1.5}px`,"--cardWidth":`${(e.totalHeight-20)*.5}px`})},[s("div",{class:"card",style:o({width:`${e.width}px`,height:`${e.height}px`,margin:"auto"})},null,4),s("div",{class:"pic",style:o({height:`${e.totalHeight/2*1.5}px`,width:`${(e.totalHeight-20)*.5}px`})},[s("img",{style:o({height:`${e.totalHeight/2*1.5}px`,width:`${(e.totalHeight-20)*.5}px`}),src:t.$withBase("/猫.jpg")},null,12,b),s("i",{style:o({height:`${e.totalHeight/2*1.5}px`,width:`${(e.totalHeight-20)*.5}px`}),class:"light"},null,4),s("div",S,d(e.prize.name),1)],4)],4)):(n(),r("div",z,[(n(!0),r(_,null,g(e.prizeList,h=>(n(),r("div",{class:"card",key:h.index,style:o({width:`${e.width}px`,height:`${e.height}px`,margin:"10px"}),onClick:B=>a.handleCard(h)},[s("div",y,d(h.name),1),H],12,w))),128))],512)),e.click?(n(),r("div",L,[s("button",{class:"but",onClick:i[0]||(i[0]=(...h)=>a.handleReceive&&a.handleReceive(...h))},"领 取")])):u("v-if",!0)])}const N=p(v,[["render",C],["__scopeId","data-v-2bc48f4a"],["__file","TurnOver.vue"]]);export{N as default};
